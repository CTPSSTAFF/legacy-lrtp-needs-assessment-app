marymcs = {};
marymcs.demoApp = {};
marymcs.demoApp.map = {};
marymcs.demoApp.tabs = {};
marymcs.demoApp.myData = [];
marymcs.demoApp.myDataOrigins = [];
marymcs.demoApp.myDataDestinations = [];
CSSClass = {};


marymcs.demoApp.szServerRoot = 'http://www.ctps.org:8080/geoserver/';
marymcs.demoApp.szWMSserverRoot = marymcs.demoApp.szServerRoot + '/wms'; 
marymcs.demoApp.szWFSserverRoot = marymcs.demoApp.szServerRoot + '/wfs';



//  VARIABLES FOR FREQUENTLY USED LAYER FILES
//var towns_base = 'ctpssde:MPODATA.MGIS_TOWNS_POLYM';
var towns_base = 'postgis:plan2035_towns_modelarea';
var OD_districts = 'postgis:plan2035_districts_sm_circles';
var roadways = 'postgis:ctps_roadinventory_grouped';
var trips_crosstab = 'postgis:plan2035_od_hway2';
var current_mode = 'AUTO';
var year = '';





/* ****************   1. UTILITY FUNCTIONS  ***************/
// hide/unhide toggle, works in conjunction with class definition in CSS file--
// see below, and see CSS file, for difference between 'unhide' and 'toggle_turn_on' 
function unhide(divID) {
	//function toggles hiding and unhiding a specified Div
	var item = document.getElementById(divID);
	if (item) {
		item.className=(item.className==='hidden')?'unhidden':'hidden';
	}
}; // unhide()

// toggle elements on and off, works in conjunction with class definitions in CSS file
// NOTE: difference from 'unhide' above is that 'unhide' works with 'visibility' CSS; 'toggle..' works with 'display..' CSS
function toggle_turn_on(divID) {
	//function toggles hiding and unhiding a specified Div
	var item = document.getElementById(divID);
	if (item) {
		item.className=(item.className==='turned_off')?'turned_on':'turned_off';
	}
}; // toggle_turn_on()


// turns off 3 vector layers used to display ORIGIN and DESTINATION data; does not turn off 'selected district' layer
function turn_off_vectors(){
    marymcs.demoApp.oDistrictVectorLayer1.destroyFeatures();
	marymcs.demoApp.oDistrictVectorLayer2.destroyFeatures();
	marymcs.demoApp.oDistrictVectorLayer3.destroyFeatures();
};  // turn_off_vectors()

function addCommas(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function popup(url) {
    popupWindow = window.open(url,'popUpWindow','height=700,width=600,left=600,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}; // popup()

//           END of UTILITY FUNCTIONS



/* **************   2. INITIALIZE PAGE, DRAW MAP  *****************/
marymcs.demoApp.init = function(){
  
    //Populate "select municipality" combo box.
	var i;        
	var oSelect = document.getElementById("selected_district"); 
	var oOption;  // An <option> to be added to the  <select>.
	for (i = 0; i < MPMUTILS.modelRegions_2012.length; i++) {           
        oOption = document.createElement("OPTION");
        oOption.value = MPMUTILS.modelRegions_2012[i][0];
        oOption.text = MPMUTILS.modelRegions_2012[i][0] + ', ' + MPMUTILS.modelRegions_2012[i][1];        
        oSelect.options.add(oOption);
    }
    
    marymcs.demoApp.map = new OpenLayers.Map('map2',
		{   'projection': 'EPSG:26986',
	//		'maxResolution':'2000',
			'maxExtent': new OpenLayers.Bounds(1000,757875,346000,1007875),
			'units': 'm',	
            'scales': [3200000,1600000,800000,400000,200000,100000,50000,25000,12500,6250]  });
  
            
    var oBaseLayer = new OpenLayers.Layer.WMS(
		"Towns",
		marymcs.demoApp.szWMSserverRoot,             
        { layers: towns_base,      
	//	  styles: 'towns_Plan2035'}  );
          styles: 'Plan2035_towns_OD'},
           {   singleTile: true, ratio: 1 } 
          );
          
    oRoads = new OpenLayers.Layer.WMS(
				"Roadways",	marymcs.demoApp.szWMSserverRoot,
				{	layers: roadways, styles: 'RoadsMultiscaleGroupedBGblue', transparent: 'true'	},
                {   singleTile: true, ratio: 1 } 
                );
     
    // Note: Because the data for this layer was loaded from a shapefile,
    //       attribute names were truncated to 10 characters in length.
    //       Consequently, we needed to customize the SLD used for this layer.	
    oDistricts = new OpenLayers.Layer.WMS(
				"Districts",	marymcs.demoApp.szWMSserverRoot,
				{	layers: OD_districts, 
                    styles: 'Plan2035_districts_ext_numbers_shapefile', transparent: 'true'	},
                 {   singleTile: true, ratio: 1 } 
                    );
                    
     oTownNames = new OpenLayers.Layer.WMS(
				"Town Names", marymcs.demoApp.szWMSserverRoot,
                   { layers: towns_base, styles: 'Plan2035_towns_OD_boundaries', transparent: 'true'  }  
					 ); 



 // ALTERNATIVE STYLE FOR 'DISTRICT SELECTION' VECTOR LAYER--HEAVY RED LINE ONLY               
     var myStyle = new OpenLayers.Style( {'strokeColor': "#FF0000", 'strokeWidth': 3.0,
	                  'fillColor': 'none', 'fillTransparency': 1.0 });                
                      
     marymcs.demoApp.oHighlightLayer = new OpenLayers.Layer.Vector(
				"Selected District",
				{
						styleMap: myStyle		
				}		
			);
     
  //  THREE ADDITIONAL VECTOR LAYERS BELOW CREATED AND ADDED TO MAP HERE, BUT STYLE MAPS NOT ATTACHED 
  //  UNTIL FUNCTION 'QUERY VECTOR LAYERS' BELOW     
     marymcs.demoApp.oDistrictVectorLayer1 = new OpenLayers.Layer.Vector("Origins-Few Trips");
  
     marymcs.demoApp.oDistrictVectorLayer2 = new OpenLayers.Layer.Vector("Origins-More Trips");
      
     marymcs.demoApp.oDistrictVectorLayer3 = new OpenLayers.Layer.Vector("Origins-Many Trips");
                                 
     var scale_control = new OpenLayers.Control.ScaleLine();
	
	 marymcs.demoApp.map.addLayers([oBaseLayer,
                                 oRoads,
                                 oTownNames,
                                 oDistricts,                
                                 marymcs.demoApp.oDistrictVectorLayer1,
                                 marymcs.demoApp.oDistrictVectorLayer2,
                                 marymcs.demoApp.oDistrictVectorLayer3,
                                 marymcs.demoApp.oHighlightLayer
                                 ]);
                                 
    marymcs.demoApp.map.addControl(scale_control);
	marymcs.demoApp.map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	marymcs.demoApp.map.setCenter(new OpenLayers.LonLat(236590,901392));        
	marymcs.demoApp.map.zoomTo(2)

}        //   END OF 'INIT' FUNCTION




/* ***************  3. GET DESIRED DISTRICT AND DESIRED MODE, ADD TO HIGHLIGHT LAYER ****************/
marymcs.demoApp.searchForDistrict = function(){

    // initialize variables/data store
	marymcs.demoApp.oHighlightLayer.destroyFeatures();
    marymcs.demoApp.oDistrictVectorLayer1.destroyFeatures();
	marymcs.demoApp.oDistrictVectorLayer2.destroyFeatures();
	marymcs.demoApp.oDistrictVectorLayer3.destroyFeatures();
    if (document.getElementById('legendOrig').className==='turned_on'){
					toggle_turn_on('legendOrig');
     }
     if (document.getElementById('legendDest').className==='turned_on'){
					toggle_turn_on('legendDest');
     }
     if (document.getElementById('page_bottom').className==='unhidden'){
					unhide('page_bottom');
     }
     document.getElementById('trips_grid').innerHTML = '';
   
    // get district name from combo box	
	var myselect=document.getElementById("selected_district")
	for (var i=0; i<myselect.options.length; i++){
		if (myselect.options[i].selected==true){
			 marymcs.demoApp.choice_district = myselect.options[i].value;
		}
	}
	
	if (marymcs.demoApp.choice_district === '') { 
		alert("NO DISTRICT SELECTED--TRY AGAIN");
		return;
	}    

    //  create WFS query to display district on map
    
    var cqlFilter;  
	// cqlFilter = "(district_num=='" + marymcs.demoApp.choice_district + "')";
	//Note: Must truncate property name to 10 characters, because data was loaded from shapefile.
	cqlFilter = "(district_n=='" + marymcs.demoApp.choice_district + "')";
    
	OpenLayers.Request.issue({
			'method': 'GET',
			'url': marymcs.demoApp.szWFSserverRoot,                         
			'params': {
				service: 'WFS',
				version: '1.0.0',	
				typename: OD_districts,
				request: 'getfeature',
				cql_filter: cqlFilter
			},
			'headers': {'content-type' : 'application/xml'},
			'success': function(oRequest) {
				var g = new OpenLayers.Format.GML();
				var aFeatures = g.read(oRequest.responseText);
				
				if (aFeatures.length === 0) {
					alert('no district with that name found');
					marymcs.demoApp.clearSelection();
					return;
				} 
				
				var szResponse = '';
				for (var i = 0; i < aFeatures.length; i++) {				
					oFeature = aFeatures[i];
					szResponse += 'DISTRICT: ' + oFeature.attributes['district'];       
					marymcs.demoApp.oHighlightLayer.destroyFeatures();
					marymcs.demoApp.oHighlightLayer.addFeatures(oFeature);			
				}                              				
			},                                                                              //  END 'SUCCESS'
			'failure': function(oRequest) {
				alert("failure");
			}                                                                               //  END 'FAILURE                      
		});											                                        //	END OpenLayers Request
        
         if (document.getElementById('modeSelect').className==='hidden'){
                unhide('modeSelect');
            }
               
}      //  END 'SearchForDistrict' FUNCTION


marymcs.demoApp.getMode = function(){

    var current_year = '2012', future_year = '2040';
   

     document.getElementById('trips_grid').innerHTML = '';
     if (document.getElementById('page_bottom').className==='unhidden'){                             // Link: get table of regions
                    unhide('page_bottom');
     }
         
  // get district name from combo box	
	var myselect2=document.getElementById("selected_mode")
	marymcs.demoApp.choice_mode = myselect2.value; 

    switch(marymcs.demoApp.choice_mode){
    case '1':
        trips_crosstab = 'postgis:plan2040_od_hway_2014';
    //    alert('table in use:  highway');
        current_mode = 'AUTO';
        year = current_year;
        break;
    case '2':
        trips_crosstab = 'postgis:plan2040_od_transit_2014';
    //    alert('table in use:  transit');
        current_mode = 'TRANSIT';
        year = current_year;
        break;
    case '3':       
        trips_crosstab = 'postgis:plan2040_od_bikewalk_2014';
    //     alert('table in use:  bike/walk');
        current_mode = 'BIKE/WALK';
        year = current_year;
        break;
    case '4':       
        trips_crosstab = 'postgis:plan2040_od_trucks_2014';
    //     alert('table in use:  bike/walk');
        current_mode = 'TRUCK TRIPS';
        year = current_year;
        break; 
    case '5':
        trips_crosstab = 'postgis:plan2040_od_hway_2040';
    //    alert('table in use:  highway');
        current_mode = 'AUTO';
        year = future_year;
        break;
    case '6':
        trips_crosstab = 'postgis:plan2040_od_transit_2040';
    //    alert('table in use:  transit');
        current_mode = 'TRANSIT';
        year = future_year;
        break;
    case '7':       
        trips_crosstab = 'postgis:plan2040_od_bikewalk_2040';
    //     alert('table in use:  bike/walk');
        current_mode = 'BIKE/WALK';
        year = future_year;
        break;
    case '8':       
        trips_crosstab = 'postgis:plan2040_od_trucks_2040';
    //     alert('table in use:  bike/walk');
        current_mode = 'TRUCK TRIPS';
        year = future_year;
        break;    
        
    default:
        alert('no table selected; default is highway');
        trips_crosstab = 'postgis:plan2040_od_hway_2014';
        break;   
    }


        document.getElementById('fetchDataOrigins').disabled = false;
        if (document.getElementById('fetchDataOrigins').className==='hidden'){
            unhide('fetchDataOrigins');
        }
        
        document.getElementById('fetchDataDestinations').disabled = false;
        if (document.getElementById('fetchDataDestinations').className==='hidden'){
            unhide('fetchDataDestinations');
        }
        
        if (document.getElementById('resetData').className==='unhidden'){
            unhide('resetData');
        }   
    
};

/* ************   4.  CREATE OPENLAYERS QUERY TO GET **ORIGIN** DATA FROM TABLE **COLUMN**, ADD TO         ***************
***************       DATA STORE, AND CALL 'THREE VECTORS' FUNCTION TO CREATE 3 QUERIES FOR POLYGON LAYER  ***************/               
marymcs.demoApp.getOriginData = function(){

    turn_off_vectors();

    if (marymcs.demoApp.oHighlightLayer.features.length === 0) { 
		alert("No features selected for data request ");
		return;
	} else {	
		var place2 = marymcs.demoApp.oHighlightLayer.features[0].attributes['district'];  
        var place = place2.toLowerCase();                                          //  LOWER case used for field names/column headings in table in PostgreSQL
	}
      
	marymcs.demoApp.myDataOrigins.length = 0;
   
    var typename = trips_crosstab;
	var propertyname = 'table_index,origins,' + place;	
		
    var szUrl2 = marymcs.demoApp.szWFSserverRoot + '?';                        
    var oParams2 = {
        'service': 'wfs',
        'version': '1.0.0',
        'request': 'getfeature',	
        'typename': typename,
        'outputformat':  'GML2',
        'propertyname': propertyname
    };

    var szParams2 = '';
    szParams2 += 'srs=' + oParams2['srs'];
    szParams2 += '&service=' + oParams2['service'];
    szParams2 += '&version=' + oParams2['version'];
    szParams2 += '&request=' + oParams2['request'];
    szParams2 += '&query_layers=' + oParams2['typename'];
    szParams2 += '&info_format=' + oParams2['outputformat'];
    szParams2 += '&propertyname=' + oParams2['propertyname'];
    
    OpenLayers.Request.issue({
//		'method': 'POST',
        'url': szUrl2,
        'params': oParams2,
        'data': szParams2,
        'headers': {'content-type' : 'application/xml'},
        'success': function(oRequest2) {
                var indx,origin,origin_trunc, oTrips,oPct,j; 
                var aTemp1 = [];
                var sumOrigins = 0;
                var formatted_pct = '';               
                var h = new OpenLayers.Format.GML();
                var aFeatures = h.read(oRequest2.responseText);	
                if (aFeatures.length === 0) {
                        alert("No origin data reported for selected district:  " + place + " ; try another district.");
            			marymcs.demoApp.clearSelection();
                        return;
                    } else {    
                        //  COMPUTE SUM OF TRIPS TO USE IN CALCULATING PERCENTAGES FOR EACH ORIGIN
                        for(j = 0; j < aFeatures.length; j++) {
                            sumOrigins += parseFloat(aFeatures[j].attributes[place]);
                        }
                                   
                        for (j = 0; j < aFeatures.length; j++) { 
                            aTemp1 = [];
                            indx = parseInt(aFeatures[j].attributes['table_index']);
                            origin = parseInt(aFeatures[j].attributes['origins']);         
                            oTrips = parseFloat(aFeatures[j].attributes[place]).toFixed(0);
                            oPct = (oTrips / sumOrigins) * 100;
                   //         if(j<10){console.log('oPct = ' + oPct + ' and sum origins = ' + sumOrigins)};
                            formatted_pct = oPct.toFixed(1) + '%';                   
                            aTemp1.push(indx,origin,oTrips,formatted_pct); 
                    //        if(j<10){console.log('aTemp1 = ' + aTemp1)};
                            marymcs.demoApp.myDataOrigins.push(aTemp1);
                        }
                        
                        marymcs.demoApp.myDataOrigins.sort(function(a,b){				
							var stna = parseInt(a[0]), stnb = parseInt(b[0]);
							if (stna > stnb)
								return 1
							if (stna < stnb)
								return -1
							return 0                                        //default value if no sorting
						});
              
                        var dat_index = 1;                                  // marker for ORIGIN data
                        marymcs.demoApp.threeVectors(dat_index);
                        if (document.getElementById('legendDest').className==='turned_on'){
                                toggle_turn_on('legendDest')};
                        if (document.getElementById('legendOrig').className==='turned_off'){
                                toggle_turn_on('legendOrig')};                       
                    }                                                                       //      END 'ELSE'
 	
            },                                                                              //      END  'SUCCESS' 
            'failure': function(oRequest2) {
				alert("failure");
			}													                            //		END FAILURE           
            
      });                                                                                   //      END OPEN LAYERS REQUEST  
      
}      //      END 'GetOriginData' FUNCTION



/* ***************   5.  CREATE OPENLAYERS QUERY TO GET **DESTINATION** DATA FROM SINGLE TABLE **ROW**, ADD TO  *************
 ******************      DATA STORE, AND CALL 'THREE VECTORS' FUNCTION TO CREATE 3 QUERIES FOR POLYGON LAYER    ************  */
marymcs.demoApp.getDestinationData = function(){

    turn_off_vectors();

    if (marymcs.demoApp.oHighlightLayer.features.length === 0) { 
        alert("No features selected for data request ");
		return;
	} else {	
		var place1 = marymcs.demoApp.oHighlightLayer.features[0].attributes['district'].substr(2);      
        var current_district = parseInt(place1,10); 
	}
      
	marymcs.demoApp.myDataDestinations.length = 0;
   
    var typename = trips_crosstab;
    CQL_filter = "(origins='" + current_district + "')";
	
    var szUrl2 = marymcs.demoApp.szWFSserverRoot + '?';                      
    var oParams2 = {
        'service': 'wfs',
        'version': '1.0.0',
        'request': 'getfeature',	
        'typename': typename,
        'outputformat':  'GML2',
        'CQL_filter': CQL_filter
    };

    var szParams2 = '';
    szParams2 += 'srs=' + oParams2['srs'];
    szParams2 += '&service=' + oParams2['service'];
    szParams2 += '&version=' + oParams2['version'];
    szParams2 += '&request=' + oParams2['request'];
    szParams2 += '&query_layers=' + oParams2['typename'];
    szParams2 += '&info_format=' + oParams2['outputformat'];
    szParams2 += '&CQL_filter=' + oParams2['CQL_filter'];
    
    OpenLayers.Request.issue({
//		'method': 'POST',
        'url': szUrl2,
        'params': oParams2,
        'data': szParams2,
        'headers': {'content-type' : 'application/xml'},
        'success': function(oRequest2) {
                var dest_index,dest_trunc, dest_number, oDestPct,i;
                var dest_zone = [];
                var dest_trips = [];
                var dest_trips_rounded;
                var aTemp2 = [];               
                var sumDestinations = 0;
                var formatted_pct = '';
                var h = new OpenLayers.Format.GML();
                var aFeatures = h.read(oRequest2.responseText);	
                if (aFeatures.length === 0) {
                        alert("No destination data reported for selected district:  " + place1 + " ; try another district.");
            			marymcs.demoApp.clearSelection();
                        return;
                    } else {
                                    
                        //  FIRST LOOP TO GET SUM OF TRIPS FOR PERCENTAGE CALCULATION
                        for(i=0;i<45;i++){
                            dest_index = i + 1;        
                            dest_number = (i<9)?'0'+dest_index:dest_index;
                                                       
                            if(i<41){
                                dest_zone[i] = 'gd' + dest_number;             
                            } else {
                                dest_zone[i] = 'gd' + (9 + dest_number);              
                            }
                                                       
                            dest_trips[i] = parseFloat(aFeatures[0].attributes[dest_zone[i]]);
                                    
                            sumDestinations += dest_trips[i];                            
                        }                        
                         
                        //   SECOND LOOP TO CALCULATE PERCENTAGES AND WRITE ALL DATA TO DATA STORE
                        for(i=0;i<45;i++){
                            aTemp2 = [];
                            dest_index = i + 1;                            
                            oDestPct = ((dest_trips[i] / sumDestinations) * 100).toFixed(1) + '%';
                            var dest_zone_trunc; 
                            if(i>8){
                                dest_zone_trunc = dest_zone[i].substr(2);
                            } else {
                                dest_zone_trunc = dest_zone[i].substr(3);
                            }
                            aTemp2.push(dest_index,dest_zone_trunc, dest_trips[i], oDestPct); 
     
                            marymcs.demoApp.myDataDestinations.push(aTemp2);
                        }
                                                       
                    marymcs.demoApp.myDataDestinations.sort(function(a,b){				
                        var stna = parseInt(a[0]), stnb = parseInt(b[0]);
                        if (stna > stnb)
                            return 1
                        if (stna < stnb)
                            return -1
                        return 0                                                //default value if no sorting
                    });
              
                    var dat_index = 2;                                          // marker for DESTINATION data                    
                    marymcs.demoApp.threeVectors(dat_index);
                    if (document.getElementById('legendOrig').className==='turned_on'){
                            toggle_turn_on('legendOrig')};
                    if (document.getElementById('legendDest').className==='turned_off'){
                            toggle_turn_on('legendDest')};                       
                }                                                                           //      END 'ELSE'
 	
            },                                                                              //      END  'SUCCESS' 
            'failure': function(oRequest2) {
				alert("failure");
			}													                            //		END FAILURE                      
      });                                                                                   //      END OPEN LAYERS REQUEST       
}       //      END 'GetDestinationData' FUNCTION




/* ***************  6.  DIVIDE PASSED DATA STORE INTO 3 CATEGORIES & GENERATE FILTER STATEMENT FOR        ************
  ****************      EACH, CONTAINING DISTRICT CODES FOR DISTRICTS HAVING THRESHOLD NUMBERS OF TRIPS   ***********/
marymcs.demoApp.threeVectors = function(dat_index) {						
// 		Uses data store for ORIGIN or DESTINATION data as identified by dat_index;
//      divides data into 3 categories by numbers of trips and creates
//		filter queries for 3 categories of trip quantities; which will be fed 
//		into "queryVectorLayers" function to display each of the
//		3 categories in a separate vector layer on the map.

    switch(dat_index){
    case 1:
       totaldat = marymcs.demoApp.myDataOrigins;
       break;
    case 2:
       totaldat = marymcs.demoApp.myDataDestinations;
       break;
    default:
        alert('no dat index passed');
        break;
    }
	        
	var rec = []; 
	var index,district,trips,pct_trips,k;
	var townUC;
	var szFilter = [];
	var maxloop;
	var category;
	if (totaldat.length > 45){								//  NOTE: this was included in CR app because WFS request failed if too long.
		maxloop = 45;										//  Not sure if needed for current version; but data fields 41 to
	} else {                                                //  44 are externals anyway--not represented as 'districts'
		maxloop = totaldat.length;
	};
    
//    maxloop=(totaldat.length>45)?45:totaldat.length;      //  this does the same thing as 'if' loop above
	
	szFilter[0]='';
	szFilter[1]='';
	szFilter[2]='';
	
	for (var i=0;i<maxloop;i++) {					        //	Assigns a "category" value to each district based on number of trips
		rec = totaldat[i];                                  //  and writes district name to the filter statement for the relevant category
		index = rec[0];                                     //  for use in later set of 3 queries
		district = rec[1];  
        if(i<9){
            district_extend = 'gd0' + district;  
        } else {
            district_extend = 'gd' + district;
        }
        
        trips = rec[2];
        pct_trips = rec[3];         
        marymcs.demoApp.myData[i] = {      'MyID'               : index,
                                           'DISTRICT'           : district,
                                           'TRIPS'              : addCommas(trips),
                                           'PCT_TRIPS'          : pct_trips                                                                                                     
                                      };
 
               
		if(trips<=5000){category = 0};	
		if(trips>5000 && trips<10000) { category = 1};
		if(trips>=10000 && trips<50000) { category = 2};
		if(trips>=50000) { category = 3};
            
        switch(category) {
        case 0:
  //          alert('nothing -- i = '  + i);
            break;
        case 1:
            if(szFilter[0]==''){
                szFilter[0] += "district='" + district_extend + "'";
            } else{
                szFilter[0] += " OR district='" + district_extend + "'";
            }
            break;
        case 2:
            if(szFilter[1]==''){
                szFilter[1] += "district='" + district_extend + "'";
            } else{
                szFilter[1] += " OR district='" + district_extend + "'";
            }
            break;
        case 3:
            if(szFilter[2]==''){
                szFilter[2] += "district='" + district_extend + "'";
            } else{
                szFilter[2] += " OR district='" + district_extend + "'";
            }
            break;
        default:
            console.log('nothing -- maxloop = '  + maxloop);
            break;
        }
	}				                                                                        //		END Loop through all records up to maxloop	
    
    marymcs.demoApp.renderToGrid(dat_index);
	marymcs.demoApp.queryVectorLayers(szFilter, dat_index);                                 //      CALL to function which creates and runs 3 queries
    
}        //      END OF 'Three Vectors' FUNCTION



/* *************   7.  RUN 3 SEPARATE QUERIES OF POLYGON LAYER USING EACH OF 3 FILTER STATEMENTS    *********************
****************       WITH RELEVANT DISTRICT CODES, AS GENERATED BY 'THREE VECTORS' FUNCTION;      *********************
****************       POPULATE THREE VECTOR LAYERS WITH POLYGONS RETURNED BY EACH QUERY            ******************** */
marymcs.demoApp.queryVectorLayers = function(szFilter, dat_index) {
       
        if (document.getElementById('resetData').className==='hidden'){
            unhide('resetData');	
        }

//  Assign style maps to 3 highlight layers based on whether data is ORIGINS or DESTINATIONS        
        switch(dat_index){
            case 1:
                marymcs.demoApp.myStyle2 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
				{fillColor: '#33CCFF', fillOpacity: 0.3, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
				OpenLayers.Feature.Vector.style["default"]));
				
                marymcs.demoApp.myStyle3 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                {fillColor: '#0066FF', fillOpacity: 0.4, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
                OpenLayers.Feature.Vector.style["default"]));
        
                marymcs.demoApp.myStyle4 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                {fillColor: '#0033FF', fillOpacity: 0.6, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
                OpenLayers.Feature.Vector.style["default"]));
                
                break;
                
           case 2:
                 marymcs.demoApp.myStyle2 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
				{fillColor: '#FF99CC', fillOpacity: 0.3, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
				OpenLayers.Feature.Vector.style["default"]));
				
                marymcs.demoApp.myStyle3 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                {fillColor: '#993366', fillOpacity: 0.4, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
                OpenLayers.Feature.Vector.style["default"]));
        
                marymcs.demoApp.myStyle4 = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                {fillColor: '#FF33FF', fillOpacity: 0.6, strokeColor: "green", strokeWidth: 0.2, strokeOpacity: 0.3},
                OpenLayers.Feature.Vector.style["default"]));
                
                break;

            default:
                alert('no set of styles chosen');
                break;        
        }
                
        marymcs.demoApp.oDistrictVectorLayer1.styleMap = marymcs.demoApp.myStyle2;
        marymcs.demoApp.oDistrictVectorLayer2.styleMap = marymcs.demoApp.myStyle3;
        marymcs.demoApp.oDistrictVectorLayer3.styleMap = marymcs.demoApp.myStyle4;
      
    // MAIN FUNCTION (no. 3 below) runs query for Vector Layer 1 and THEN 
    // calls helper functions "queryVectorLayer3" and "queryVectorLayer2"
    // to get the other 2.  The "zoom to bounds" function is only run at 
    // the end of querying Layer 3--i.e., after all layers for which there
    // are features have been populated--NOTE: "zoom to bounds" temporarily disabled, MPM, 4/11/13
    
// 1.  Helper function to query vector layer 3.
 //   console.log('szFilter_2 = ' + szFilter[2]);
	queryVectorLayer3 = function(szFilter) {    
		OpenLayers.Request.issue({
				method: 'GET',			
				url: marymcs.demoApp.szWFSserverRoot,                   
				params: {
						service: 'WFS',
						version: '1.0.0',	
						typename: OD_districts,
						request: 'getfeature',
						cql_filter: szFilter[2]
					},
				headers: {'content-type' : 'application/xml'},		
				success: function(oRequest) {
					var g = new OpenLayers.Format.GML();
					var aFeatures = g.read(oRequest.responseText);
						if (aFeatures.length === 0) {
							// alert("?? No features found for Layer 3. Value of szFilter[2] is " + szFilter[2]);
						} else {        
						    marymcs.demoApp.oDistrictVectorLayer3.addFeatures(aFeatures);
						};
                        
						// Response to WFS request for 3rd vector layer received and processed.
						// Zoom map to the bounds of the vector layers.
						marymcs.demoApp.zoomToVectorLayerBounds();	                        //          COMMENTED OUT TEMPORARILY--MAY BE RESTORED LATER					
					},
				failure: function(oRequest) {
						alert("Error: WFS request for 3rd vector layer failed.");
					}
		});
	}; 							                                                            //          END OF  queryVectorLayer3 FUNCTION
	
// 2.  Helper function to query vector layer 2. 
	queryVectorLayer2 = function(szFilter) {
		OpenLayers.Request.issue({
				method: 'GET',			
				url:  marymcs.demoApp.szWFSserverRoot,               
				params: {
						service: 'WFS',
						version: '1.0.0',	
						typename: OD_districts,
						request: 'getfeature',
						cql_filter: szFilter[1]
					},
				headers: {'content-type' : 'application/xml'},		
				success: function(oRequest) {
					var g = new OpenLayers.Format.GML();
					var aFeatures = g.read(oRequest.responseText);
						if (aFeatures.length === 0) {
							// alert("?? No features found for Layer 2. Value of szFilter[1] is " + szFilter[1]);
						} else {               
						    marymcs.demoApp.oDistrictVectorLayer2.addFeatures(aFeatures);
						}
						// Response to WFS request for 2nd vector layer received and processed.
						// Initiate WFS request for 3rd vector layer.
						queryVectorLayer3(szFilter);
					},
				failure: function(oRequest) {
						alert("Error: WFS request for 2nd vector layer failed.");
					}
		});
	}; 						                                                                //           END OF queryVectorLayer2()
     	
// 	3. MAIN FUNCTION-- marymcs.demoApp.queryVectorLayers-- begins here.
// 		This function queries vector layer 1, and calls queryVectorLayer2 after
// 		it has received and processed its response.
 
// first disable buttons so people can't put in another request before the first one is finished.....
// they are enabled again at the end of the zoomToBounds function.
    document.getElementById('fetchDataOrigins').disabled = true;
    document.getElementById('fetchDataDestinations').disabled = true;
    document.getElementById('resetData').disabled = true;
 
	OpenLayers.Request.issue({
				method: 'GET',			
				url:  marymcs.demoApp.szWFSserverRoot,                
				params: {
						service: 'WFS',
						version: '1.0.0',	
						typename: OD_districts,
						request: 'getfeature',
						cql_filter: szFilter[0]
					},
				headers: {'content-type' : 'application/xml'},		
				success: function(oRequest) {
					var g = new OpenLayers.Format.GML();
					var aFeatures = g.read(oRequest.responseText);
						if (aFeatures.length === 0) {
							// alert("?? No features found for Layer 1. szFilter[0] is " + szFilter[0]);
						} else {
						    marymcs.demoApp.oDistrictVectorLayer1.addFeatures(aFeatures);
						}
						// Response to WFS request for 1st vector layer received and processed.
						// Initiate WFS request for 2nd vector layer.
						queryVectorLayer2(szFilter);
					},
				failure: function(oRequest) {
						alert("Error: WFS request for 1st vector layer failed.");
					}
	});				//		END OF   MAIN FUNCTION (no. 3)
    
}; 		 // 		END OF  'queryVectorLayers' FUNCTION



/* **************         8.  ZOOM TO BOUNDARIES OF BROADEST VECTOR LAYER FROM 'QUERY VECTOR LAYER' FUNCTION ABOVE   **************/
//NOTE:  CALL TO INVOKE THIS (in marymcs.demoApp.queryVectorLayers, function 1 above)  COMMENTED OUT FOR NOW--MAY REINSTATE LATER....
marymcs.demoApp.zoomToVectorLayerBounds = function() {
		// Zoom to all selected towns--first determine bounds from Layer 1 (presumably the largest area)
		// but if there are no features in Layer 1, use Layer 2.  Big IF statement uses Layer 1 if it
		// has features, the ELSE uses Layer 2.
        
        // NOTE:  I don't understand why, but ALL of the below is required to make zoom work....
                       
		if(marymcs.demoApp.oDistrictVectorLayer1.features.length > 0){     
			var oCentroid = marymcs.demoApp.oDistrictVectorLayer1.features[0].geometry.getCentroid();
			var oLonLat = new OpenLayers.LonLat(oCentroid.x,oCentroid.y);						
			var oZoomBounds = marymcs.demoApp.oDistrictVectorLayer1.features[0].geometry.getBounds();

            if(marymcs.demoApp.oDistrictVectorLayer2.features.length > 0){      
				oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer2.features[0].geometry.getBounds());
			}
						
			if(marymcs.demoApp.oDistrictVectorLayer3.features.length > 0){      
				oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer3.features[0].geometry.getBounds());
			}
			
			if(marymcs.demoApp.oDistrictVectorLayer1.features.length > 0){
				for (var i = 1; i < marymcs.demoApp.oDistrictVectorLayer1.features.length; i++) {
						oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer1.features[i].geometry.getBounds());	
				}
			}  
            
            if(marymcs.demoApp.oDistrictVectorLayer2.features.length > 0){
				for (var i = 1; i < marymcs.demoApp.oDistrictVectorLayer2.features.length; i++) {
						oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer2.features[i].geometry.getBounds());	
				}
			} 
            
            if(marymcs.demoApp.oDistrictVectorLayer3.features.length > 0){
				for (var i = 1; i < marymcs.demoApp.oDistrictVectorLayer3.features.length; i++) {
						oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer3.features[i].geometry.getBounds());	
				}
			}  
          
    //        console.log('zoom based on layer 1--smallest number, widest area');
			marymcs.demoApp.map.zoomToExtent(oZoomBounds);
			//   END of setting boundary based on Layer 1
            
		} else if (!marymcs.demoApp.oDistrictVectorLayer1.features.length > 0 && marymcs.demoApp.oDistrictVectorLayer2.features.length > 0){
			var oCentroid = marymcs.demoApp.oDistrictVectorLayer2.features[0].geometry.getCentroid();
			var oLonLat = new OpenLayers.LonLat(oCentroid.x,oCentroid.y);	
						
			var oZoomBounds = marymcs.demoApp.oDistrictVectorLayer2.features[0].geometry.getBounds();
        
             if(marymcs.demoApp.oDistrictVectorLayer3.features.length > 0){
				for (var i = 1; i < marymcs.demoApp.oDistrictVectorLayer3.features.length; i++) {
						oZoomBounds.extend(marymcs.demoApp.oDistrictVectorLayer3.features[i].geometry.getBounds());	
				}
			}  
                       
     //       console.log('zoom based on layer 2--medium number--no data in layer 1');
			marymcs.demoApp.map.zoomToExtent(oZoomBounds);
			//	END of setting boundary based on Layer 2 assuming Layer 1 is empty
            
        } else if (marymcs.demoApp.oDistrictVectorLayer3.features.length > 0){        
            var oCentroid = marymcs.demoApp.oDistrictVectorLayer3.features[0].geometry.getCentroid();
			var oLonLat = new OpenLayers.LonLat(oCentroid.x,oCentroid.y);	
						
			var oZoomBounds = marymcs.demoApp.oDistrictVectorLayer3.features[0].geometry.getBounds();
     //        console.log('zoom based only on layer 3 (highest number)');
            marymcs.demoApp.map.zoomToExtent(oZoomBounds);
            //	END of setting boundary based on Layer 3 only
            
		}	else if (!marymcs.demoApp.oDistrictVectorLayer3.features.length > 0){
				alert("No district contributes more than 5,000 trips for this mode--\n--including the selected district. Therefore, map doesn't zoom in.");	//  one of the 2 above should work!!
		}
        
// buttons disabled at beginning of 'queryVectorLayers' function (so people can't put in another request before the first one is finished)
// are re-enabled here so that additional requests can be made..... 
        document.getElementById('fetchDataOrigins').disabled = false;
        document.getElementById('fetchDataDestinations').disabled = false;
        document.getElementById('resetData').disabled = false;
                  
};  	// 		END OF zoomToVectorLayerBounds FUNCTION



/* **************   9.  WRITE DATA TO GRID 'trips_grid' USING SELECTED DATA SOURCE   ******************  */
marymcs.demoApp.renderToGrid = function(dat_index) {
 
        document.getElementById('trips_grid').innerHTML = '';
       
        var which_data = '';
        switch(dat_index){
            case 1:
                which_data = ' TO district';
                break;
            case 2:
                which_data = ' FROM district';
                break;
             default:
                alert('no value passe for dat_index');
                break;             
        }
             
        var colDesc = [    //            {header : 'index',                                      dataIndex : 'MyID', width: '0px', style: 'align="right"' },
                            { header : 	'<br>DISTRICT', 				            dataIndex : 'DISTRICT' , width: '50px', style: 'align="right"' }, 
                            { header : 	'<br>TRIPS', 			                    dataIndex : 'TRIPS' , width: '50px', style: 'align="right"'}, 
                            { header : 	'%  of all trips <br>' + which_data, 	        dataIndex : 'PCT_TRIPS', width: '120px', style: 'align="right"' } 
                           
                            ];
                            
        switch(dat_index){                
               case 1:     
                     marymcs.demoApp.OriginGrid = new AccessibleGrid( { divId 		:	'trips_grid',
                                                tableId 	:	'orig_table',
                                                summary		: 	'rows are origin districts of trips to selected district including externals and columns are 1 district number 2 number of trips and 3 percent of total trips to this destination',
                                                caption		:	'Origins of ' + current_mode + ' Trips TO District:  ' + marymcs.demoApp.choice_district + ' In Year ' + year,
                                                ariaLive	:	'assertive',
                                                colDesc		: 	colDesc
                                                
                        });			
                     marymcs.demoApp.OriginGrid.loadArrayData(marymcs.demoApp.myData);
                     break;
                case 2:
                     marymcs.demoApp.DestinationGrid = new AccessibleGrid( { divId 		:	'trips_grid',
                                                tableId 	:	'dest_table',
                                                summary		: 	'rows are destination districts of trips from selected district including externals and columns are 1 district number 2 number of trips and 3 percent of total trips from this origin',
                                                caption		:	'Destinations of ' + current_mode + ' Trips FROM District:  ' + marymcs.demoApp.choice_district + ' In Year ' + year,
                                                ariaLive	:	'assertive',
                                                colDesc		: 	colDesc
                                                
                        });			
                     marymcs.demoApp.DestinationGrid.loadArrayData(marymcs.demoApp.myData);
                     break;
                 default:
                        alert('nothing exported to grid');
                        break;
           }
               
           if(document.getElementById('page_bottom').className==='hidden'){
                unhide('page_bottom');
           }
            
}       //  END 'renderToGrid' FUNCTION



/* ************  10. RESET DISPLAY AFTER COMBO BOX SELECTION CHANGES--BUT **NOT COMBO BOX ITSELF**  ****************/
/* ************      (invokes 'resetMode'--which keeps same selected district but zeroes out map and grid) *********/
marymcs.demoApp.resetDisplay = function() {

    marymcs.demoApp.resetMode();
  
    var oMode
    oMode = document.getElementById("selected_mode");
    oMode.selectedIndex = '';
	
	marymcs.demoApp.oHighlightLayer.destroyFeatures();	
	marymcs.demoApp.map.panTo(new OpenLayers.LonLat(234000,896500));
	marymcs.demoApp.map.zoomTo(2);
	 
     if (document.getElementById('modeSelect').className==='unhidden'){                            // Button: Get Destination Data
                    unhide('modeSelect');
    }

}       //  END 'resetDisplay' FUNCTION

/* ********************   NOTE:  resetMode can be invoked separately if only desired mode changes   *************************/

marymcs.demoApp.resetMode = function(){
    
    document.getElementById('trips_grid').innerHTML = '';
    
    if (document.getElementById('fetchDataOrigins').className==='unhidden'){                        // Button: Get Origin Data
                    unhide('fetchDataOrigins');
    }
    
    if (document.getElementById('fetchDataDestinations').className==='unhidden'){                   // Button: Get Destination Data
                    unhide('fetchDataDestinations');
    }
    
	if (document.getElementById('resetData').className==='unhidden'){                               // Button: Clear Data
                    unhide('resetData');	
	}
    
    if (document.getElementById('page_bottom').className==='unhidden'){                             // Link: get table of regions
                    unhide('page_bottom');
    }
    
     if (document.getElementById('legendOrig').className==='turned_on'){                            // Legend for Origins Data
					toggle_turn_on('legendOrig');
     }
     if (document.getElementById('legendDest').className==='turned_on'){                            // Legend for Destinations Data
					toggle_turn_on('legendDest');
	 }
       
    turn_off_vectors();
 
}       //  END 'resetMode' FUNCTION




/* *************      11. CLEAR ALL VECTOR LAYERS AS WELL AS COMBO BOX USED TO SELECT DISTRICT   *************/
marymcs.demoApp.clearSelection = function() {
      
    var oElt;
    oElt = document.getElementById("selected_district");
    oElt.selectedIndex = 0; 
   
    marymcs.demoApp.resetDisplay(); 
	
}        // END 'clearSelection' FUNCTION



/* **************     12. GET POPUP LIST OF ALL CODES AND REGION DEFINITIONS     ****************************/
marymcs.demoApp.regions_table = function() {
	popup('regions_lut.html');
}; // CTPS.lcApp.regions_table()









