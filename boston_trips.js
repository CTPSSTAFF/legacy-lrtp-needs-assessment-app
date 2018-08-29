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
var OD_districts_2012 = 'postgis:plan2040_od_boscen_2012';
var OD_districts_2040 = 'postgis:plan2040_od_boscen_2040';
var roadways = 'postgis:ctps_roadinventory_grouped';

// OTHER NEEDED GLOBAL VARIABLES
 var t = 0;                                                                 //  NOTE:  't' is a flag used in function to toggle 'displayCore' function on and off--used because old jQuery 'toggle' function deprecated.
 var strExtraLegend = '<span class="pix"><img src="images/BOS02.bmp" width="24" height="10" alt="" /></span><span id="BBD" class="pix_text">Boston Business District </span><br>'
 strExtraLegend += '<span class="pix"><img src="images/CEN02.bmp" width="24" height="10" alt="" /></span><span id="CEN_area" class="pix_text">Central Area </span><br>'
 var my_year = '', OD_districts;
 
 
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

function toggle_disable(element) {
    var item2 = document.getElementById(element);
    if (item2) {
        item2.disabled=(item2.disabled===true)?false:true;
    }
}


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
	for (i = 0; i < MPMUTILS.OD_corridors.length; i++) {           
        oOption = document.createElement("OPTION");
        oOption.value = MPMUTILS.OD_corridors[i][0];
        oOption.text = MPMUTILS.OD_corridors[i][0] + ', ' + MPMUTILS.OD_corridors[i][4]; 
        oSelect.options.add(oOption);
    }
    
    marymcs.demoApp.map = new OpenLayers.Map('map2',
		{   'projection': 'EPSG:26986',	
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
                
    oDistricts = new OpenLayers.Layer.WMS(
				"Districts",	marymcs.demoApp.szWMSserverRoot,
				{	layers: OD_districts_2012, 
  //                  styles: 'Plan2035_districts_ext_numbers', transparent: 'true'	},
                      styles: 'polygon', transparent: 'true'	},
                 {   singleTile: true, ratio: 1 } 
                    );
                    
     oTownNames = new OpenLayers.Layer.WMS(
				"Town Names", marymcs.demoApp.szWMSserverRoot,
                   { layers: towns_base, styles: 'Plan2035_towns_OD_boundaries', transparent: 'true'  }, 
                   {   singleTile: true, ratio: 1 }  
					 ); 
					 
	 marymcs.demoApp.map.addControl(new OpenLayers.Control.LayerSwitcher());

 // ALTERNATIVE STYLE FOR 'DISTRICT SELECTION' VECTOR LAYER--PINK-ish, WITH MINIMAL BORDER               
     var myStyle = new OpenLayers.Style( {'strokeColor': "#aaaaaa", 'strokeWidth': 0.5,
	                  'fillColor': '#ff4466', 'fillOpacity': 0.25,
                      'label': '${od_corridor_name}', 'fontColor':'black', 'fontFamily':'Arial', 'fontSize': 10, 'fontWeight': 'bold', 
                      'labelOutlineColor': 'white', 'labelOutlineWidth': 3});                
                      
     marymcs.demoApp.oHighlightLayer = new OpenLayers.Layer.Vector(
				"Selected District",
				{
						styleMap: myStyle		
				}		
			);
                                       
     var scale_control = new OpenLayers.Control.ScaleLine();
	
	 marymcs.demoApp.map.addLayers([oBaseLayer,
                                    oRoads, 
                                    oTownNames,
                                    oDistricts,                              
                                    marymcs.demoApp.oHighlightLayer
                                  ]);
                                 
                                                                 
    marymcs.demoApp.map.addControl(scale_control);
	marymcs.demoApp.map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	marymcs.demoApp.map.setCenter(new OpenLayers.LonLat(236590,901392));        
	marymcs.demoApp.map.zoomTo(2)
    
    if (!Modernizr.svg) {
        alert("Display of SVG charts not supported in older browser versions;\n--click 'Accessible Table' button instead to see data table.");
    } else {
        console.log('SVG supported');
    } 
    

}        //   END OF 'INIT' FUNCTION


//  marymcs.demoApp.toggleCoreDisplay = function(){                     //  put here in case this ends up being an old-fashioned function
   $(document).ready(function(){        
        
        $('#displayCore').click(function(){                            //  NOTE:  toggle method is DEPRECATED in most recent versions of jQuery  MMcS, July 17, 2014
        //    alert('got within click function');                      //   --this is my half-assed replacement....
            if(t===0){
                var new_style = 'Plan2040_core_outline';                
                oDistricts.mergeNewParams({'styles': new_style});    
                marymcs.demoApp.map.zoomTo(4);
                $('#extraLegend').append(strExtraLegend);
                if (document.getElementById('extraLegend').className==='turned_off'){     
					toggle_turn_on('extraLegend');
                }
                t = 1;
            } else {             
                var new_style = 'polygon';
                oDistricts.mergeNewParams({'styles': new_style});
                marymcs.demoApp.map.setCenter(new OpenLayers.LonLat(236590,901392)); 
                marymcs.demoApp.map.zoomTo(2);
                $('#extraLegend').html('');
                if (document.getElementById('extraLegend').className==='turned_on'){      
					toggle_turn_on('extraLegend');
                }
                t = 0;
          }
        });
     
    }); 
//}

 $(document).ready(function(){
         
            $('#year').change(function(){
                my_year = $(this).val();     
      //          my_year=$('#year :selected').val();                                   //      this also works 
                if(my_year==='2040'){
                    OD_districts = OD_districts_2040;
                } else {
                    OD_districts = OD_districts_2012;
                };
                
                if (document.getElementById('getDistrict').disabled==true){
                    toggle_disable('getDistrict');
                };
                
                marymcs.demoApp.resetDisplay();
               
            });
            
     });



/* ***************  3. GET DESIRED DISTRICT, ADD TO HIGHLIGHT LAYER ****************/
marymcs.demoApp.searchForDistrict = function(){

 /*     if (!Modernizr.svg) {
        alert("Display of SVG charts not supported in older browser versions;\n--click 'Accessible Table' button instead to see data table.");
    } else {
        console.log('SVG supported');
    }
*/


    // initialize variables/data store
	marymcs.demoApp.oHighlightLayer.destroyFeatures();   
 
     if (document.getElementById('page_bottom').className==='unhidden'){
	//				unhide('page_bottom');
     }
     if (document.getElementById('getDistrict').disabled==false){
        toggle_disable('getDistrict');
    }
     
     document.getElementById('trips_grid').innerHTML = '';
     document.getElementById('transit_grid').innerHTML = '';
     
     if(!(my_year)){     
        alert('No data YEAR selected yet--\nUse first combo box to select desired year, \nthen hit "Get Data" again');
        return;
     }
     
   
    // get district name from combo box	
	var myselect=document.getElementById("selected_district")
	for (var i=0; i<myselect.options.length; i++){
		if (myselect.options[i].selected==true){          
			 marymcs.demoApp.choice_district = myselect.options[i].value;
             var corr_text = myselect.options[i].text;
             var pos = corr_text.indexOf(',');           
             marymcs.demoApp.choice_text = (corr_text.slice(pos + 1)).toUpperCase();    
		}
	}
	
	if (marymcs.demoApp.choice_district === '') { 
		alert("NO DISTRICT SELECTED--TRY AGAIN");
		return;
	}    

    //  create WFS query to display district on map
    
    if (document.getElementById('legendCorr').className==='turned_off'){
					toggle_turn_on('legendCorr');
     }
    
    var cqlFilter;  
	cqlFilter = "(corridor_no=='" + marymcs.demoApp.choice_district + "')";
    
    document.getElementById('corridorName').innerHTML = 'Selected Trip Source: &nbsp;&nbsp; <span style="color: #7c1900">' + marymcs.demoApp.choice_text + '</span>';
     
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
				
                marymcs.demoApp.oHighlightLayer.destroyFeatures();
                marymcs.demoApp.myData = [];
  
				var szResponse = '';
  
				for (var i = 0; i < aFeatures.length; i++) {				
					oFeature = aFeatures[i];		
					marymcs.demoApp.oHighlightLayer.addFeatures(oFeature);
                    
                     var corridor, corridor_name, BBD_val = [], BBD_pct = [], BBD_T_val = [], BBD_T_val_pct = [], CEN_val = [], CEN_pct = [], CEN_T_val = [], CEN_T_val_pct = [], aTemp1, j, 
                            tempPct1, tempPct2, tempPct3, tempPct4, tempPct5, tempPct6;
                     var fld_name = [], transit_fld = [];
                     fld_name[0] = 'Highway';
                     fld_name[1] = 'Transit';
                     fld_name[2] = 'Bike';
                     fld_name[3] = 'Walk';
                     fld_name[4] = 'Total'; 
                     fld_name[5] = 'Percent of ALL Trips to Boston Bus.Dist. or Central area';
                     
                     transit_fld[0] = 'Bus'; transit_fld[1] = 'Rapid Transit'; transit_fld[2] = 'Commuter Rail'; transit_fld[3] = 'Ferry'; transit_fld[4] = 'Total Transit'; transit_fld[5] = 'Percent of All TRANSIT Trips to Boston Bus.Dist. or Central Area';
                     
                     BBD_val[0] = parseFloat(oFeature.attributes['bbd_highway']);
                     BBD_val[1] = parseFloat(oFeature.attributes['bbd_transit']);
                     BBD_val[2] = parseFloat(oFeature.attributes['bbd_bike']);
                     BBD_val[3] = parseFloat(oFeature.attributes['bbd_walk']);
                     BBD_val[4] = parseFloat(oFeature.attributes['bbd_total']);
                     BBD_val[5] = '';
                     BBD_pct[0] = parseFloat(oFeature.attributes['bbd_highway_pct']);        
                     BBD_pct[1] = parseFloat(oFeature.attributes['bbd_transit_pct']);        
                     BBD_pct[2] = parseFloat(oFeature.attributes['bbd_bike_pct']);       
                     BBD_pct[3] = parseFloat(oFeature.attributes['bbd_walk_pct']);                        
                     BBD_pct[4] = BBD_pct[0] + BBD_pct[1] + BBD_pct[2] + BBD_pct[3];   
                     BBD_pct[5] = parseFloat(oFeature.attributes['bbd_corr_share_ptrips']);                        
                     BBD_T_val[0] = parseFloat(oFeature.attributes['bbd_t_bus']);
                     BBD_T_val[1] = parseFloat(oFeature.attributes['bbd_t_rt']);
                     BBD_T_val[2] = parseFloat(oFeature.attributes['bbd_t_cr']);
                     BBD_T_val[3] = parseFloat(oFeature.attributes['bbd_t_ferry']);    
                     BBD_T_val[4] = (BBD_T_val[0] + BBD_T_val[1] + BBD_T_val[2] + BBD_T_val[3]).toFixed(0) ;    
                     for (j=0;j<5;j++){
                        BBD_T_val_pct[j] = BBD_T_val[j] / BBD_T_val[4];
                     }
                     BBD_T_val[5] = '';
                     BBD_T_val_pct[5] = oFeature.attributes['bbd_corr_share_ttrips'];                       
                     CEN_val[0] = parseFloat(oFeature.attributes['cen_highway']);
                     CEN_val[1] = parseFloat(oFeature.attributes['cen_transit']);
                     CEN_val[2] = parseFloat(oFeature.attributes['cen_bike']);
                     CEN_val[3] = parseFloat(oFeature.attributes['cen_walk']);
                     CEN_val[4] = parseFloat(oFeature.attributes['cen_total']);
                     CEN_val[5] = '';
                     CEN_pct[0] = parseFloat(oFeature.attributes['cen_highway_pct']);        
                     CEN_pct[1] = parseFloat(oFeature.attributes['cen_transit_pct']);         
                     CEN_pct[2] = parseFloat(oFeature.attributes['cen_bike_pct']);          
                     CEN_pct[3] = parseFloat(oFeature.attributes['cen_walk_pct']);          
                     CEN_pct[4] = CEN_pct[0] + CEN_pct[1] + CEN_pct[2] + CEN_pct[3];
                     CEN_pct[5] = parseFloat(oFeature.attributes['cen_corr_share_ptrips']);                
                     CEN_T_val[0] = parseFloat(oFeature.attributes['cen_t_bus']);
                     CEN_T_val[1] = parseFloat(oFeature.attributes['cen_t_rt']);
                     CEN_T_val[2] = parseFloat(oFeature.attributes['cen_t_cr']);
                     CEN_T_val[3] = parseFloat(oFeature.attributes['cen_t_ferry']);   
                     CEN_T_val[4] = (CEN_T_val[0] + CEN_T_val[1] + CEN_T_val[2] + CEN_T_val[3]).toFixed(0);
                     for (j=0;j<5;j++){
                        CEN_T_val_pct[j] = CEN_T_val[j] / CEN_T_val[4];
                     } 
                     CEN_T_val[5] = '';
                     CEN_T_val_pct[5] = oFeature.attributes['cen_corr_share_ttrips'];                                        
              
                     for (j = 0; j < 6; j++) { 
                            aTemp1 = [];
                            corridor = oFeature.attributes['od_corridor'];
                            corridor_name = oFeature.attributes['od_corridor_name'];     
                            aTemp1.push(corridor, corridor_name, fld_name[j], BBD_val[j], BBD_pct[j], CEN_val[j], CEN_pct[j], BBD_T_val[j], CEN_T_val[j]);           
                            marymcs.demoApp.myData.push(aTemp1);
                        }
                    
                    for(i=0;i<6;i++){                 
                        marymcs.demoApp.myData[i] = {
                           "field_name"         :     fld_name[i],
                           "transit_fld"        :     transit_fld[i],
                           "BBD_val"            :     addCommas(BBD_val[i]),
                           "BBD_pct"            :     (parseFloat(BBD_pct[i])*100).toFixed(1) + '%',
                           "CEN_val"            :     addCommas(CEN_val[i]),
                           "CEN_pct"            :     (parseFloat(CEN_pct[i])*100).toFixed(1) + '%',
                           "BBD_T_val"          :     BBD_T_val[i],
                           "commas_BBD_T_val"   :     addCommas(BBD_T_val[i]),                          //      NEED BOTH NUMBERS AND COMMA-DELINEATED (TEXT) ITEMS: numbers for chart, text for table
                           "BBD_T_val_pct"      :     (parseFloat(BBD_T_val_pct[i])*100).toFixed(1) + '%',
                           "CEN_T_val"          :     CEN_T_val[i],
                           "commas_CEN_T_val"   :     addCommas(CEN_T_val[i]),                          //      NEED BOTH NUMBERS AND COMMA-DELINEATED (TEXT) ITEMS: numbers for chart, text for table
                           "CEN_T_val_pct"      :    (parseFloat(CEN_T_val_pct[i])*100).toFixed(1) + '%'
                        }
                    }
                             
				}                                                                           //  END SCROLLING THROUGH FEATURES
                
                 marymcs.demoApp.renderToGrid();
                
			},                                                                              //  END 'SUCCESS'
			'failure': function(oRequest) {
				alert("failure");
			}                                                                               //  END 'FAILURE                      
		});											                                        //	END OpenLayers Request
        
      
}      //  END 'SearchForDistrict' FUNCTION





/* **************   9.  WRITE DATA TO GRID 'trips_grid' USING SELECTED DATA SOURCE   ******************  */
marymcs.demoApp.renderToGrid = function() {
 
    //  CLEAR, THEN RENDER, MAIN GRID
 
        document.getElementById('trips_grid').innerHTML = ''; 
        document.getElementById('transit_grid').innerHTML = '';
          
       
        var colDesc = [    //            {header : 'index',                                      dataIndex : 'MyID', width: '0px', style: 'align="right"' },
                            { header : 	'Mode', 				                        dataIndex : 'field_name' , width: '200px', style: 'align="right"' }, 
                            { header : 	'To Boston Bus. Dist.', 			            dataIndex : 'BBD_val' , width: '100px', style: 'align="right"'}, 
                            { header : 	'Percent by Mode', 	                            dataIndex : 'BBD_pct', width: '180px', style: 'align="right"' } ,
                            { header : 	'To Central Area', 			                    dataIndex : 'CEN_val' , width: '100px', style: 'align="right"'}, 
                            { header : 	'Percent by Mode', 	                            dataIndex : 'CEN_pct', width: '100px', style: 'align="right"' }        
                            ];
                                                                      
                
                     marymcs.demoApp.TripsGrid = new AccessibleGrid( { divId 		:	'trips_grid',
                                                tableId 	:	'trips_table',
                                                summary		: 	'rows are different modes including highway and transit and columns are 1 mode 2 total trips to Boston C B D 3 percent by mode 4 total trips to Central area 5 percent by mode',
                                                caption		:	'Trips to Boston Business District & Surrounding Central Area from <br /><span style="color: #7c1900">' + marymcs.demoApp.choice_text + '</span> by Mode <br />for Year: <span style="color: #7c1900">' + my_year + '</span>',
                                                ariaLive	:	'assertive',
                                                colDesc		: 	colDesc
                                                
                        });			
                     marymcs.demoApp.TripsGrid.loadArrayData(marymcs.demoApp.myData);
                     
                    

         var colDescTransit = [    //            {header : 'index',                                      dataIndex : 'MyID', width: '0px', style: 'align="right"' },
                            { header : 	'Transit Mode', 				                dataIndex : 'transit_fld' , width: '200px', style: 'align="right"' }, 
                            { header : 	'To Boston Bus. Dist.', 			            dataIndex : 'commas_BBD_T_val' , width: '100px', style: 'align="right"'}, 
                            { header : 	'Percent by Mode', 	                            dataIndex : 'BBD_T_val_pct', width: '180px', style: 'align="right"' } ,
                            { header : 	'To Central Area', 			                    dataIndex : 'commas_CEN_T_val' , width: '100px', style: 'align="right"'},
                            { header : 	'Percent by Mode', 	                            dataIndex : 'CEN_T_val_pct', width: '100px', style: 'align="right"' }        
                            ];
                                                                         
                
                     marymcs.demoApp.TransitGrid = new AccessibleGrid( { divId 		:	'transit_grid',
                                                tableId 	:	'transit_table',
                                                summary		: 	'rows are transit modes including bus and rapid transit and columns are 1 mode 2 total trips to Boston C B D 3 percent by mode 4 total trips to Central area 5 percent by mode',
                                                caption		:	'Mode Shares for Transit Trips Only',
                                                ariaLive	:	'assertive',
                                                colDesc		: 	colDescTransit
                                                
                        });			
                     marymcs.demoApp.TransitGrid.loadArrayData(marymcs.demoApp.myData);
                     
                      

    //  CREATE 2 PIE CHARTS SHOWING TRANSIT DISTRIBUTION FOR EACH DESTINATION
              
            //         var color_choice = ['#66c2a5','#fc8d62','#8da0cb', '#e78ac3'];
                     var color_choice = ['#66c2a5','#f79bac','#8da0cb','#a6d854'];                              //      MY PREFERRED SET
            //         var color_choice = ['#fbb4ae','#b3cde3','#ccebc5','#decbe4'];                            //      very pastel...
            //          var color_choice = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c'];                        //      very blue/green...
              
                     if(document.getElementById('chart_header').className==='hidden'){
                                  unhide('chart_header');
                      }
  
                      var pie1 = new d3pie("pieChart01", {                                                  //      see http://d3pie.org/#docs  for documentation
                        "footer": {
                            "text": "To Boston Business District",
                            "color": "#143987",                     
                            "fontSize": 14,
                    //    	"font": "arial bold",
                            "location": "bottom-center"
                        }, 
                        "size": {
                            "canvasHeight": 200,
                            "canvasWidth": 300,
                            "pieOuterRadius": 60
                        },
                        "data": {
                            "content": [
                                {
                                    "label": "Bus",
                                    "value": parseFloat(marymcs.demoApp.myData[0].BBD_T_val),               
                                    "color": color_choice[0]    // "#0066cc"
                                },
                                {
                                    "label": "Rapid Trans.",
                                    "value": marymcs.demoApp.myData[1].BBD_T_val,               
                                    "color": color_choice[1]        //"#003366"
                                },
                                {
                                    "label": "Comm. Rail",
                                    "value": marymcs.demoApp.myData[2].BBD_T_val,
                                    "color": color_choice[2]        //"#336600"
                                },
                                {
                                    "label": "Ferry",
                                    "value": marymcs.demoApp.myData[3].BBD_T_val,
                                    "color": color_choice[3]        //  "#669966"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 13,
                                "format":    "label-percentage2"
                            },
                            "inner": {
                                "format": "value",  //  "value" / "percentage"
                                "hideWhenLessThanPercentage": 5
                            },
                            "mainLabel": {
                                "font": "verdana",
                                "color": "#7c1900"
                            },
                            "percentage": {
                        //		"color": "#e1e1e1",
                                "color": "#7c1900",
                                "font": "verdana",
                                "decimalPlaces": 0
                            },
                            "value": {
                        //		"color": "#e1e1e1",
                                "color": "#eeeeee",
                                "font": "verdana"
                            },
                            "lines": {
                                "enabled": true,
                                "color": "#cccccc",
                                "style": "curved"
                            }
                        },
                        "effects": {
                            "load": {
                                "effect": "default", // none / default
                                speed: 1000
                            },
                        
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            },
                            
                            "highlightSegmentOnMouseover": true,
                            "highlightLuminosity": -0.5
                        }  
                    });
                     
                      
                     var pie2 = new d3pie("pieChart02", {               
                        "footer": {
                            "text": "To Central Area",
                            "color": "#143987",                      
                            "fontSize": 14,
                     //   	"font": "verdana bold",
                            "location": "bottom-center"
                        }, 
                        "size": {
                            "canvasHeight": 200,
                            "canvasWidth": 300,
                            "pieOuterRadius": 60
                        },
                        "data": {
                            "content": [
                                {
                                    "label": "Bus",
                                    "value": parseFloat(marymcs.demoApp.myData[0].CEN_T_val),               
                                    "color": color_choice[0]        
                                },
                                {
                                    "label": "Rapid Trans.",
                                    "value": parseFloat(marymcs.demoApp.myData[1].CEN_T_val),               
                                    "color": color_choice[1]       
                                },
                                {
                                    "label": "Comm. Rail",
                                    "value": parseFloat(marymcs.demoApp.myData[2].CEN_T_val),
                                    "color": color_choice[2]       
                                },
                                {
                                    "label": "Ferry",
                                    "value": parseFloat(marymcs.demoApp.myData[3].CEN_T_val),
                                    "color": color_choice[3]       
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 13,
                                "format":    "label-percentage2"
                            },
                            "inner": {
                                "format": "value",  //  "value" / "percentage"
                                "hideWhenLessThanPercentage": 5
                            },
                            "mainLabel": {
                                "font": "verdana",
                                "color": "#7c1900"
                            },
                            "percentage": {
                        //		"color": "#e1e1e1",
                                "color": "#7c1900",
                                "font": "verdana",
                                "decimalPlaces": 0
                            },
                            "value": {
                        //		"color": "#e1e1e1",
                                "color": "#eeeeee",
                                "font": "verdana"
                            },
                            "lines": {
                                "enabled": true,
                                "color": "#cccccc",
                                "style": "curved"
                            }
                        },
                        "effects": {
                            "load": {
                                "effect": "default", // none / default
                                speed: 1000
                            },
                        
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            },
                            
                            "highlightSegmentOnMouseover": true,
                            "highlightLuminosity": -0.5
                        }  
                    }); 
                                    
           if(document.getElementById('page_bottom').className==='hidden'){
                unhide('page_bottom');
           }
            
}                                                                                               //  END 'renderToGrid' FUNCTION


/* *************** 10.  TOGGLE BETWEEN PIE CHARTS AND ACCESSIBLE TABLE  **************************************** */
marymcs.demoApp.accessible_table = function(){
     if(document.getElementById('pie_charts').className === 'turned_on'){
        toggle_turn_on('pie_charts');
        toggle_turn_on('transit_grid');
        document.getElementById('table_switch_text').innerHTML = 'To switch transit share display back to charts, click here:';
        document.getElementById('switchTable').value = 'Charts';
     } else {
        toggle_turn_on('pie_charts');
        toggle_turn_on('transit_grid');
        document.getElementById('table_switch_text').innerHTML = 'For accessible table of transit mode shares, click here:&nbsp;&nbsp;&nbsp;';
        document.getElementById('switchTable').value = 'Accessible Table';    
     }    
};                                                                                              //  END TOGGLE PIE CHARTS/ACCESSIBLE TABLE FUNCTION                                                                                             


/* ************  11. RESET DISPLAY AFTER COMBO BOX SELECTION CHANGES--BUT **NOT COMBO BOX ITSELF**  ****************/
/* ************      (invokes 'resetMode'--which keeps same selected district but zeroes out map and grid) *********/
marymcs.demoApp.resetDisplay = function() {

    t = 1;
    $('#displayCore').click();
    
    marymcs.demoApp.resetMode();  
	
	marymcs.demoApp.oHighlightLayer.destroyFeatures();	
//	marymcs.demoApp.map.panTo(new OpenLayers.LonLat(234000,896500));
//	marymcs.demoApp.map.zoomTo(2);
    
}       //  END 'resetDisplay' FUNCTION

/* ********************   NOTE:  resetMode can be invoked separately if only desired mode changes   *************************/

marymcs.demoApp.resetMode = function(){
    
    document.getElementById('trips_grid').innerHTML = '';
    document.getElementById('transit_grid').innerHTML = '';
    
    document.getElementById('pieChart01').innerHTML = '';
    document.getElementById('pieChart02').innerHTML = '';
    
    if(document.getElementById('pie_charts').className === 'turned_off'){
        marymcs.demoApp.accessible_table();
    }
        
    
    if (document.getElementById('getDistrict').disabled==true){
        toggle_disable('getDistrict');
    }
    
    if (document.getElementById('legendCorr').className==='turned_on'){
					toggle_turn_on('legendCorr');
     }
    
    if(document.getElementById('chart_header').className==='unhidden'){
            unhide('chart_header');
     }
            
    if (document.getElementById('page_bottom').className==='unhidden'){                             //  has toggle for pie charts/accessible table
                    unhide('page_bottom');
    }
    
}                                                                                                   //  END 'resetMode' FUNCTION


/* *************      12. CLEAR ALL VECTOR LAYERS AS WELL AS COMBO BOX USED TO SELECT DISTRICT   *************/
marymcs.demoApp.clearSelection = function() {
      
    var oElt;
    oElt = document.getElementById("selected_district");
    oElt.selectedIndex = 0; 
   
    marymcs.demoApp.resetDisplay(); 
	
}                                                                                                   // END 'clearSelection' FUNCTION





