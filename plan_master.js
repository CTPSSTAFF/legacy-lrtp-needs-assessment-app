marymcs = {};
marymcs.demoApp = {};
marymcs.demoApp.map = {};



marymcs.demoApp.myData = [];
marymcs.demoApp.myData2 = [];
marymcs.demoApp.myData3 = [];
CSSClass = {};
marymcs.demoApp.myLayer = 0;
marymcs.demoApp.myCorridor = '';


marymcs.demoApp.szServerRoot = 'http://www.ctps.org:8080/geoserver/';
marymcs.demoApp.szWMSserverRoot = marymcs.demoApp.szServerRoot + '/wms'; 
marymcs.demoApp.szWFSserverRoot = marymcs.demoApp.szServerRoot + '/wfs';

//FREQUENTLY-USED LAYERS:                                               // NOTES ON CURRENT/NEWLY-ADDED LAYERS: 
//var taz2727 = 'ctpssde:MPODATA.PLAN2035_TAZ_2012REV';                 // NOTE: was used for SE map and table displays up until September 2014, when it was replaced by layer below
var taz2727 = 'postgis:plan2040_taz_2012_2040';                 // New layer added September 19, 2014, with 2010(really 2012) and 2040 data for population, households, employment, and NEW truck trip-end data for 2012 and 2040--see metadata in ArcCatalog for truck data source 
//var taz2727_2010 = 'ctpssde:MPODATA.PLAN2035_TAZ_DATA_2010';            // NOTE: this data is labeled 2010, as it is in its original source; in the HTML, it represented the '2012 Base Case' until this layer was replaced by the one just above.
var taz2727_donut = 'postgis:plan2035_taz2727_donut';           // old 'donut' layer replaced with one that uses only stops on primary-variation bus routes as the bus part of dissolved buffer/cookie cutter.  McS, July 9, 2014
//var elderly = 'ctpssde:MPODATA.PLAN2035_TN_ELDER_POLY';
var elderly = 'postgis:plan2035_tn_elder_2010';                 // new layer created using 2010 data on population over 70, provided by Paul Reim July 8, 2014.   MMcS.
var ej_layer = 'postgis:plan2035_taz_ej_tit_vi_poly';           // new layer created using current SDE TAZ layer and combining Title VI and 'areas of concern' designations into one.  MMcS, March 20, 2014
var corridors = 'postgis:ctps_bk2035_corridors';
var central_corr = 'postgis:plan2035_circum_corr_poly';
//var VOClayer = 'ctpssde:MPODATA.PLAN2035_VOC_ARC3';
var VOClayer = 'postgis:plan2035_voc_2014';                     //  new layer created using new VOC data for Base Case, provided by Ben Dowling May 30, 2014
var VOClayer_2040 = 'postgis:plan2040_voc_2040_arc';            //  new layer created using new VOC data for Future (AM & PM) Case, provided by Bruce Kaplan, Sept 19, 2014
//var CMP_speeds = 'ctpssde:MPODATA.CTPS_CMS_OBSERVED_SPEEDS';          //  OLD SPEED LAYER -- removed from display/layer Sept 12, 2014
var towns_layer = 'postgis:mgis_towns_polym';
var towns_survey_layer = 'postgis:mgis_townssurvey_polym';
var major_roads = 'postgis:ctps_roadinventory_grouped';
var pavement = 'postgis:plan2035_pavement_arc';                 //  new layer created from data provided by KJacob May 2014
var rapid_transit = 'postgis:plan2035_mbta_rt_arc';
var CR_arcs = 'postgis:plan2035_mbta_cr_arc';
var CR_stns = 'postgis:plan2035_mbta_cr_stn';
var bus_routes = 'postgis:plan2035_bus_routes';                 //  Revised bus route layer (Spring 2013 schedule) added March 13, 2014.  MMcS.
var route_names = 'postgis:plan2035_bus_routenames_tbl';        //  Revised table (Spring 2013 schedule) added March 13, 2014.  MMcS.
var airports = 'postgis:plan2035_airports';                     
var park_ride_lots = 'postgis:plan2035_eot_park_ride';
var seaports = 'postgis:plan2035_seaports_pt';
//var ferries = 'ctpssde:MPODATA.EOT_FERRYROUTES_ARC';                  //  OLD ferry route, superseded Sept 19, 2014
var ferries = 'postgis:ctps_ferry_routes_arc';                  //  new ferry route layer added by KJacob, Sept 19, 2014                    
var bikes_built = 'postgis:plan2035_bikes_built_arc';
var bikes_table = 'postgis:plan2035_bikes_summtab';
//var crash_layer = 'ctpssde:MPODATA.PLAN2035_CRASHES_5PCT';            //  old crash layer, from previous Plan but modified to get top 5 percent of ALL, not by corridor.  MMcS. 
//var crash_layer = 'ctpssde:MPODATA.PLAN2035_CRASHES_09_11_PT';        //  crash layer, obtained from KJacob in May 2014--note: polygons converted to points for display purposes. Does NOT contain 2012 crashes--not available when layer created.  MMcS, July 7, 2014
var crash_layer_poly = 'postgis:plan2040_crash_2013_all_poly';  //  crash layer, obtained from KJacob in October 2015--both POLYGON and point layer(below) displayed in App (see metadata).
var crash_layer_pt = 'postgis:plan2040_crash_2013_all_pt';      //  crash layer, obtained from KJacob in October 2015--both polygon and POINT layer(above) displayed in App (see metadata).
var crash_bikes_poly = 'postgis:plan2040_crash_2013_bike_poly'; //  POLYGONS added to SDE October 21, 2015; based on KJacob data added earlier in October (see metadata)
var crash_bikes_pt = 'postgis:plan2040_crash_2013_bike_pt';     //  POINTS added to SDE October 21, 2015; based on KJacob data added earlier in October (see metadata)
var crash_peds_poly = 'postgis:plan2040_crash_2013_ped_poly';   //  POLYGONS added to SDE October 21, 2015; based on KJacob data added earlier in October (see metadata)
var crash_peds_pt = 'postgis:plan2040_crash_2013_ped_pt';       //  POINTS added to SDE October 21, 2015; based on KJacob data added earlier in October (see metadata)
var intersections = 'postgis:plan2035_cmp_intersections';       //  REMOVED for 2014 version of Plan app
var truck_gen = 'postgis:plan2035_truck_gen_pt';                //  OLD, but not updated (yet?)  NOTE (14 Oct 2014) won't be updated--but now attached to 2012 truck trip ends layer, not 2040.  MPM.
var rail_freight = 'postgis:plan2040_rail_freight_arc';         //  added Sept 12, 2014, based on data provided by KJacob from current editing work on CTPS railroad layers
var spd_idx_table = 'postgis:plan2040_spd_index_tbl';           //  added with new evaluations--data created by Ryan Hicks, July 14, 2014, MMcS.
var tt_table = 'postgis:plan2040_ttime_index_tbl';              //  added with new evaluations--data created by Ryan Hicks, July 14, 2014, MMcS.
var VOC_table = 'postgis:plan2040_voc_2014_tbl';                //  added with new data created by Ben Dowling (?), July 14, 2014, MMcS.



  



/////////////////////////////////////////////    A. UTILITY FUNCTIONS    ////////////////////////////////////////////


//  Javascript file from http://www.accessibleculture.org/research-files/accessible-tabs/case1.php#tabs  --
//  variations on Ginader's tabs app which does NOT repeat the tabs headers at the end of the page......
var AccTabs = (function() {
    $(function() {
        //for each DIV containing a set of tabs...
        $(".tabs").each( 
            function(t){
                var tabsDiv=$(this);
                var targetId="tab-"+t;
                var list='';
                //for the h2 in each tab div
                $(tabsDiv).find("h2").each(
                    function(h){
                        list+='<li><a href="#' + targetId + '">' + $(this).text() + '</a></li>';
                        $(this).remove();
                    }
                );
                $(tabsDiv).prepend('<ul class="tabsMenu">' + list + '</ul>').find(">div").addClass("tab").hide();
                $(tabsDiv).find(".tab:first").show().before('<h2 class="mainH2"><a id="' + targetId +'" tabindex="-1">' + $(tabsDiv).find(".tabsMenu>li:first").text() + '</a></h2>');
                $(tabsDiv).find(".tabsMenu>li:first").toggleClass("current").find("a").prepend('<span>Current Tab: </span>');
                //for each tabs menu link
                $(tabsDiv).find(">ul>li>a").each(
                    function(a){
                        $(this).click(
                            function(e){	
                                e.preventDefault();
                                $(tabsDiv).find(">ul>li.current").toggleClass("current").find(">a>span").remove();
                                $(this).blur();
                                $(tabsDiv).find(".tab:visible").hide();
                                $(tabsDiv).find(".tab").eq(a).show();
                                $("#" + targetId).text($(this).text()).focus();//NOTE: focus is being set BEFORE the span is written to the tab menu anchor and the li class change
                                $(this).prepend('<span>Current Tab: </span>').parent().toggleClass("current");
                            }
                        );
                    }
                );
            }
        );
    });
})();


if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    'use strict';
    if (this == null) {
      throw new TypeError();
    }
    var n, k, t = Object(this),
        len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }
    n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    if (n >= len) {
      return -1;
    }
    for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}


// SUITE OF (5) 'HIDE' FUNCTIONS TO ALLOW HIDING OF DIFFERENT PAGE ELEMENTS AS REQUIRED:

// 1. FUNCTIONS BELOW ARE SHORT CUTS TO HIDE ALL THE LAYERS DEPLOYED ON LOAD, BY CATEGORY/THEME
        marymcs.demoApp.hideSubregionWindow = function(){
            marymcs.demoApp.oWindowRadial.setVisibility(false);
            marymcs.demoApp.oWindowCore.setVisibility(false); 
        }

        marymcs.demoApp.hideSELayers = function(){
            marymcs.demoApp.oTAZ.setVisibility(false);
            marymcs.demoApp.oTAZ_donut.setVisibility(false);
            marymcs.demoApp.oElderly.setVisibility(false);
            marymcs.demoApp.oEJ.setVisibility(false);
        } 

        marymcs.demoApp.hideTRLayers = function(){
            new_style = 'RoadsMultiscaleGroupedBG';
            marymcs.demoApp.oRoads.mergeNewParams({'styles': new_style});
            marymcs.demoApp.map.setLayerIndex(marymcs.demoApp.oRoads, 2);                           //      low value = close to bottom of stack for BASE LAYER (moved up when that becomes the clicked layer)
            marymcs.demoApp.oRoads.setVisibility(true);
            marymcs.demoApp.oPavement.setVisibility(false);
            marymcs.demoApp.oTAZ_trucks.setVisibility(false);
            marymcs.demoApp.oTruckGen.setVisibility(false);
            marymcs.demoApp.oRailFreight.setVisibility(false);
            marymcs.demoApp.oRT.setVisibility(false);  
            marymcs.demoApp.oCR.setVisibility(false);
            marymcs.demoApp.oPorts_PkRide.setVisibility(false);
            marymcs.demoApp.oFerries.setVisibility(false);
            marymcs.demoApp.oBikes.setVisibility(false);  
            marymcs.demoApp.oVOC.setVisibility(false);
            marymcs.demoApp.oVOC_2040.setVisibility(false);
      //      marymcs.demoApp.oSpeeds.setVisibility(false);
      //      marymcs.demoApp.oIntersections.setVisibility(false); 
            marymcs.demoApp.oCrashes.setVisibility(false);
            marymcs.demoApp.oBikeCrashes.setVisibility(false);
            marymcs.demoApp.oPedCrashes.setVisibility(false);
            marymcs.demoApp.oHighlightLayerBus.setVisibility(false);
        }


//  2. FUNCTIONS BELOW CLEAR OUT RADIO BUTTONS AND LEGENDS AS WELL AS JUST HIDING LAYERS
$(document).ready(function(){    
        $('#SE_clear').click(function(){   
            marymcs.demoApp.hideSELayers();
            marymcs.demoApp.oHighlightLayerTAZ.destroyFeatures();
            marymcs.demoApp.oHighlightLayerTowns.destroyFeatures();
            var radio = document.getElementsByName('my_choice');         
            for(var i = 0; i < radio.length; i++){
                if(radio[i].checked === true){
                    radio[i].checked = false;}
            }
            var oElement = document.getElementById('legend_div1');
            oElement.innerHTML = '';
            CSSClass.add('mytabs');  
        });                                                                                                     //  END clear socioeconomic map layers function
        
        $('#TR_clear').click(function(){          
            marymcs.demoApp.hideTRLayers();    
            var radio = document.getElementsByName('t_choice');        
            for(var i = 0; i < radio.length; i++){
                if(radio[i].checked === true){
                    radio[i].checked = false;}
            }
            var oElement = document.getElementById('legend_div2');
            oElement.innerHTML = ''; 
            var oElement2 = document.getElementById('legend_div3');          
            oElement2.innerHTML = '';  
            $('#drop_list').hide();  
        });                                                                                                     //  END clear_transportation map layers function
 
        $('#all_clear_map').click(function(){    
            marymcs.demoApp.oHighlightLayerTowns.destroyFeatures();
            $('#SE_clear').click();
            $('#TR_clear').click();
        });                                                                                                     //  END clear_allmap_layers function
        
});                                                                                                             //  END (document).ready function

        marymcs.demoApp.clearAllGrids = function(){
            document.getElementById('pop_grid').innerHTML = '';
            document.getElementById('hh_grid').innerHTML = '';
            document.getElementById('emp_grid').innerHTML = '';
            document.getElementById('eld_grid').innerHTML = '';                                               
            document.getElementById('crash_grid').innerHTML = '';
            document.getElementById('VOC_grid').innerHTML = '';      
            document.getElementById('spd_idx_grid').innerHTML = '';
            document.getElementById('tt_grid').innerHTML = '';
            document.getElementById('CRStn_grid').innerHTML = '';
            document.getElementById('airport_grid').innerHTML = '';
            document.getElementById('PRlots_grid').innerHTML = '';
            document.getElementById('boatdocks_grid').innerHTML = '';  
            document.getElementById('bikes_grid').innerHTML = '';
         }
 
 
// 3.  FUNCTIONS BELOW USED TO CLOSE AND OPEN EACH THEME/CATEGORY BOX WITH ITS RADIO BUTTONS--BUT LEAVES HEADERS SHOWING
        function unhide(divID) {
            //function toggles hiding and unhiding the SECTION (population, employment, elderly)
            //NOTE: CSS currently uses 'display: none' --this means no spaces left between elements, which can then move up on the page
            var item = document.getElementById(divID);
            if (item) {
                item.className=(item.className==='hidden')?'unhidden':'hidden';
            }
         }
 
        function unhideLine(divID) {
            //function toggles hiding and unhiding the buttons and other elements that go on and off depending on user clicks
            //NOTE: CSS currently uses 'visibility: none' so that spaces ARE left between elements (in this case, buttons are not all scrunched together)
            var item = document.getElementById(divID);
            if (item) {
                item.className=(item.className==='hidden2')?'unhidden2':'hidden2';
            }
        }
  
       $(document).ready(function(){               
        //	var $firstPara = $('p');                    //      either this or the exposed version just below works:
        //	$firstPara.hide();                          //      sets all 'p' elements to be hidden when page loads
            $('p').hide();
            
            $('li a').click(function(){                 //      function triggers opening and closing of 'p' elements when topic link clicked 
                var $link = $(this);                    
                $link.parent()
                    .find('p')
                    .animate({
        //          $firstPara.animate({                                                                                //      using this line instead of above (starting with $link=this) 
                    height: 'toggle',                                                                                   //      opens & closes ALL elements within a group, not just the child elements         
                    opacity: 'toggle'
                }, 100);       
                return false; 
             });
    

//  4. FUNCTIONS TRIGGERED ONLY BY O-D LINKS (#3 OR #4 ON PAGE) TO HIDE EVERYTHING ABOVE IT TO MAKE ROOM FOR DISPLAYED TABLES, ETC.  
       $('#main_OD').click(function(){
            var allDivs = ['socioeconomic','transportation'];
            for(var j=0; j<allDivs.length;j++){
                var item = document.getElementById(allDivs[j]);
                if(item.className==='unhidden'){ 
                   item.className = 'hidden';
                }
            }  
            window.open('OD_page.html','_blank')        //      ,'height=700,width=1300,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=no,directories=no,status=yes'); 
        });                                                                 
        
        $('#second_OD').click(function(){
            var allDivs = ['socioeconomic','transportation'];
            for(var j=0; j<allDivs.length;j++){
                var item = document.getElementById(allDivs[j]);
                if(item.className==='unhidden'){ 
                   item.className = 'hidden';
                }
            }  
            window.open('boston_trips.html','_blank')   //  ,'height=750,width=1350,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=no,directories=no,status=yes'); 
        });                                                               
        
 
 // 5.  FUNCTIONS WHICH RESPOND TO BUTTONS ON TOP OF MAP
        $('#About').click(function(){
            window.open('about_text.html','_blank','height=750,width=900,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');      
        });
        
         $('#Help').click(function(){
            window.open('help_text.html','_blank','height=750,width=900,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes');      
        });
        
         $('#Comment').click(function(){
            window.open('http://www.ctps.org/contact','_blank');      
        });
 
 });                                                                                                                    //  END OF (document).ready function
       
//  6. TURN OFF ALL ENTITY LAYERS IF TOWN SELECTED FOR HIGHLIGHT LAYER -- NOT USED AT PRESENT
        function turnOffAllEntityLayers() {
                marymcs.demoApp.hideSubregionWindow();
                marymcs.demoApp.hideSELayers();
                marymcs.demoApp.hideTRLayers(); 
        }

//  END OF SUITE OF 'HIDE' FUNCTIONS
        

//  OTHER UTILITY FUNCTIONS
function addCommas(nStr)
{
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

CSSClass.is = function(e, c){                               //  Not enough to pass in the NAME of the element to be tested--you also have to grab it from the DOM; hence the next line.
    var e = document.getElementById(e);
//e  is the element being tested
    return e.className.search("\\b" + c + "\\b") != -1;
}

// Adds class 'hidden' to element 'mytabs'
CSSClass.add = function(element){
	var e = document.getElementById(element);
	e.className += ' hidden';
}

// Removes class 'hidden' from element 'mytabs'
CSSClass.remove = function(element){
	var e = document.getElementById(element);
	e.className = e.className.replace(/hidden/gi,"");
} 

// function converts data read in from OpenLayers Request from all-caps or all-lower-case to Title Case: 
function toTitleCase(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
 
// adds color to table element associated with map click 
 $(document).ready(function() {
        marymcs.demoApp.do_color = function(search_value){
                $('tr td')
                .parent()
                .removeClass('wrappedElement');                  
                $('td:contains(' + search_value + ')')                                                             
                .parent()
                .addClass('wrappedElement');  
        }
 });                                                                                            //  END (document).ready function
            
//  END OF OTHER UTILITY FUNCTIONS



 
//////////////////////////////////////////////////////  B. INITIALIZE MAP FUNCTION--       /////////////////////////////////////////////////
///////////////////////////////////      ALL LAYERS DEPLOYED AT BEGINNING, BUT SET TO 'NOT VISIBLE'     /////////////////////////////////
///////////////////////////////////      (UNLESS TURNED ON BY LAST PIECE OF THIS FUNCTION)          /////////////////////////////////
marymcs.demoApp.init = function(){

        var szUrl = marymcs.demoApp.szWFSserverRoot + '?';                                       //  var szUrl = '/geoserver/wfs?';
        var szParams = szUrl;
        szParams += '&service=wfs';
        szParams += '&version=1.0.0';
        szParams += '&request=getfeature';     
        szParams += '&typename=' + route_names;
        szParams += '&propertyname=route_name,ctps_route_text';

        var aTemp = [];
        var oTemp = {};
        var oOption = {};
        var i = 0;

//  THE FOLLOWING REQUEST JUST POPULATES THE BUS ROUTE NAME DROP-DOWN BOX UNDER 'TRANSPORTATION DATA'--IT DOESN'T DO ANYTHING ELSE !! 
 OpenLayers.Request.issue({
                'method': 'GET',
                'url': szParams,
                'success': function(oRequest) {
                    var g = new OpenLayers.Format.GML();
                    var aFeatures = g.read(oRequest.responseText);
                    for (i = 0; i < aFeatures.length; i++) {
                        oFeature = aFeatures[i];
                        oTemp = {};                                                            
                        oTemp.station = parseFloat(oFeature.attributes['ctps_route_text']);                    
                        oTemp.station_order = oFeature.attributes['route_name'];
                        aTemp.push(oTemp);								
                    };											
                            
                // Sort the results of the WFS request;                                                 
                    aTemp.sort(function(a,b){				
                        var stna = a.station, stnb = b.station;
                        if (stna < stnb)
                            return -1
                        if (stna > stnb)
                            return 1
                        return 0                                                                                  //    default value if no sorting
                    });
                                        
                // Populate the pull down list
                    for (i = 0; i < aTemp.length; i++) {
                        oOption = document.createElement("OPTION");	
                        var combined = aTemp[i].station + ', ' + aTemp[i].station_order;						
                        oOption.text = combined;      
                        document.drop_list.route_name.options.add(oOption);  
                    }
                    
                },
                'failure': function(oRequest)
                {
                    alert("failure populating list of bus routes");
                }
        });										                                                                //		END of OpenLayers request to get station names for combo box
                                                                                             
	
	marymcs.demoApp.map = new OpenLayers.Map('map',
		{   'projection': 'EPSG:26986',
	//		'maxResolution':'2000',
			'maxExtent': new OpenLayers.Bounds(1000,757875,346000,1007875),
			'units': 'm',
			'scales': [1800000, 900000, 450000, 225000, 112500,56250,28125,14062.5,7031.25]	});
	
        var oBaseLayer = new OpenLayers.Layer.WMS(
            "Towns",
            marymcs.demoApp.szWMSserverRoot,               
            {   layers: towns_survey_layer,                                    
                styles: 'Plan2040_town_names_boundaries'    },                             //      changed to this style which includes town names, because these render poorly if not in BaseLayer
            {   singleTile: true, ratio: 1, visibility: true }
        );

        marymcs.demoApp.oTAZ = new OpenLayers.Layer.WMS(
            "TAZ", marymcs.demoApp.szWMSserverRoot,
                {	layers:  taz2727, transparent: 'true'},
                {	singleTile: true, ratio: 1, visibility: false}  );
        
/*      marymcs.demoApp.oTAZ_2010 = new OpenLayers.Layer.WMS(                              //      LEAVE OUT UNTIL FUTURE DATA ADDED
    "TAZ_2010", marymcs.demoApp.szWMSserverRoot,
        {	layers:  taz2727_2010, transparent: 'true'},
        {	visibility: false}  ); 
*/

       marymcs.demoApp.oTAZ_donut = new OpenLayers.Layer.WMS(
             "TAZ_donut", marymcs.demoApp.szWMSserverRoot,
				{	layers:  taz2727_donut, transparent: 'true'},                   
				{	singleTile: true, ratio: 1, visibility: false}  );   
                
       marymcs.demoApp.oElderly = new OpenLayers.Layer.WMS(
			"Elderly", marymcs.demoApp.szWMSserverRoot,
				{	layers:  elderly, transparent: 'true'},
				{	singleTile: true, ratio: 1, visibility: false}  ); 
                
        marymcs.demoApp.oEJ = new OpenLayers.Layer.WMS(
			"EJ Areas", marymcs.demoApp.szWMSserverRoot,
				{	layers: ej_layer, transparent: 'true'},
				{	singleTile: true, ratio: 1, visibility: false}  );                

      marymcs.demoApp.oTAZ_trucks = new OpenLayers.Layer.WMS(
            "Trucks", marymcs.demoApp.szWMSserverRoot,
				{	layers:  taz2727, transparent: 'true'		},
				{	singleTile: true, ratio: 1, visibility: false	}	);               
                
       marymcs.demoApp.oTruckGen = new OpenLayers.Layer.WMS(
            "Truck Generators", marymcs.demoApp.szWMSserverRoot,
                {   layers: taz2727 + ',' + truck_gen, transparent: 'true',                               
     //               styles:  'Plan2040_trucks_2040,Plan2035_truckgen_2030' },     //NOTE:  truck generators originally attached to 2040 trip ends--now, 2012 trip ends, as per B.Kuttner.  MPM, Oct 14, 2014.
                    styles:  'Plan2040_trucks_2012,Plan2035_truckgen_2030' },   
				{	singleTile: true, ratio: 1, visibility: false	}	);
                

       marymcs.demoApp.oRailFreight = new OpenLayers.Layer.WMS(
            "Rail Freight", marymcs.demoApp.szWMSserverRoot,
                {   layers:  rail_freight, transparent: 'true' },
				{	singleTile: true, ratio: 1, visibility: false	}	);         
        
       marymcs.demoApp.oRT = new OpenLayers.Layer.WMS(
            "MBTA Rapid Transit", marymcs.demoApp.szWMSserverRoot,	
                {   layers:  rapid_transit, transparent: 'true' }, 
				{	singleTile: true, ratio: 1, visibility: false	}	);                
                   
       marymcs.demoApp.oCR = new OpenLayers.Layer.WMS(
            "MBTA Commuter Rail", marymcs.demoApp.szWMSserverRoot,	
                {   layers:  CR_arcs + ',' + CR_stns, transparent: 'true'   },
				{	singleTile: true, ratio: 1, visibility: false	}	);                

       marymcs.demoApp.oPorts_PkRide = new OpenLayers.Layer.WMS(
            "Ports/Pk-Ride", marymcs.demoApp.szWMSserverRoot,
                {	layers:  airports + ',' + park_ride_lots + ',' + seaports, transparent: 'true' },
				{	singleTile: true, ratio: 1, visibility: false	}	);
                                
       marymcs.demoApp.oFerries = new OpenLayers.Layer.WMS(
            "Ferries", marymcs.demoApp.szWMSserverRoot,	
                {   layers:  ferries, transparent: 'true'  },
				{	singleTile: true, ratio: 1, visibility: false	}	); 
                                          
       marymcs.demoApp.oBikes = new OpenLayers.Layer.WMS(
            "Bikes", marymcs.demoApp.szWMSserverRoot,
                {   layers:   bikes_built, styles: 'Plan2035_bikes', transparent: 'true' },     
				{	singleTile: true, ratio: 1, visibility: false	}	);                             			
                                    
       marymcs.demoApp.oVOC = new OpenLayers.Layer.WMS(
			"V-C ratio", marymcs.demoApp.szWMSserverRoot,
				{	layers:  VOClayer, transparent: 'true'},
                {   singleTile: true, ratio: 1, visibility: false }  ) ;
                
       marymcs.demoApp.oVOC_2040 = new OpenLayers.Layer.WMS(
			"V-C 2040", marymcs.demoApp.szWMSserverRoot,
				{	layers:  VOClayer_2040, transparent: 'true'},
                {   singleTile: true, ratio: 1, visibility: false }  ) ;
				
                
       marymcs.demoApp.oCrashes = new OpenLayers.Layer.WMS(
            "Crashes", marymcs.demoApp.szWMSserverRoot,	
                {   layers:  crash_layer_poly + ',' + crash_layer_pt, transparent: 'true'},
				{   singleTile: true, ratio: 1, visibility: false }  );

       marymcs.demoApp.oBikeCrashes = new OpenLayers.Layer.WMS(
                    "Bike Crashes",	marymcs.demoApp.szWMSserverRoot,
                    {	layers: crash_bikes_poly + ',' + crash_bikes_pt,
    //                     styles: 'Plan2040_crash_bike_poly_1color,Plan2040_crash_bike_point_1color', 
                        transparent: 'true'	},
                    {   singleTile: true, ratio: 1, visibility: false}   
         ); 
                
      marymcs.demoApp.oPedCrashes = new OpenLayers.Layer.WMS(
                    "Ped Crashes",	marymcs.demoApp.szWMSserverRoot,
                    {	layers: crash_peds_poly + ',' + crash_peds_pt,
         //               styles: 'Plan2040_crash_ped_poly_1color,Plan2040_crash_ped_point_1color', 
                        transparent: 'true'	},
                    {   singleTile: true, ratio: 1, visibility: false}   
         ); 
    
       marymcs.demoApp.oRoads = new OpenLayers.Layer.WMS(
				"Roadways",	marymcs.demoApp.szWMSserverRoot,	
                {   layers: major_roads, styles: 'RoadsMultiscaleGroupedBG', transparent: 'true'  },
                {   singleTile: true, ratio: 1, visibility: true }  );                
                
       marymcs.demoApp.oPavement = new OpenLayers.Layer.WMS(
				"Pavement",	marymcs.demoApp.szWMSserverRoot,	
                {   layers: pavement, styles: 'Plan2035_pavement_cond', transparent: 'true'  },
                {   singleTile: true, ratio: 1, visibility: false }  );       
                                                       
       marymcs.demoApp.oWindowRadial = new OpenLayers.Layer.WMS(
            "Radial Corridors", marymcs.demoApp.szWMSserverRoot,
				{	layers:  corridors, transparent: 'true'	},
				{	singleTile: true, ratio: 1, visibility: false	}	); 
                
       marymcs.demoApp.oWindowCore = new OpenLayers.Layer.WMS(
            "Core", marymcs.demoApp.szWMSserverRoot,
				{	layers:  central_corr, styles: 'Plan2035_corridor_Central', transparent: 'true'	},
				{	singleTile: true, ratio: 1, visibility: false	}	);                      			
  
       marymcs.demoApp.oTownNames = new OpenLayers.Layer.WMS(
				"Town Names", marymcs.demoApp.szWMSserverRoot,
					{ layers: towns_survey_layer, styles: 'Plan2040_town_names_boundaries', transparent: 'true'  },                   
                    {singleTile: true, ratio: 1, visibility: true}); 	
  
                       
       var oStyleHighlightedTown = new OpenLayers.Style( {'strokeColor': "#FF0000", 'strokeWidth': 2.5,
	                                                   'fillColor': 'none', 'fillTransparency': 1.0 });
       var oStyleHighlightedTAZ = new OpenLayers.Style( {'strokeColor': "#cc0066", 'strokeWidth': 1.5,                  
	                                                   'fillColor': '#ffff33', 'fillOpacity': 0.4 });
                                                       
//  Style definition for bus routes, based on Chapter 10 in "OpenLayers" book:
        var vector_style = new OpenLayers.Style({
            fillColor: "red", 
            fillOpacity: 1, 
            strokeColor: "red", 
            strokeWidth: 3.5
        });
			
        var vector_style_select = new OpenLayers.Style({
            fillColor: "#00b366", 
            fillOpacity: 1, 
            strokeColor: "#00b366", 
            strokeWidth: 3.5
        });
                    
        var myStyle = new OpenLayers.StyleMap({
            'default': vector_style,
            'select':  vector_style_select
        });
                                                             
        marymcs.demoApp.oHighlightLayerTowns = new OpenLayers.Layer.Vector(
			"Selected Towns",
			{
                styleMap: oStyleHighlightedTown
			}
		);
        
         marymcs.demoApp.oHighlightLayerTAZ = new OpenLayers.Layer.Vector(
			"Selected TAZs",
			{
                styleMap: oStyleHighlightedTAZ
			}
		);
        
         marymcs.demoApp.oHighlightLayerBus = new OpenLayers.Layer.Vector(
			"Selected Bus Route",
			{
                styleMap: myStyle
			}
		);
                              				
	var scale_control = new OpenLayers.Control.ScaleLine();
	
	marymcs.demoApp.map.addLayers([oBaseLayer,
                                marymcs.demoApp.oRoads,                               
                                marymcs.demoApp.oTAZ,                             
                                marymcs.demoApp.oTAZ_donut,
                                marymcs.demoApp.oElderly,                    
                                marymcs.demoApp.oEJ,
                                marymcs.demoApp.oTAZ_trucks,                 
                                marymcs.demoApp.oTruckGen,
                                marymcs.demoApp.oRailFreight,
                                marymcs.demoApp.oRT,                     
                                marymcs.demoApp.oCR,                
                                marymcs.demoApp.oPorts_PkRide,                 
                                marymcs.demoApp.oFerries,
                                marymcs.demoApp.oBikes,                 			
                                marymcs.demoApp.oVOC,
                                marymcs.demoApp.oVOC_2040,
                                marymcs.demoApp.oPavement, 
                   //             marymcs.demoApp.oSpeeds,
                   //             marymcs.demoApp.oIntersections,
                                marymcs.demoApp.oCrashes,
                                marymcs.demoApp.oBikeCrashes,
                                marymcs.demoApp.oPedCrashes,
                                marymcs.demoApp.oWindowRadial,
                                marymcs.demoApp.oWindowCore     
                               ]);                                 
		
        
//  Display town names ON TOP OF selected data layer; only display roads (scale-dependent) after data layer selected	
	
    marymcs.demoApp.map.addLayers([marymcs.demoApp.oHighlightLayerTowns, marymcs.demoApp.oHighlightLayerTAZ, marymcs.demoApp.oHighlightLayerBus ]);
//    marymcs.demoApp.map.addLayers([marymcs.demoApp.oTownNames]);                  //  omitted because town names actually render better (from label in BaseLayer) if this is left out here
	marymcs.demoApp.map.addControl(scale_control);
	marymcs.demoApp.map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	marymcs.demoApp.map.setCenter(new OpenLayers.LonLat(236590,901392));        
	marymcs.demoApp.map.zoomTo(2);
    
     marymcs.demoApp.map.events.register('click', null, marymcs.demoApp.onClickHandler);
    
         
//  START OFF WITH TABLE AND OTHER WIDGETS HIDDEN
    $('#getSETable,#downloadSEData,#clearSETable').hide();
    $('#drop_list').hide();                                                                    
    $('#downloadTRRegionwideData,#clearTRRegionTable').hide();
      
};                                                                                              //  END OF INITIALIZE MAP FUNCTION


///////////////////////////////////////   C. 'SELECT SUBREGION' TO ZOOM INTO FUNCTION  //////////////////////////////////////////////////////////
//  START OF 'GET SUBREGION TO ZOOM INTO' FUNCTION, triggered by selecting subregion in combo box OR
//  by value passed to page as cookie from calling link, and read as 'marymcs.demoApp.myCorridor'

   $(document).ready(function() { 
   
      $("#selected_region").change(function(){                                                  // get selected subregion from combo box                            	
       var region_abbrev=$('#selected_region :selected').val();                                 // THIS WORKS--.val() gives value, .text() gives HTML text
       var region_txt=$('#selected_region :selected').text();                                   // --see JAVASCRIPT & JQUERY: MISSING MANUAL page 261 for this usage                         
        marymcs.demoApp.chosen_entity = region_abbrev;        
        marymcs.demoApp.getSubregion();                                                         //  call general 'Get Subregion' function       
      });                                                                                       //  END of 'Acquire subregion from Combo Box' jQuery function
           
      
      marymcs.demoApp.getSubregion = function(){                                                //  uses value input from either combo box or cookie to get subregion extent, new style, & zoom level and display
	        
		if (!marymcs.demoApp.chosen_entity) {                                                   //  i.e., if combo box empty or not activated         
            if(marymcs.demoApp.myCorridor===null) {                                             //  AND if ..myCorridor is null (no cookie read in)
                    alert("NO Entity Selected--TRY AGAIN");
                    return;
            } else {
                    marymcs.demoApp.chosen_entity = marymcs.demoApp.myCorridor;                 //  use value passed in as cookie to select and display subregion
			}
		};
              
       marymcs.demoApp.hideSubregionWindow();                                                   //  turn off all subregion windows before selecting one to display
       
        var a, b, zoomLevel;                                                                    //  collect window/zoom parameters from separate data file
        for(i=0;i<PLAN.subregions.length;i++){   
            if(PLAN.subregions[i][1]==marymcs.demoApp.chosen_entity){  
                a = PLAN.subregions[i][2];
                b = PLAN.subregions[i][3];
                zoomLevel = PLAN.subregions[i][4];
            }
        }
       
        if(!(marymcs.demoApp.chosen_entity=='Core'||marymcs.demoApp.chosen_entity=='Region')){
                var new_style = 'bk2035_corridor_' + marymcs.demoApp.chosen_entity;                
                marymcs.demoApp.oWindowRadial.mergeNewParams({'styles': new_style});
                marymcs.demoApp.oWindowRadial.setVisibility(true);
        } else if(marymcs.demoApp.chosen_entity=='Core'){
                 marymcs.demoApp.oWindowCore.setVisibility(true);
        }

         marymcs.demoApp.map.setCenter(new OpenLayers.LonLat(a,b));
         marymcs.demoApp.map.zoomTo(zoomLevel);
  //       marymcs.demoApp.map.setLayerIndex(marymcs.demoApp.oTownNames,99);   //    to be sure that town names get displayed on top of zoomed layer(doesn't always work...)
         
    };                                                                                        //    END OF 'get subregion extents and zoom level, and display' function
 //    var sweet = marymcs.demoApp.map.getLayerIndex(marymcs.demoApp.oTownNames);
 //    console.log('layer index = ', sweet);
 });                                                                                          //    END OF (document).ready function within 'GET SUBREGION' section


//////////////////////////////////////////     D. 'GET DATA FOR MAP DISPLAY' FUNCTIONS: 2 CATEGORIES (SE and TR)     //////////////////////////////////////////////

//  D.1.  START OF 'GET SOCIOECONOMIC DATA' FUNCTION (MAP)
$(document).ready(function() { 
    
    
    
     $('input[name="my_choice"]').click(function(){                                           //  Get SE data layer choice(MAP) from clicked radio button using jQuery  
            var item = $(this).attr('id');
            marymcs.demoApp.getSEData(item);
       });                                                                                    //  END of function to identify desired layer from clicked radio button
       
       
      marymcs.demoApp.getSEData = function(item) {                                            //  Uses identified SE data layer (from radio button OR passed cookie) to get parameters
                                                                                              //  for that layer from separate PLAN.js file, and display layer on map
            marymcs.demoApp.hideSELayers();      
            var new_style, szLegendHeader, layer_used, OL_layer; 
       
     /*  I CAN'T FIND A WAY TO PASS DESIRED LAYER TO 'mergeNewParams' STATEMENT AS VARIABLE--HAVE TO DO IT INDIVIDUALLY FOR EACH LAYER--see below: 
            var pref_layer = [];
            pref_layer[0] = marymcs.demoApp.oTAZ;
            pref_layer[1] = marymcs.demoApp.oElderly;
     */       
           
            for(i=0;i<PLAN.socioeconomic.length;i++){
                    if(PLAN.socioeconomic[i][1]==item){   
                        new_style = PLAN.socioeconomic[i][2];
                        szLegendHeader = PLAN.socioeconomic[i][3];
                        layer_used = PLAN.socioeconomic[i][4];
                        OL_layer = PLAN.socioeconomic[i][5];               
                        switch(OL_layer){
                        case 'oTAZ': 
             //               pref_layer[0].mergeNewParams({'styles': new_style});                 //  These work!  but need to use in conjunction with above pref_layer definition
             //               pref_layer[0].setVisibility(true);
                            marymcs.demoApp.oTAZ.mergeNewParams({'styles': new_style});
                            marymcs.demoApp.oTAZ.setVisibility(true);
                            break;
                        case 'oElderly':
                            marymcs.demoApp.oElderly.mergeNewParams({'styles': new_style});
                            marymcs.demoApp.oElderly.setVisibility(true);
                            break;
                        case 'oTAZ_donut':
                            marymcs.demoApp.oTAZ_donut.mergeNewParams({'styles': new_style});
                            marymcs.demoApp.oTAZ_donut.setVisibility(true);
                            break;
                        case 'oEJ':
                            marymcs.demoApp.oEJ.mergeNewParams({'styles': new_style});
                            marymcs.demoApp.oEJ.setVisibility(true);
                            break;
                        default:
                            alert('no choice made among socioeconomic layers'); 
                            return;
                        }                                                                     //  END 
                        break;
                    }                                                                         //  END 'IF = item'
            };                                                                                //  END LOOP through PLAN.socioeconomic
            
            var szStyle2 = new_style;
            var szUrl2 = "<img "
        //	szUrl2 += szBlurbLeg;                                                             //  leave here for now--will be filled in to accessibilify
            szUrl2 += " src=\'";
            szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
            szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
            szUrl2 += "layer=" + layer_used + "&";                                            
            szUrl2 += "style=";
            szUrl2 += szStyle2; 
            szUrl2 += "\'></img>";
            var oElement = document.getElementById('legend_div1');
            oElement.innerHTML = '';
            oElement.innerHTML = szLegendHeader + '<br>' + szUrl2; 
            
     };                                                                                       //  END of 'GET SE DATA' function
            
                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                         
//  D.2.  START OF 'GET TRANSPORTATION DATA' FUNCTION (MAP)
//  NOTE:  special function below this one (D.2a) created below (around line 915) just to get and display a single bus route   
      
    $('input[name="t_choice"]').click(function(){                                             //  Get TR data layer choice(MAP) from clicked radio button using jQuery  
        document.getElementById('route_name').value = '';                                     //  first deal with bus drop-down list: zero out identified route in bus combo box 
        $('#drop_list').hide();                                                               //  re-hide bus drop_list if necessary because new layer chosen

        var item = $(this).attr('id');
        marymcs.demoApp.getTRData(item);        
     });                                                                                      //  END of jQuery function to identify desired layer from clicked radio button
     
        
    marymcs.demoApp.getTRData = function(item) {                                              //  Uses identified SE data layer (from radio button OR passed cookie) to get parameters
                                                                                              //  for that layer from separate PLAN.js file, and display layer on map. 
                                                                                              
        if(item=='buses'){                                                                    //  Display bus drop_list if, in fact, 'buses' is the chosen ID   
              $('#drop_list').show();
         };
     
        marymcs.demoApp.hideTRLayers();
        var oElement2 = document.getElementById('legend_div3');       
        oElement2.innerHTML = '';  
                 
        var new_style, szLegendHeader, layer_used, OL_layer;
        
        console.log('item = ', item);
        
     //  I CAN'T FIND A WAY TO PASS DESIRED LAYER TO 'mergeNewParams' STATEMENT AS VARIABLE--HAVE TO DO IT INDIVIDUALLY FOR EACH LAYER
             
        for(i=0;i<PLAN.transportation.length;i++){                                            //  START of loop through PLAN.transportation to pick out selected layer
                if(PLAN.transportation[i][1]==item){                                          //  START of loop to assign parameter values associated with desired layer   
                    new_style = PLAN.transportation[i][2];
                    console.log('item= ', item, ' and new_style = ' , new_style);
                    szLegendHeader = PLAN.transportation[i][3];
                    layer_used = PLAN.transportation[i][4];
                    OL_layer = PLAN.transportation[i][5];
                    console.log('layer used = ', layer_used, ' and OL_layer = ', OL_layer, ' item = ', item);
                    switch(OL_layer){                                                          // START of 'SWITCH' to choose data layer and assign parameters which can not be made into generic variable
                    case 'oRoads':                                                             // (see note above beginning "I CAN'T FIND A WAY....")
                        marymcs.demoApp.oRoads.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oRoads.setVisibility(true);
                        marymcs.demoApp.map.setLayerIndex(marymcs.demoApp.oRoads, 99); 
                        break;
                    case 'oPavement':                        
                        marymcs.demoApp.oPavement.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oPavement.setVisibility(true);
                        break;
                    case 'oRT':   
                        marymcs.demoApp.oRT.setVisibility(true);
                        break;
                    case 'oCR':    
                        marymcs.demoApp.oCR.setVisibility(true);
                        break;
                    case 'oPorts_PkRide':
                        marymcs.demoApp.oPorts_PkRide.setVisibility(true);
                        break;
                    case 'oFerries':     
                        marymcs.demoApp.oFerries.setVisibility(true);
                        break;
                    case 'oBikes':    
                        marymcs.demoApp.oBikes.setVisibility(true);
                        break;
                    case 'oTAZ_trucks':
                        marymcs.demoApp.oTAZ_trucks.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oTAZ_trucks.setVisibility(true);
                        break;
                     case 'oTruckGen':
           //             console.log('new_style = ', new_style);
                        marymcs.demoApp.oTruckGen.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oTruckGen.setVisibility(true);
                        break;
                    case 'oRailFreight':
                        marymcs.demoApp.oRailFreight.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oRailFreight.setVisibility(true);
                        break;
                    case 'oSpeeds':
                        marymcs.demoApp.oSpeeds.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oSpeeds.setVisibility(true);
                        break;
                    case 'oVOC':                       
                        marymcs.demoApp.oVOC.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oVOC.setVisibility(true);
                        break;
                    case 'oVOC_2040':                       
                        marymcs.demoApp.oVOC_2040.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oVOC_2040.setVisibility(true);
                        break;
          /*          case 'oIntersections':
                        marymcs.demoApp.oIntersections.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oIntersections.setVisibility(true);
                        break;    */
                    case 'oCrashes':             
                        marymcs.demoApp.oCrashes.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oCrashes.setVisibility(true);
                        break;
                    case 'oBikeCrashes':             
                        marymcs.demoApp.oCrashes.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oBikeCrashes.setVisibility(true);
                        break;
                     case 'oPedCrashes':             
                        marymcs.demoApp.oCrashes.mergeNewParams({'styles': new_style});
                        marymcs.demoApp.oPedCrashes.setVisibility(true);
                        break;
                    default:
                        alert('no choice made among transportation layers'); 
                        return;
                };                                                                             //     END SWITCH--Pick transportation layer
            };                                                                                 //     END 'GET TR DATA' function
        };                                                                                     //     END LOOP through PLAN.transportation

        var szStyle2 = new_style;	    
        var szUrl2 = "<img "
    //	szUrl2 += szBlurbLeg;                                                                  //    leave here for now--will be filled in to accessibilify
        if(layer_used===intersections){                                                                         
                szUrl2 += " src='images/intersections2.gif' width='4%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Priority Intersections</span>";                                                                         
        } else if(item==="airports_etc"){
                szUrl2 += " src='images/airport_mrk2.gif' width='8%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Airports</span>";
                szUrl2 += "<br /><img src='images/park_ride7.gif' width='8%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Park-ride lots</span>";
                szUrl2 += "<br /><img src='images/port.gif' width='8%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Passenger docks</span>";
        } else if(item==='CR'){   
                szUrl2 += " src='images/purple_line3.gif' width='25%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Rail lines</span>";
                szUrl2 += "<br />&nbsp;&nbsp;&nbsp;<img src='images/mbta_symbol.gif' width='8%'"; 
                szUrl2 += "></img>&nbsp;&nbsp;&nbsp;&nbsp;<span class='legend-label'>  Stations</span>";                 
        } else if(layer_used===major_roads){ 
                szUrl2 += " src='images/interstate_2dig.gif' width='10%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>Interstate</span>";
                szUrl2 += "<br /><img src='images/US3.gif' width='10%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>U.S. highway</span>";
                szUrl2 += "<br /><img src='images/state_square_b.gif' width='8%'";
                szUrl2 += "></img>&nbsp;<span class='legend-label'>  State route</span>"; 
        } else if(item==='2030truckgen'){
                var szUrl3 = szUrl2;
                szUrl2 += " src=\'";
                szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl2 += "layer=" + taz2727 + "&";
                szUrl2 += "style=Plan2035_trucks_2030";               
                szUrl2 += "\'></img>";
                szUrl3 += " src=\'";
                szUrl3 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl3 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl3 += "layer=" + truck_gen + "&";
                szUrl3 += "style=Plan2035_truckgen_2030";               
                szUrl3 += "\'></img>";
          } else if(item==='crashes'){              
                szUrl2 += " src=\'";
                szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl2 += "layer=" + crash_layer_poly + "&";
                szUrl2 += "style=Plan2040_crash_gen_poly_1color";               
                szUrl2 += "\'></img>";       
         } else if(item==='bike_crashes'){              
                szUrl2 += " src=\'";
                szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl2 += "layer=" + crash_bikes_poly + "&";
                szUrl2 += "style=Plan2040_crash_bike_poly_1color";               
                szUrl2 += "\'></img>"; 
        } else if(item==='ped_crashes'){              
                szUrl2 += " src=\'";
                szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl2 += "layer=" + crash_peds_poly + "&";
                szUrl2 += "style=Plan2040_crash_ped_poly_1color";               
                szUrl2 += "\'></img>";
        } else {        
                szUrl2 += " src=\'";
                szUrl2 += marymcs.demoApp.szWMSserverRoot + '?';
                szUrl2 += "request=getlegendgraphic&version=1.0.0&format=image/png&width=20&height=20&";
                szUrl2 += "layer=" + layer_used + "&";                                            
                szUrl2 += "style=";
                szUrl2 += szStyle2; 
                szUrl2 += "\'></img>";
        }
        
        var oElement = document.getElementById('legend_div2');
        oElement.innerHTML = '';
        if(!(item=='buses')){
            oElement.innerHTML = szLegendHeader + '<br>' + szUrl2;
        };
        if(szUrl3){
            var oElement2 =  document.getElementById('legend_div3');
            oElement2.innerHTML = 'Selected Truck Trip Generators<br>' + szUrl3;
        }
      
    };                                                                                         //   END OF 'GET TR DATA' function
        
});                                                                                            //   END of (document).ready function for TRANSPORTATION DATA                                                                                                            


//D.2a.  SPECIAL FUNCTION TO SELECT, DISPLAY, A SINGLE BUS ROUTE
marymcs.demoApp.searchForRoute = function() {
// function responds to change in combo box to select station, put in Vector Layer,
// and highlight on screen

     marymcs.demoApp.hideTRLayers(); 
     var oElement = document.getElementById('legend_div2');
     oElement.innerHTML = '';
	
	console.log('got inside this function');
	var myselect = document.getElementById("route_name");
    for(var j=0;j<myselect.options.length;j++){
        if(myselect.options[j].selected==true){
            var realwords = myselect.options[j].innerHTML;
            break;
        }
    }
   
    console.log('realwords = ', realwords);   
	
	
	i = realwords.indexOf(',',0);
	var route_no = realwords.substring(0,i);
    var tempname = realwords.substring(i+1);

	var szSearchForMe = route_no;
	
	if (szSearchForMe === '') { 
		alert("NO ROUTE SELECTED--TRY AGAIN");
		return;
	}
		                                   
	var cqlFilter = "(ctps_route=='" + szSearchForMe + "')";
    
	OpenLayers.Request.issue({                                                                 //  create WFS query to display selected bus route on screen  
			'method': 'GET',
			'url': marymcs.demoApp.szWFSserverRoot + '?', 
			'params': {
				service: 'WFS',
				version: '1.0.0',	
                typename:  bus_routes,
				request: 'getfeature',
				cql_filter: cqlFilter
			},
			'headers': {'content-type' : 'application/xml'},
			'success': function(oRequest) {
				var g = new OpenLayers.Format.GML();
				var aFeatures = g.read(oRequest.responseText);
				
				if (aFeatures.length === 0) {
					alert('no ROUTE with that name found');			
					return;
				}
				
				var szResponse = '';
				for (var i = 0; i < aFeatures.length; i++) {				
					oFeature = aFeatures[i];
					if(i===0){
                         szResponse = oFeature.attributes['ctps_route_text'];
                         var caption = oFeature.attributes['route_name'];     
                    };
					marymcs.demoApp.oHighlightLayerBus.destroyFeatures();
					marymcs.demoApp.oHighlightLayerBus.addFeatures(oFeature);			
				}
                
                 szLegendHeader = '<span class="legend_text">MBTA Bus Route:</span><br />';
                 marymcs.demoApp.oHighlightLayerBus.setVisibility(true);                
                 oElement.innerHTML = szLegendHeader + '<span class="legend-label">' + szResponse + ' -- ' + caption + '</span>'; 
				
	//			var oZoomBounds = marymcs.demoApp.oHighlightLayerBus.features[0].geometry.getBounds();          //NOTE:  ZOOMING TAKEN OUT, AT LEAST TEMPORARILY
	//			marymcs.demoApp.map.zoomToExtent(oZoomBounds);
										
			},
			'failure': function(oRequest) {
				alert("failure");
			}
		});											                                           //	END OpenLayers Request
};													                                           //	END SearchForRoute function

                                                                 
///////////////////////////////////////////////////////       END OF 'GET DATA FOR MAP DISPLAY' FUNCTIONS    /////////////////////////////////////////////




/////////////////////////////////////////////////////        E. 'GET DATA FOR DATA TABLES' FUNCTIONS    ////////////////////////////////////////////
////////////////////////////////////////////  (responds to GET DATA button, clicked after towns added to highlight layer)  //////////////////////
//  E.1.  START OF 'GET SOCIOECONOMIC DATA BY TOWN' FUNCTION (TABLE)                        
//  (2 functions -- displaySEData (pop and employment) and displayEldData (elderly))
//  (includes subfunction to identify TAZ-ID of clicked row and pass it to function "highlightMapTAZ", which will add to h.layer and color yellow)
$(document).ready(function() { 

 //   marymcs.demoApp.displaySEData = function(){
    
    $('#getSETable').click(function(){

        marymcs.demoApp.popGrid = {};
        marymcs.demoApp.hhGrid = {};
        marymcs.demoApp.empGrid = {}; 
        marymcs.demoApp.eldGrid = {};

        if(marymcs.demoApp.oHighlightLayerTowns.features.length === 0){
                alert('No towns selected for query--\nadd some town selections to map, then try again');
                return;
        }
        
        marymcs.demoApp.oHighlightLayerTAZ.destroyFeatures();
        
        $('#downloadSEData').show();
        $('#clearSETable').show();
         
        marymcs.demoApp.clearAllGrids();

        marymcs.demoApp.myData.length = 0;
        marymcs.demoApp.myData2.length = 0;
        
        var typename1 =  taz2727;                                                             //    NOTE: taz2727_2010 not used yet because no future case there yet                                                         
        var cql_Filter = '';       
        var id = new Array();
        var townname = new Array();
        var townProper = [];
        marymcs.demoApp.allTowns = '';

            
        for (var j = 0; j < marymcs.demoApp.oHighlightLayerTowns.features.length; j++) {
            id[j] = marymcs.demoApp.oHighlightLayerTowns.features[j].attributes.town_id;
            townname[j] = marymcs.demoApp.oHighlightLayerTowns.features[j].attributes.town;   //  NOTE: town name WITHOUT quotation marks around it
            townProper[j] = toTitleCase(townname[j]);
            marymcs.demoApp.allTowns += townProper[j];
    //		cql_Filter += '(TOWN00==' + townProper[j] + ')';                                  //  Town_ID used instead because of varying town names (e.g., Manchester-By-the-Sea)
            cql_Filter += '(town_id==' + id[j] + ')';
            if (j < marymcs.demoApp.oHighlightLayerTowns.features.length - 1) {
                cql_Filter += 'OR';
                marymcs.demoApp.allTowns += ' and ';
                }
        }
                  
        marymcs.demoApp.items_SE = "town,taz,pop_psqmi_2010,emp_psqmi_2010,hh_psqmi_2010,pop_psqmi_2040,emp_psqmi_2040,hh_psqmi_2040,pop_psqmi_change,emp_psqmi_change,hh_psqmi_change";
                
        var szQry = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry += "request=getfeature&version=1.0.0&service=wfs&";
        szQry += "typename=" + typename1 + "&";
        szQry += "CQL_filter=" + cql_Filter + "&";
        szQry += "propertyName=" + marymcs.demoApp.items_SE;
            
        OpenLayers.Request.issue({
        //	method: "POST",
                url: szQry,
                success: function(oRequest) {
                        var aTemp = [];
                        var oGmlReader = new OpenLayers.Format.GML();
                        var aFeatures = oGmlReader.read(oRequest.responseText);

                        if (aFeatures.length === 0) {
                            alert('No features found, possibly because \ntown outside Plan area');       
                            $('#clearSETable').click();
                            return;
                        } else {
     
                            for (k = 0; k < aFeatures.length; k++) {
                                marymcs.demoApp.myData[k] = {      'MyID'               : k,
                                                                   'TAZ'                : parseInt(aFeatures[k].attributes['taz']),
                                                                   'TOWN'               : aFeatures[k].attributes['town'],
                                                                   'POP_PSQMI_2010'     : addCommas((parseFloat(aFeatures[k].attributes['pop_psqmi_2010'])).toFixed(0)),
                                                                   'POP_PSQMI_2040'     : addCommas((parseFloat(aFeatures[k].attributes['pop_psqmi_2040'])).toFixed(0)),
                                                                   'POP_PSQMI_CHANGE'   : addCommas((parseFloat(aFeatures[k].attributes['pop_psqmi_change'])).toFixed(0))                                                             
                                                              };
                                 };
                                 
                            for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData2[k] = { 'MyID'               : k,
                                                                   'TAZ'                : parseInt(aFeatures[k].attributes['taz']),
                                                                   'TOWN'               : aFeatures[k].attributes['town'],
                                                                   'EMP_PSQMI_2010'     : addCommas((parseFloat(aFeatures[k].attributes['emp_psqmi_2010'])).toFixed(0)),
                                                                   'EMP_PSQMI_2040'     : addCommas((parseFloat(aFeatures[k].attributes['emp_psqmi_2040'])).toFixed(0)),
                                                                   'EMP_PSQMI_CHANGE'   : addCommas((parseFloat(aFeatures[k].attributes['emp_psqmi_change'])).toFixed(0))
                                                          };
                             };   

                             for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData3[k] = { 'MyID'               : k,
                                                                   'TAZ'                : parseInt(aFeatures[k].attributes['taz']),
                                                                   'TOWN'               : aFeatures[k].attributes['town'],
                                                                   'HH_PSQMI_2010'     : addCommas((parseFloat(aFeatures[k].attributes['hh_psqmi_2010'])).toFixed(0)),
                                                                   'HH_PSQMI_2040'     : addCommas((parseFloat(aFeatures[k].attributes['hh_psqmi_2040'])).toFixed(0)),
                                                                   'HH_PSQMI_CHANGE'   : addCommas((parseFloat(aFeatures[k].attributes['hh_psqmi_change'])).toFixed(0))
                                                          };
                             };     
                                 
                                                                                                
                            //  Sort JSON Array by TAZ (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                            function SortByTaz(x,y) {
                              return ((x.TAZ == y.TAZ) ? 0 : ((x.TAZ > y.TAZ) ? 1 : -1 ));
                            }
                          
                            marymcs.demoApp.myData.sort(SortByTaz);
                            marymcs.demoApp.myData2.sort(SortByTaz);
                            marymcs.demoApp.myData3.sort(SortByTaz);
                                                 
                            var colDescPop = [                                                   //        {header : 'index',     dataIndex : 'MyID' },
                                { header : 	'<br>TAZ', 				        dataIndex : 'TAZ' , width: '50px', style: '' }, 
                                { header : 	'<br>TOWN', 			        dataIndex : 'TOWN' , width: '100px', style: ''}, 
                                { header : 	'POP PER SQ MI <br />2012', 	    dataIndex : 'POP_PSQMI_2010', width: '80px', style: 'align="right"' }, 
                                { header : 	'POP PER SQ MI <br />2040', 	    dataIndex : 'POP_PSQMI_2040', width: '80px', style: 'align="right"' },
                                { header : 	'POP DENSITY <br />CHANGE', 	dataIndex : 'POP_PSQMI_CHANGE', width: '80px', style: 'align="right"' }
                                ];
                            
                             marymcs.demoApp.popGrid = new AccessibleGrid( { divId 		:	'pop_grid',
                                                        tableId 	:	'pop_table',
                                                        summary		: 	'rows are individual TAZs within selected town and columns are TAZ, town name, population per square mile for 2012 and 2040, and percent change 2012 to 2040',
                                                        caption		:	'Population Densities by TAZ for ' + marymcs.demoApp.allTowns + ':<br />Population per Sq. Mi. 2012, 2040, Change 2012-2040<br />(Click on line in table to see TAZ highlighted on map) ',
                                                //        ariaLive	:	'assertive',
                                                        colDesc		: 	colDescPop
                                                        
                                });			
                             marymcs.demoApp.popGrid.loadArrayData(marymcs.demoApp.myData);


                             var colDescHH = [                                                   //        {header : 'index',     dataIndex : 'MyID' },
                                { header : 	'<br>TAZ', 				        dataIndex : 'TAZ' , width: '50px', style: '' }, 
                                { header : 	'<br>TOWN', 			        dataIndex : 'TOWN' , width: '100px', style: ''}, 
                                { header : 	'HH PER SQ MI <br />2012', 	    dataIndex : 'HH_PSQMI_2010', width: '80px', style: 'align="right"' }, 
                                { header : 	'HH PER SQ MI <br />2040', 	    dataIndex : 'HH_PSQMI_2040', width: '80px', style: 'align="right"' },
                                { header : 	'HH DENSITY <br />CHANGE', 	    dataIndex : 'HH_PSQMI_CHANGE', width: '80px', style: 'align="right"' }
                                ];
                            
                             marymcs.demoApp.hhGrid = new AccessibleGrid( { divId 		:	'hh_grid',
                                                        tableId 	:	'hh_table',
                                                        summary		: 	'rows are individual TAZs within selected town and columns are TAZ, town name, households per square mile for 2012 and 2040, and percent change 2012 to 2040',
                                                        caption		:	'Household Densities by TAZ for ' + marymcs.demoApp.allTowns + ':<br />Households per Sq. Mi. 2012, 2040, Change 2012-2040<br />(Click on line in table to see TAZ highlighted on map) ',
                                                //        ariaLive	:	'assertive',
                                                        colDesc		: 	colDescHH
                                                        
                                });			
                             marymcs.demoApp.hhGrid.loadArrayData(marymcs.demoApp.myData3);
                             
                             
                             

                             
                             
                              var colDescEmp = [                                                   //        {header : 'index',     dataIndex : 'MyID' },
                                { header : 	'<br>TAZ', 				        dataIndex : 'TAZ' , width: '50px', style: '' }, 
                                { header : 	'<br>TOWN', 			        dataIndex : 'TOWN' , width: '100px', style: ''}, 
                                { header : 	'EMP PER SQ MI <br />2012', 	    dataIndex : 'EMP_PSQMI_2010', width: '80px', style: 'align="right"' }, 
                                { header : 	'EMP PER SQ MI <br />2040', 	    dataIndex : 'EMP_PSQMI_2040', width: '80px', style: 'align="right"' },
                                { header : 	'EMP DENSITY <br />CHANGE', 	dataIndex : 'EMP_PSQMI_CHANGE', width: '80px', style: 'align="right"' }
                                ];
                            
                             marymcs.demoApp.empGrid = new AccessibleGrid( { divId 		:	'emp_grid',
                                                        tableId 	:	'emp_table',
                                                        summary		: 	'rows are individual TAZs within selected town and columns are TAZ, town name, employment per square mile for 2012 and 2040, and percent change 2012 to 2040',
                                                        caption		:	'Employment Densities by TAZ for ' + marymcs.demoApp.allTowns + ': <br />Employment per Sq. Mi. 2012, 2040, Change 2012-2040<br />(Click on line in table to see TAZ highlighted on map) ',
                                            //            ariaLive	:	'assertive',
                                                        colDesc		: 	colDescEmp
                                                        
                                });			
                             marymcs.demoApp.empGrid.loadArrayData(marymcs.demoApp.myData2);                            
                             
                             marymcs.demoApp.displayEldData(cql_Filter);                      //  CALL Elderly data grid function
                            
                             CSSClass.remove('mytabs');                                       //  Allow display of data tables
                             CSSClass.add('mytabs2');
                             CSSClass.add('mytabs3');
                             
                             // IDENTIFY CLICKED-ON ROW IN TABLE, PASS TAZ ID TO FUNCTION THAT HIGHLIGHTS ON MAP
                             $(document).ready(function() {                           
                                         $('tr td').hover(function(){
                                            $(this).addClass('hover');
                                         }, function(){
                                            $(this).removeClass('hover');
                                        });
                                                                 
                                       $('tr').click(function(){
                                            $('tr').removeClass('wrappedElement');
                                            $myrow = $(this)                       
                                                .addClass('wrappedElement'); 
                                            $myvalue = $myrow.find('td:eq(0)')                                                                                        
                                             var selectedTAZ = $myvalue.text();                     
                                             marymcs.demoApp.highlightMapTaz(selectedTAZ);                                                                                
                                         }); 
                                });                                                           //  END OF FUNCTION TO IDENTIFY CLICKED ROW IN TABLE                                        
                             
                         }                                                                    //  END 'IF - ELSE'              
                } ,                                                                           //  END 'SUCCESS'
                failure: function() {
                    alert('WFS Query #1: failure');
                }
        });                                                                                   //  END 'OPENLAYERS.REQUEST' 
        
    //    CSSClass.remove();                                                                  //  MOVED up to end of SUCCESS so that tables don't display if extra-Plan town requested.
 
    });                                                                                       //  END jQuery 'getSETable' function

     
    marymcs.demoApp.displayEldData = function(cql_Filter){
    //  Called by displayEmpData function
    //     document.getElementById('eld_grid').innerHTML = '';
        marymcs.demoApp.myData3.length = 0; 
         
        marymcs.demoApp.items_eld = "town,town_id,age_70_plus,population,pct_elderly";
        var typename1 =  elderly;                                                             

        var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
        szQry3 += "typename=" + typename1 + "&";
        szQry3 += "CQL_filter=" + cql_Filter + "&";
        szQry3 += "propertyName=" + marymcs.demoApp.items_eld; 
           
         OpenLayers.Request.issue({
        //	method: "POST",
                url: szQry3,
                success: function(oRequest2) {
                        var aTemp3 = [];
                        var oGmlReader2 = new OpenLayers.Format.GML();
                        var aFeatures = oGmlReader2.read(oRequest2.responseText);

                        if (aFeatures.length === 0) {
                            alert('No features found--try another');
                        } else {                       
               //             alert('Got emp features: number - ' + aFeatures.length);              
                            for (k = 0; k < aFeatures.length; k++) {
                                marymcs.demoApp.myData3[k] = { 'MyID'                 : k,                                                           
                                                               'TOWN'               : aFeatures[k].attributes['town'],
                                                               'TOTAL_TOWN_POP'     : addCommas((parseFloat(aFeatures[k].attributes['population'])).toFixed(1)),
                                                               'POP_70_PLUS'        : addCommas((parseFloat(aFeatures[k].attributes['age_70_plus'])).toFixed(1)),
                                                               'PCT_70_PLUS'        : (parseFloat(aFeatures[k].attributes['pct_elderly']) * 100).toFixed(1) + '%'
                                                          };
                             };
                                                               
                            //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                            function SortByTown(x,y) {
                              return ((x.Town == y.Town) ? 0 : ((x.Town > y.Town) ? 1 : -1 ));
                            }
                          
                            marymcs.demoApp.myData3.sort(SortByTown);
               
                            var colDescEld = [                                                   //        {header : 'index',     dataIndex : 'MyID' },                            
                                { header : 	'<br>TOWN', 			            dataIndex : 'TOWN' , width: '50px', style: ''}, 
                                { header : 	'TOTAL TOWN <br />POPULATION', 	    dataIndex : 'TOTAL_TOWN_POP', width: '100px', style: 'align="right"' }, 
                                { header : 	'POPULATION <br />AGE 70+', 	    dataIndex : 'POP_70_PLUS', width: '100px', style: 'align="right"' },
                                { header : 	'PERCENT<br />AGE 70+', 	        dataIndex : 'PCT_70_PLUS', width: '100px', style: 'align="right"' }
                                ];
               
                            marymcs.demoApp.eldGrid = new AccessibleGrid( { divId 		:	'eld_grid',
                                                        tableId 	:	'eld_table',
                                                        summary		: 	'rows are individual towns and columns are town name, population greater than 70 years old and percent of population greater than 70 ',
                                                        caption		:	'Elderly Population by Town for ' + marymcs.demoApp.allTowns + ': <br />Total Residents Aged 70+ and Percent of Town Population <br />(2010 Census)',
                                          //              ariaLive	:	'assertive',
                                                        colDesc		: 	colDescEld
                                                        
                                });			
                             marymcs.demoApp.eldGrid.loadArrayData(marymcs.demoApp.myData3);                      
                            }                                                                  //     END 'IF - ELSE'
                              
                },                                                                             //     END  'SUCCESS' 
                 failure: function() {
                    alert('WFS Query #2: failure');
                }
        });                                                                                    //     END OF OPEN LAYERS REQUEST    
    }                                                                                          //     END OF DISPLAY ELDERLY DATA
});                                                                                            //     END OF (document).ready function

//  E.2.  START OF 'GET TRANSPORTATION DATA BY CORRIDOR' FUNCTION (TABLE):
//  (2 functions at present--  displayCrashes, displayCRStations)

marymcs.demoApp.identifyTRCorridor = function() {                                              //     Function unhides and hides relevant buttons when new corridor selected
   
     if(document.getElementById('getTableTR').className==='hidden2'){          
            unhideLine('getTableTR');
     }
       
      if(document.getElementById('downloadTRData').className==='unhidden2'){         
            unhideLine('downloadTRData');
     }
    
    if(document.getElementById('clearTRTable').className==='unhidden2'){                
					unhideLine('clearTRTable');
	};
};                                                                                             //  END 'identifyTRCorridor' function


marymcs.demoApp.displayTRCorridorData = function() {                                           //  START 'DisplayTRCorridorData' in TABLE function:
                                                                                               //   --initializes grids & tabs, hides & unhides relevant buttons,
   marymcs.demoApp.crashGrid = {};                                                             //   identifies which corridor's data will be displayed, and creates
    marymcs.demoApp.VOC_grid = {} ;                                                            //   cql_Filter with selected corridor to use in OpenLayers query 
    marymcs.demoApp.spd_idx_grid = {};
    marymcs.demoApp.tt_grid = {};
    marymcs.demoApp.CRStnGrid = {}; 
 
    CSSClass.add('mytabs');
    CSSClass.remove('mytabs2');
    CSSClass.add('mytabs3');
    marymcs.demoApp.myData.length = 0;
    marymcs.demoApp.myData2.length = 0;
    
     if(document.getElementById('downloadTRData').className==='hidden2'){         
            unhideLine('downloadTRData');
     }
   
    if(document.getElementById('clearTRTable').className==='hidden2'){                
					unhideLine('clearTRTable');
				}

     marymcs.demoApp.clearAllGrids();
     
    var my_subregion = '';
    my_subregion = document.getElementById('table_subregion').value;
    for (var i=0; i< table_subregion.options.length; i++){
        if (table_subregion.options[i].selected==true){
            var tabsub_txt = table_subregion.options[i].innerHTML;    
            break;
        }
    }        
    marymcs.demoApp.chosen_subregion = my_subregion;

    console.log('my_subregion = ', my_subregion);
    
    var cql_Filter = marymcs.demoApp.chosen_subregion; 
    if(marymcs.demoApp.chosen_subregion==='Core'){
        cql_Filter = "(circumferential_corridor in ('BOS','CEN'))";
    }else{
        cql_Filter = "(plan2035_radial_corr='" + marymcs.demoApp.chosen_subregion + "')";
    };

    console.log('cql_filter, tabsub_txt = ', cql_Filter, ',', tabsub_txt);
    
    marymcs.demoApp.displayCrashes(cql_Filter, tabsub_txt);                                    //      CALL Crash data grid function 
                                                                                              
}                                                                                              //      END FUNCTION 'displayTRCorridorData' (in TABLE) 
                                                     

                                                                                                               
                                                                                                                
marymcs.demoApp.displayCrashes = function(cql_Filter, tabsub_txt) { 

          CSSClass.add('mytabs');
          CSSClass.add('mytabs3');
          CSSClass.remove('mytabs2');
          
          marymcs.demoApp.clearAllGrids();      
                    
          marymcs.demoApp.items_TR = "crashcount,epdo,l1street,l2street,towns,plan2035_radial_corr,circumferential_corridor";
          var typename1 = crash_layer_poly ; 
          marymcs.demoApp.myData2.length = 0;
          
         document.getElementById('crash_grid').innerHTML = '';
         

         var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
            szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
            szQry3 += "typename=" + typename1 + "&"; 
            szQry3 += "CQL_filter=" + cql_Filter + "&";
            szQry3 += "propertyName=" + marymcs.demoApp.items_TR; 
        
 

         OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp2 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                     
      
                        for (k = 0; k < aFeatures.length; k++) {
                            marymcs.demoApp.myData2[k] = { 'MyID'                 : k, 
                                                           'EPDO'               : parseInt(aFeatures[k].attributes['epdo']),
                                                           'TOWN'               : aFeatures[k].attributes['towns'],
                                                           'STREET1'            : aFeatures[k].attributes['l1street'],
                                                           'STREET2'            : aFeatures[k].attributes['l2street'],
                                                           'TOTAL_CRASHES'      : parseInt(aFeatures[k].attributes['crashcount'])
                                                      };
                         };
                                                           
                        //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                        function SortByEPDO(x,y) {
                          return ((x.EPDO == y.EPDO) ? 0 : ((x.EPDO < y.EPDO) ? 1 : -1 ));
                        }
                      
                        marymcs.demoApp.myData2.sort(SortByEPDO);                        
                    
           
                        var colDescCrash = [                     //        {header : 'index',     dataIndex : 'MyID' },                            
                            { header : 	'EPDO <br>VALUE',           dataIndex : 'EPDO' , width: '50px', style: ''}, 
                            { header : 	'<br>TOWN', 	            dataIndex : 'TOWN', width: '50px', style: '' }, 
                            { header : 	'<br>STREET1', 	            dataIndex : 'STREET1', width: '180px', style: '' },
                            { header : 	'<br>STREET2', 	            dataIndex : 'STREET2', width: '180px', style: '' },
                            { header : 	'TOTAL CRASHES', 	        dataIndex : 'TOTAL_CRASHES', width: '50px', style: 'align="right"' }
                            ];
                       
           
                        marymcs.demoApp.crashGrid = new AccessibleGrid( { divId 		:	'crash_grid',
                                                    tableId 	:	'crash_table',
                                                    summary		: 	'rows are individual crash locations and columns are E P D O value, town, intersecting streets 1 and 2 and total number of crashes',
                                                    caption		:	'Top 5 Percent Crashes for: ' + tabsub_txt + ' Region, <br /> Ranked by EPDO Value ' ,
                                      //              ariaLive	:	'assertive',
                                                    colDesc		: 	colDescCrash
                                                    
                            });			
                         marymcs.demoApp.crashGrid.loadArrayData(marymcs.demoApp.myData2); 
                         
                         marymcs.demoApp.displayVOCIndex(cql_Filter, tabsub_txt);              //      CALL Speed Index grid function 
                                 
                }                                                                              //      END 'IF - ELSE'                
                          
            },                                                                                 //      END  'SUCCESS' 
             failure: function() {
				alert('WFS Query #2: failure');
			}
    });                                                                                        //      END OPENLAYERS REQUEST                                   
                               
}                                                                                              //      END FUNCTION 'DISPLAY CRASH DATA'


marymcs.demoApp.displayVOCIndex = function(cql_Filter, tabsub_txt) {                           //      START OF VOC INDEX grid function

          marymcs.demoApp.items_TR = "data_key,plan2035_radial_corr,roadway_type,peak_period,roadway,voc";
          var typename1 = VOC_table;                                     
          marymcs.demoApp.myData2.length = 0;
          
         document.getElementById('VOC_grid').innerHTML = '';

         var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
            szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
            szQry3 += "typename=" + typename1 + "&"; 
            szQry3 += "CQL_filter=" + cql_Filter + "&";
            szQry3 += "propertyName=" + marymcs.demoApp.items_TR; 
               
         OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp2 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                 
                                for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData2[k] = { 'INDEX'                 : parseInt(aFeatures[k].attributes['data_key']), 
                                                                   'YEAR'                  : aFeatures[k].attributes['year'],
                                                                   'CORRIDOR'              : aFeatures[k].attributes['plan2035_radial_corr'], 
                                                                   'ROAD_TYPE'             : aFeatures[k].attributes['roadway_type'],       
                                                                   'PEAK_PERIOD'           : aFeatures[k].attributes['peak_period'], 
                                                                   'ROADWAY'               : aFeatures[k].attributes['roadway'], 
                                                                   'VOC'                   : aFeatures[k].attributes['voc']
                                                              };                                        
                                 };
                                
                                                                   
                                //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                                function SortByIndex(x,y) {
                                  return ((x.INDEX == y.INDEX) ? 0 : ((x.INDEX > y.INDEX) ? 1 : -1 ));
                                }
                              
                                marymcs.demoApp.myData2.sort(SortByIndex);
                   
                                var colDescVOC = [                  //        {header : 'index',     dataIndex : 'MyID' },                                   
                                    { header : 	'ROADWAY', 	              dataIndex : 'ROADWAY', width: '200px', style: '' },
                                    { header : 	'ROAD TYPE', 	          dataIndex : 'ROAD_TYPE', width: '100px', style: '' },
                                    { header : 	'PEAK PERIOD', 			  dataIndex : 'PEAK_PERIOD' , width: '70px', style: ''},                                    
                                    { header : 	'V/C RATIO', 	          dataIndex : 'VOC', width: '220px', style: '' }
                                  
                                    ];
                   
                                marymcs.demoApp.VOC_grid = new AccessibleGrid( { divId 		:	'VOC_grid',
                                                            tableId 	:	'VOC_table',
                                                            summary		: 	'rows are commuter rail stations within selected region and columns are station name and commuter rail line',
                                                            caption		:	'Highest Current Volume-Capacity Ratios for: ' + tabsub_txt + ' Region',
                                            //                ariaLive	:	'assertive',
                                                            colDesc		: 	colDescVOC
                                                            
                                    });			
                                 marymcs.demoApp.VOC_grid.loadArrayData(marymcs.demoApp.myData2);

                            //     marymcs.demoApp.displayTTIndex(cql_Filter, tabsub_txt);      
                                 marymcs.demoApp.displaySpeedIndex(cql_Filter, tabsub_txt);    //      CALL SPEED INDEX FUNCTION
                            }                                                                  //      END 'IF - ELSE'               
                          
            },                                                                                 //      END  'SUCCESS' 
             failure: function() {
				alert('WFS Query #2: failure');
			}
    });                                                                                        //      END OPENLAYERS REQUEST                                   
                               
}                                                                                              //      END FUNCTION 'DISPLAY VOC INDEX' GRID FUNCTION'



marymcs.demoApp.displaySpeedIndex = function(cql_Filter, tabsub_txt) {                         //      START OF SPEED INDEX grid function

          marymcs.demoApp.items_TR = "year,plan2035_radial_corr,circumferential_corridor,peakperiod,route,direction,from_to,speedindex";
          var typename1 = spd_idx_table;                                     
          marymcs.demoApp.myData2.length = 0;
          
         document.getElementById('spd_idx_grid').innerHTML = '';

         var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
            szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
            szQry3 += "typename=" + typename1 + "&"; 
            szQry3 += "CQL_filter=" + cql_Filter + "&";
            szQry3 += "propertyName=" + marymcs.demoApp.items_TR; 
               
         OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp2 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                 
                                for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData2[k] = { 'YEAR'                 : aFeatures[k].attributes['year'], 
                                                                   'PEAKPERIOD'           : aFeatures[k].attributes['peakperiod'],
                                                                   'ROUTE'                : aFeatures[k].attributes['route'], 
                                                                   'DIRECTION'            : aFeatures[k].attributes['direction'],       
                                                                   'FROM_TO'              : aFeatures[k].attributes['from_to'], 
                                                                   'SPEEDINDEX'           : aFeatures[k].attributes['speedindex'], 
                                                                   'RADIAL_CORRIDOR'      : aFeatures[k].attributes['plan2035_radial_corr']
                                                              };                                        
                                 };
                                
                                                                   
                                //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                                function SortByPeriod(x,y) {
                                  return ((x.PEAKPERIOD == y.PEAKPERIOD) ? 0 : ((x.PEAKPERIOD > y.PEAKPERIOD) ? 1 : -1 ));
                                }
                              
                                marymcs.demoApp.myData2.sort(SortByPeriod);
                   
                                var colDescSpdIdx = [                  //        {header : 'index',     dataIndex : 'MyID' },                                                            
                                    { header : 	'ROUTE', 	              dataIndex : 'ROUTE', width: '120px', style: '' },
                                    { header : 	'FROM/TO', 	              dataIndex : 'FROM_TO', width: '500px', style: '' },
                                    { header : 	'PEAK PERIOD', 			  dataIndex : 'PEAKPERIOD' , width: '90px', style: ''},                                    
                                    { header : 	'DIRECTION', 	          dataIndex : 'DIRECTION', width: '120px', style: '' },
                                    { header : 	'SPEED INDEX', 	          dataIndex : 'SPEEDINDEX', width: '180px', style: '' }
                                    ];
                   
                                marymcs.demoApp.spd_idx_grid = new AccessibleGrid( { divId 		:	'spd_idx_grid',
                                                            tableId 	:	'spd_idx_table',
                                                            summary		: 	'rows are commuter rail stations within selected region and columns are station name and commuter rail line',
                                                            caption		:	'Highest Speed Index Values for: ' + tabsub_txt + ' Region' ,
                                            //                ariaLive	:	'assertive',
                                                            colDesc		: 	colDescSpdIdx
                                                            
                                    });			
                                 marymcs.demoApp.spd_idx_grid.loadArrayData(marymcs.demoApp.myData2);

                                 marymcs.demoApp.displayTTIndex(cql_Filter, tabsub_txt);       //      CALL DISPLAY TRAVEL TIME INDEX FUNCTION
                            }                                                                  //      END 'IF - ELSE'               
                          
            },                                                                                 //      END  'SUCCESS' 
             failure: function() {
				alert('WFS Query #2: failure');
			}
    });                                                                                        //      END OPENLAYERS REQUEST                                   
                               
}                                                                                              //      END FUNCTION 'DISPLAY SPEED INDEX DATA'


marymcs.demoApp.displayTTIndex = function(cql_Filter, tabsub_txt) {                            //      START DISPLAY TRAVEL TIME INDEX FUNCTION

          marymcs.demoApp.items_TR = "year,plan2035_radial_corr,circumferential_corridor,peakperiod,route,direction,from_to,traveltimeindex";
          var typename1 = tt_table;                                     
          marymcs.demoApp.myData2.length = 0;
          
         document.getElementById('tt_grid').innerHTML = '';

         var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
            szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
            szQry3 += "typename=" + typename1 + "&"; 
            szQry3 += "CQL_filter=" + cql_Filter + "&";
            szQry3 += "propertyName=" + marymcs.demoApp.items_TR; 
               
         OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp2 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                 
                                for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData2[k] = { 'YEAR'                 : aFeatures[k].attributes['year'], 
                                                                   'PEAKPERIOD'           : aFeatures[k].attributes['peakperiod'],
                                                                   'ROUTE'                : aFeatures[k].attributes['route'], 
                                                                   'DIRECTION'            : aFeatures[k].attributes['direction'],       
                                                                   'FROM_TO'              : aFeatures[k].attributes['from_to'], 
                                                                   'TRAVELTIMEINDEX'      : aFeatures[k].attributes['traveltimeindex'], 
                                                                   'RADIAL_CORRIDOR'      : aFeatures[k].attributes['plan2035_radial_corr']
                                                              };                                        
                                 };
                                
                                                                   
                                //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                                function SortByPeriod(x,y) {
                                  return ((x.PEAKPERIOD == y.PEAKPERIOD) ? 0 : ((x.PEAKPERIOD > y.PEAKPERIOD) ? 1 : -1 ));
                                }
                              
                                marymcs.demoApp.myData2.sort(SortByPeriod);
                   
                                var colDescTTIdx = [                  //        {header : 'index',     dataIndex : 'MyID' },                                                            
                                    { header : 	'ROUTE', 	              dataIndex : 'ROUTE', width: '120px', style: '' },
                                    { header : 	'FROM/TO', 	              dataIndex : 'FROM_TO', width: '500px', style: '' },
                                    { header : 	'PEAK PERIOD', 			  dataIndex : 'PEAKPERIOD' , width: '90px', style: ''},                                    
                                    { header : 	'DIRECTION', 	          dataIndex : 'DIRECTION', width: '120px', style: '' },
                                    { header : 	'TRAVEL TIME INDEX', 	  dataIndex : 'TRAVELTIMEINDEX', width: '180px', style: '' }
                                    ];
                   
                                marymcs.demoApp.tt_grid = new AccessibleGrid( { divId 		:	'tt_grid',
                                                            tableId 	:	'tt_table',
                                                            summary		: 	'rows are commuter rail stations within selected region and columns are station name and commuter rail line',
                                                            caption		:	'Highest Travel Time Index Values for: ' + tabsub_txt + ' Region',
                                            //                ariaLive	:	'assertive',
                                                            colDesc		: 	colDescTTIdx
                                                            
                                    });			
                                 marymcs.demoApp.tt_grid.loadArrayData(marymcs.demoApp.myData2);

                                 marymcs.demoApp.displayCRStations(cql_Filter, tabsub_txt);
                            }                                                                  //      END 'IF - ELSE'               
                          
            },                                                                                 //      END  'SUCCESS' 
             failure: function() {
				alert('WFS Query #2: failure');
			}
    });                                                                                        //      END OPENLAYERS REQUEST                                   
                               
}                                                                                              //      END FUNCTION 'DISPLAY TTIME INDEX DATA'




marymcs.demoApp.displayCRStations = function(cql_Filter, tabsub_txt) { 

          marymcs.demoApp.items_TR = "station,line_brnch,plan2035_radial_corr";
          var typename1 = CR_stns;                                     
          marymcs.demoApp.myData2.length = 0;
          
         document.getElementById('CRStn_grid').innerHTML = '';

         var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
            szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
            szQry3 += "typename=" + typename1 + "&"; 
            szQry3 += "CQL_filter=" + cql_Filter + "&";
            szQry3 += "propertyName=" + marymcs.demoApp.items_TR; 
        
         OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp2 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                       
      //                  alert('Got emp features: number: ' + aFeatures.length);   
      
                                for (k = 0; k < aFeatures.length; k++) {
                                    marymcs.demoApp.myData2[k] = { 'MyID'                 : k, 
                                                                   'STATION'              : aFeatures[k].attributes['station'],
                                                                   'LINE_BRNCH'           : aFeatures[k].attributes['line_brnch'],                                                                   
                                                                   'RADIAL_CORRIDOR'      : aFeatures[k].attributes['radial_corridor']
                                                              };
                                 };
                                                                   
                                //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                                function SortByStn(x,y) {
                                  return ((x.STATION == y.STATION) ? 0 : ((x.STATION > y.STATION) ? 1 : -1 ));
                                }
                              
                                marymcs.demoApp.myData2.sort(SortByStn);
                   
                                var colDescCRStn = [                  //        {header : 'index',     dataIndex : 'MyID' },                            
                                    { header : 	'STATION', 			  dataIndex : 'STATION' , width: '200px', style: ''},                                    
                                    { header : 	'LINE', 	          dataIndex : 'LINE_BRNCH', width: '270px', style: '' }                                   
                                    ];
                   
                                marymcs.demoApp.CRStnGrid = new AccessibleGrid( { divId 		:	'CRStn_grid',
                                                            tableId 	:	'CRStn_table',
                                                            summary		: 	'rows are commuter rail stations within selected region and columns are station name and commuter rail line',
                                                            caption		:	'Commuter Rail stations in : ' + tabsub_txt + ' Region',
                                            //                ariaLive	:	'assertive',
                                                            colDesc		: 	colDescCRStn
                                                            
                                    });			
                                 marymcs.demoApp.CRStnGrid.loadArrayData(marymcs.demoApp.myData2); 
                            }                                                                  //      END 'IF - ELSE'               
                          
            },                                                                                 //      END  'SUCCESS' 
             failure: function() {
				alert('WFS Query #2: failure');
			}
    });                                                                                        //      END OPENLAYERS REQUEST                                   
                               
}                                                                                              //      END FUNCTION 'DISPLAY CRASHES'



//  E.3.  START OF 'GET TRANSPORTATION DATA REGIONWIDE' FUNCTION (TABLE)
//  (4 functions [for now] -- displayTRRegionwideData(airports), displayBoatDocks, displayPRlots, displayBikePaths.  More to be added.)

 $(document).ready(function() {       

 $("#fetchRegionwideTable").click(function(){ 

     marymcs.demoApp.airportGrid = {};
     marymcs.demoApp.PRlotsGrid = {};
     marymcs.demoApp.docksGrid = {};
     marymcs.demoApp.bikesGrid = {};

     CSSClass.add('mytabs');
     CSSClass.add('mytabs2');
     CSSClass.remove('mytabs3');
         
     $('#downloadTRRegionwideData,#clearTRRegionTable').show();
                    
      marymcs.demoApp.clearAllGrids();
          
   // 1.  airports
        var k;
        marymcs.demoApp.items_regionwide = "town,airport_name";
        var typename1 = airports                                               

        marymcs.demoApp.myData3.length = 0;          
        document.getElementById('airport_grid').innerHTML = '';
                                                                             
        var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
        szQry3 += "typename=" + typename1 + "&"; 
        szQry3 += "propertyName=" + marymcs.demoApp.items_regionwide; 
        
          OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp1 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                                          
                         for (k = 0; k < aFeatures.length; k++) {
                            marymcs.demoApp.myData3[k] = { 'MyID'               : k,                                                           
                                                           'TOWN'               : aFeatures[k].attributes['town'],                                                           
                                                           'AIRPORT_NAME'       : aFeatures[k].attributes['airport_name']
                                                      };
                         };
                                                           
                        //  Sort JSON Array by Town (source -- http://www.devcurry.com/2010/05/sorting-json-array.html)
                        function SortByTown(x,y) {
                          return ((x.TOWN == y.TOWN) ? 0 : ((x.TOWN > y.TOWN) ? 1 : -1 ));
                        }
                      
                        marymcs.demoApp.myData3.sort(SortByTown);
                        var colDescAirport = [                       //        {header : 'index',     dataIndex : 'MyID' },                                                        
                                    { header : 	'TOWN', 	                     dataIndex : 'TOWN', width: '120px', style: '' }, 
                                    { header : 	'AIRPORT NAME', 	             dataIndex : 'AIRPORT_NAME', width: '300px', style: '' }
                         ];
                   
                        marymcs.demoApp.airportGrid = new AccessibleGrid( { divId 		:	'airport_grid',
                                                    tableId 	:	'airport_table',
                                                    summary		: 	'rows are individual airports with name of town where located',
                                                    caption		:	'Airports in the Boston Region', 
                                      //              ariaLive	:	'assertive',
                                                    colDesc		: 	colDescAirport
                                                    
                            });			
                         marymcs.demoApp.airportGrid.loadArrayData(marymcs.demoApp.myData3);  

                         CSSClass.add('mytabs');                                                //      Allow display of data tables
                         CSSClass.add('mytabs2');
                         CSSClass.remove('mytabs3');

                         marymcs.demoApp.displayPRlots();                                       //      CALL 'get park-ride lots table' function
                        
                    };                                                                          //      END OF 'IF - ELSE'
                }                                                                               //      END OF 'SUCCESS'
             
          });                                                                                   //      END OF OPEN LAYERS REQUEST FOR AIRPORTS
  });                                                                                           //      END OF JQUERY 'CLICK' FUNCTION TO FETCH REGIONWIDE TABLE--airports
  
});                                                                                             //      END OF (document).ready function
  
   
   // 2.  park-ride lots   
 marymcs.demoApp.displayPRlots = function(){

        var k;
        marymcs.demoApp.items_regionwide = "town,location,capacity,bus_service";
        var typename1 = park_ride_lots                                       

        marymcs.demoApp.myData2.length = 0;          
        document.getElementById('PRlots_grid').innerHTML = '';
                                                                             
        var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
        szQry3 += "typename=" + typename1 + "&"; 
        szQry3 += "propertyName=" + marymcs.demoApp.items_regionwide; 
              
          OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp1 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                  
                                        
                        for (k = 0; k < aFeatures.length; k++) {
                            marymcs.demoApp.myData2[k] = { 'MyID'                 : k,                                                           
                                                           'TOWN'                : aFeatures[k].attributes['town'],                                                           
                                                           'LOCATION'            : aFeatures[k].attributes['location'],
                                                           'CAPACITY'            : aFeatures[k].attributes['capacity'],                                                           
                                                           'BUS_SERVICE'         : aFeatures[k].attributes['bus_service']                                                           
                                                      };
                         };
                         
                        function SortByTown(x,y) {
                          return ((x.TOWN == y.TOWN) ? 0 : ((x.TOWN > y.TOWN) ? 1 : -1 ));
                        }
                      
                        marymcs.demoApp.myData2.sort(SortByTown);
                         
                        var colDescPRlots = [                                                   //        {header : 'index',     dataIndex : 'MyID' },                                                         
                                    { header : 	'TOWN', 	                dataIndex : 'TOWN', width: '120px', style: '' }, 
                                    { header : 	'LOCATION', 	            dataIndex : 'LOCATION', width: '300px', style: '' },
                                    { header : 	'CAPACITY', 	            dataIndex : 'CAPACITY', width: '120px', style: '' }, 
                                    { header : 	'BUS SERVICE', 	            dataIndex : 'BUS_SERVICE', width: '300px', style: '' }
                         ];
                                            
                        marymcs.demoApp.PRlotsGrid = new AccessibleGrid( { divId 		:	'PRlots_grid',
                                                    tableId 	:	'PRlots_table',
                                                    summary		: 	'rows are individual park ride lots, columns are town, street location, parking capacity and available bus services',
                                                    caption		:	'MassDOT park-ride lots in the Boston Region', 
                                       //             ariaLive	:	'assertive',
                                                    colDesc		: 	colDescPRlots                                                    
                            });			
                         marymcs.demoApp.PRlotsGrid.loadArrayData(marymcs.demoApp.myData2); 
                         
                        marymcs.demoApp.displayBoatDocks();                                     //  CALL 'get boat docks table' function

                    }                                                                           //  END 'IF - ELSE'                    
             },                                                                                 //  END SUCCESS
              failure: function() {
				alert('WFS Query #1: failure');
			}          
    });                                                                                         //  END OPEN LAYERS REQUEST   
}                                                                                               //  END FUNCTION 'display PR lots'

   // 3. boat docks
marymcs.demoApp.displayBoatDocks = function(){

        var k;
        marymcs.demoApp.items_regionwide = "term_name,passenger,town,service,mpo";
        var typename1 = seaports                                                    

        marymcs.demoApp.myData2.length = 0;          
        document.getElementById('boatdocks_grid').innerHTML = '';
                                                                             
        var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
        szQry3 += "typename=" + typename1 + "&"; 
        szQry3 += "propertyName=" + marymcs.demoApp.items_regionwide; 
              
          OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp1 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                                           
                        var new_index = 0; 
                        for (k = 0; k < aFeatures.length; k++) {                          
                            if(aFeatures[k].attributes['mpo']==='Boston Region'&&aFeatures[k].attributes['passenger']==='Yes'){                             
                                    marymcs.demoApp.myData2[new_index] = { 'MyID'                 : new_index,
                                                                   'TERM_NAME'            : aFeatures[k].attributes['term_name'],
                                                                   'TOWN'                 : aFeatures[k].attributes['town'],                                                                                                                                                                            
                                                                   'SERVICE'              : aFeatures[k].attributes['service']                                                           
                                                              };
                                    new_index++;
                             }
                         };
                                                
                        function SortByTown(x,y) {
                          return ((x.TOWN == y.TOWN) ? 0 : ((x.TOWN > y.TOWN) ? 1 : -1 ));
                        }
                      
                        marymcs.demoApp.myData2.sort(SortByTown);
                                                
                        var colDescDocks = [                        //        {header : 'index',     dataIndex : 'MyID' },                          
                                    { header : 	'TERMINAL', 	          dataIndex : 'TERM_NAME', width: '300px', style: '' },
                                    { header : 	'TOWN', 	              dataIndex : 'TOWN', width: '120px', style: '' },                                    
                                    { header : 	'SERVICE', 	              dataIndex : 'SERVICE', width: '120px', style: '' }
                         ];
                                                                                  
                        marymcs.demoApp.docksGrid = new AccessibleGrid( { divId 		:	'boatdocks_grid',
                                                    tableId 	:	'boatdocks_table',
                                                    summary		: 	'rows are individual docks, columns are dock name, town where located, and whether service is seasonal or year round',
                                                    caption		:	'Passenger boat/ferry docks in the Boston Region', 
                                      //              ariaLive	:	'assertive',
                                                    colDesc		: 	colDescDocks                                                    
                            });			
                         marymcs.demoApp.docksGrid.loadArrayData(marymcs.demoApp.myData2); 
                         
                         marymcs.demoApp.displayBikePaths();                                    //  CALL 'bike path table' function

                    }                                                                           //  END 'IF - ELSE'                    
             },                                                                                 //  END SUCCESS
              failure: function() {
				alert('WFS Query #1: failure');
			}
          
    });                                                                                         //  END OPEN LAYERS REQUEST
   
}                                                                                               //  END FUNCTION 'display boat docks'
   
   
   // 4. dedicated bike paths 
 marymcs.demoApp.displayBikePaths = function(){

        var k;
        marymcs.demoApp.items_regionwide = "localname,length_miles";
        var typename1 = bikes_table                                    

        marymcs.demoApp.myData2.length = 0;          
        document.getElementById('bikes_grid').innerHTML = '';
                                                                             
        var szQry3 = marymcs.demoApp.szWFSserverRoot + '?';                   
        szQry3 += "request=getfeature&version=1.0.0&service=wfs&";
        szQry3 += "typename=" + typename1 + "&"; 
        szQry3 += "propertyName=" + marymcs.demoApp.items_regionwide; 
              
          OpenLayers.Request.issue({
	//	method: "POST",
			url: szQry3,
			success: function(oRequest2) {
					var aTemp1 = [];
					var oGmlReader2 = new OpenLayers.Format.GML();
					var aFeatures = oGmlReader2.read(oRequest2.responseText);

					if (aFeatures.length === 0) {
						alert('No features found--try another');
					} else {                       
                                                            
                        for (k = 0; k < aFeatures.length; k++) {
                            marymcs.demoApp.myData2[k] = { 'MyID'                 : k,                                                           
                                                           'LOCALNAME'           : aFeatures[k].attributes['localname'],                                                           
                                                           'LENGTH'              : parseFloat(aFeatures[k].attributes['length_miles']).toFixed(2)                                                                                                            
                                                      };
                         };
                         
                        function SortByName(x,y) {
                          return ((x.LOCALNAME == y.LOCALNAME) ? 0 : ((x.LOCALNAME > y.LOCALNAME) ? 1 : -1 ));
                        }
                      
                        marymcs.demoApp.myData2.sort(SortByName);
                         
                        var colDescBikes = [                                 //        {header : 'index',     dataIndex : 'MyID' },                                                         
                                    { header : 	'LOCAL NAME', 	                 dataIndex : 'LOCALNAME', width: '340px', style: '' },                                    
                                    { header : 	'APPROX. LENGTH, MILES', 	     dataIndex : 'LENGTH', width: '120px', style: '' }
                         ];
                                            
                        marymcs.demoApp.bikesGrid = new AccessibleGrid( { divId 		:	'bikes_grid',
                                                    tableId 	:	'bikes_table',
                                                    summary		: 	'rows are individual park ride lots, columns are town, street location, parking capacity and available bus services',
                                                    caption		:	'Dedicated bike paths in the Boston Region', 
                                     //               ariaLive	:	'assertive',
                                                    colDesc		: 	colDescBikes                                                    
                            });			
                         marymcs.demoApp.bikesGrid.loadArrayData(marymcs.demoApp.myData2);                        
                       
                    }                                                                           //  END 'IF - ELSE'                    
             },                                                                                 //  END SUCCESS
              failure: function() {
				alert('WFS Query #1: failure');
			}
          
    });                                                                                         //  END OPEN LAYERS REQUEST
   
}                                                                                               //  END FUNCTION 'display Bikes'
   

/////////////////////////////////////////////////        END OF 'GET DATA FOR DATA TABLES' FUNCTIONS       ////////////////////////////////////////




                                                                                                          
///////////////////////////////////////////////     F. HANDLERS FOR LINKING MAP CLICKS TO TABLE ROW AND VICE-VERSA   //////////////////////////////
////////////////////////////////////        ("onClickHandler" triggered by click on map, 'highlightMapTAZ' triggered by 
///////////////////////////////////          call from within another 'click' subfunction within 'getSEData')

 marymcs.demoApp.onClickHandler = function(e) {
	var szQueryString = marymcs.demoApp.szWFSserverRoot + '?';
	szQueryString += '&service=wfs';
	szQueryString += '&version=1.0.0';
	szQueryString += '&request=getfeature';
	szQueryString += '&typename=' + taz2727;             //      NOTE: taz2727_2010 not used yet because no future case there yet
    
     if(marymcs.demoApp.oTAZ.visibility===false){
            alert('No population or employment layer visible at present--\nEnable one of these layers in order to highlight clicked TAZ');
            return;
     }

	var oLonLat = marymcs.demoApp.map.getLonLatFromPixel(e.xy);
	// var szFilter = '&cql_filter=(INTERSECTS(wkb_geometry,POINT(' + oLonLat.lon + ' ' + oLonLat.lat + ')))';
	var szFilter = '&cql_filter=(INTERSECTS(wkb_geometry,POINT(' + oLonLat.lon + ' ' + oLonLat.lat + ')))';
	szQueryString += szFilter;
	
	OpenLayers.Request.issue({
			method: "GET",
			url: szQueryString,
			success: function(oRequest) {
				var oGmlReader = new OpenLayers.Format.GML();
				var aFeatures = oGmlReader.read(oRequest.responseText);            
				if (aFeatures.length > 1) {
					// This should never happen, since we are using an INTERSECTS query rather than a BBOX query.
					alert('Error: marymcs.demoApp.onClickHandler: More than one feature returned.');
				} else if (aFeatures.length === 1) {    //               
                        var search_value = parseInt(aFeatures[0].attributes['taz']);              
                        marymcs.demoApp.oHighlightLayerTAZ.destroyFeatures();
                        marymcs.demoApp.oHighlightLayerTAZ.addFeatures(aFeatures[0]);
	 
                    // If no table deployed, don't go any farther with TAZ search
                        if(CSSClass.is('mytabs', 'hidden')===true){;
                            alert("No data table has been invoked--relevant \nrow can't be highlighted in data table.");
                            return;
                        };
          
                     // Search data store associated with table to do a match with search_value from point-and-click
                        var found = 0;
                        var rec = [];
                        var my_store = marymcs.demoApp.myData2;               
                   
                        for(i = 0;i<marymcs.demoApp.myData2.length;i++){             
                            if (marymcs.demoApp.myData2[i].TAZ===search_value){
                               found = 1;                               
                                marymcs.demoApp.do_color(search_value);
                            } 
                        };
   
                       // If there is a table displayed but the clicked TAZ is not included in the table town(s), don't highlight any line in table
                        if(found===0&&CSSClass.is('mytabs', 'hidden')===false){
                            alert('Selected TAZ does not appear in displayed table');
                            $('tr td')
                                    .parent()
                                    .removeClass('wrappedElement');
                        }
    
				} else {				
					// User clicked outside of a MAPC area town: nothing to do.
                    alert('Only TAZs from Plan area can be highlighted');
					var _DEBUG_HOOK_0 = 0; 
				}
			},
			failure: function() {
				alert('WFS request in marymcs.demoApp.onClickHandler failed.');
			}
	});	
    
}; // marymcs.demoApp.onClickHandler()


marymcs.demoApp.highlightMapTaz = function(selectedTAZ){  
     marymcs.demoApp.oHighlightLayerTAZ.destroyFeatures();
     
     var typename1 =  taz2727;                                                    //      NOTE: taz2727_2010 not used yet because no future case there yet                                                         
     var cql_Filter = '(taz==' + selectedTAZ + ')';     
    
    
    var szQry = marymcs.demoApp.szWFSserverRoot + '?';                   
	szQry += "request=getfeature&version=1.0.0&service=wfs&";
	szQry += "typename=" + typename1 + "&";
	szQry += "CQL_filter=" + cql_Filter;
    
    
    OpenLayers.Request.issue({
			method: "GET",
			url: szQry,
			success: function(oRequest) {
				var oGmlReader = new OpenLayers.Format.GML();
				var aFeatures = oGmlReader.read(oRequest.responseText);            
				if (aFeatures.length > 1) {
					// This should never happen, since we are using an INTERSECTS query rather than a BBOX query.
					alert('Error: marymcs.demoApp.onClickHandler: More than one feature returned.');
				} else if (aFeatures.length === 1) {                                              
                        marymcs.demoApp.oHighlightLayerTAZ.addFeatures(aFeatures[0]);    
                }
            },
             failure: function() {
				alert('WFS Query highlight TAZ on map: failure');
			}
    });     
};
 
/////////////////////////////////////////////      END OF HANDLERS FOR LINKING MAP CLICKS TO TAZ TABLES    /////////////////////////////////////////



/////////////////////////////////////////////////  G.  OTHER FUNCTIONS TRIGGERED BY TABLE CONTROL BUTTONS:   ////////////////////////////////////////
///////////////////////////////////////////////         'SEARCH FOR TOWN', 'CLEAR DATA', 'DOWNLOAD DATA'
//////////////////////////////////        ('GET DATA' BUTTON FUNCTIONS ARE ABOVE: different for each table in Section E)          /////////////////////////////////////////
 $(document).ready(function() { 
 
//1.  SearchForTown responds to 'FIND TOWN' button on page,identify town(s), adds to highlight layer.

    $('#searchForTown').click(function(){

            //turnOffAllEntityLayers();
            marymcs.demoApp.oHighlightLayerTowns.setVisibility(true);
                
            var radio = document.getElementsByName('myChoice');
            for(var i = 0; i < radio.length; i++){
                if(radio[i].checked === true){
                    radio[i].checked = false;
                }
            }
                
            // get value out of text box
            var szSearchForMe = document.getElementById('townName').value;
            var szChangeCaseUpper = szSearchForMe.toUpperCase();
            var cqlFilter = "(town=='" + szChangeCaseUpper + "')";
                
            OpenLayers.Request.issue({
                    'method': 'GET',
                    'url': marymcs.demoApp.szWFSserverRoot,                          
                    'params': {
                        service: 'WFS',
                        version: '1.0.0',
                        typename: towns_layer,                                      
                        request: 'getfeature',
                        cql_filter: cqlFilter
                    },
                    'headers': {'content-type' : 'application/xml'},
                    'success': function(oRequest) {
                        var g = new OpenLayers.Format.GML();
                        var aFeatures = g.read(oRequest.responseText);	
                        if (aFeatures.length === 0) {
                            alert("?? No town found-- \n add a town name to box, or check \nspelling of town name you entered.");
                            return;
                        }
                        
                        var oCentroid = aFeatures[0].geometry.getCentroid();
                        var oLonLat = new OpenLayers.LonLat(oCentroid.x,oCentroid.y);			
                        
            //  marymcs.demoApp.oHighlightLayer.destroyFeatures();
                        marymcs.demoApp.oHighlightLayerTowns.addFeatures(aFeatures);
                        
            // 	zoom to all selected towns
                        var oZoomBounds = marymcs.demoApp.oHighlightLayerTowns.features[0].geometry.getBounds();
                        for (var i = 1; i < marymcs.demoApp.oHighlightLayerTowns.features.length; i++) {
                            oZoomBounds.extend(marymcs.demoApp.oHighlightLayerTowns.features[i].geometry.getBounds());
                        }
                        
                        $('#getSETable').show();			
                        $('#downloadSEData').hide();
                        $('#clearSETable').hide();             
                    },
                    'failure': function(oRequest) {
                        alert("failure");
                    }
            });                                                                                 //  END of OpenLayers request
  });                                                                                           //  END jQuery 'searchForTown' function
        

//2.  ClearTable responds to CLEAR DATA button, clears towns from highlight layer and clears data tables

$('#all_clear_tables, #clearSETable,#clearTRTable, #clearTRRegionTable,#table_environmental').click(function(){
	marymcs.demoApp.oHighlightLayerTowns.destroyFeatures();	
     marymcs.demoApp.oHighlightLayerTAZ.destroyFeatures();
     
	document.getElementById('townName').value = '';
    document.getElementById('table_subregion').value = '';
    
    $('#getSETable, #downloadSEData, #clearSETable').hide();                                                
    $('#downloadTRRegionwideData,#clearTRRegionTable').hide();
    
    if(document.getElementById('getTableTR').className==='unhidden2'){
					unhideLine('getTableTR');
				}
    
    if(document.getElementById('downloadTRData').className==='unhidden2'){
					unhideLine('downloadTRData');
				}
    
    if (document.getElementById('clearTRTable').className==='unhidden2'){
			unhideLine('clearTRTable');	
	}
    
      
	CSSClass.add('mytabs');
    CSSClass.add('mytabs2');
    CSSClass.add('mytabs3');

});	



                                                                                                //        END OF jQuery clearTable function


// 3.  Function responds to DOWNLOAD DATA button, identifies table currently displayed, constructs query of data layer and exports table
// as csv-type file to 'downloadAnchorTag'

    $('#downloadSEData,#downloadTRData,#clearTRTable,#downloadTRRegionwideData').click(function(){
    
	if (document.getElementById('pop_grid').innerHTML===''&& document.getElementById('crash_grid').innerHTML==='' && document.getElementById('airport_grid')===''){
		alert("No data query run yet--\ncomplete Step 3 and \nuse GET DATA to run query \nfor selected town(s).");
		downloadWindow.hide();
	}
      
    var table_choice = '';
    var cql_Filter = '';
    var szQry = '';
 
    //  Identify which GRID is showing, and set cql_Filter if needed for that GRID.....
    if(document.getElementById('pop_grid').innerHTML!==''){
            // mytabs: socioeconomic data by town
                var id = new Array();
                var cql_FilterSE = ''
                for (var j = 0; j < marymcs.demoApp.oHighlightLayerTowns.features.length; j++) {
                    id[j] = marymcs.demoApp.oHighlightLayerTowns.features[j].attributes.town_id;	            //  NOTE:  Town name replaced in query with                                                                                                     
                    cql_FilterSE += '(town_id==' + id[j] + ')';													//	Town_ID to avoid inconsistent town names
                    if (j < marymcs.demoApp.oHighlightLayerTowns.features.length - 1) {							//   like "Manchester-by-the-Sea"
                        cql_FilterSE += 'OR';
                        }
                }
                var piece_dom = $('#mytabs ul > li.current').text();                
                var oElement = document.getElementById("downloadAnchorTag1");
                cql_Filter = cql_FilterSE;
             
    } else if (document.getElementById('crash_grid').innerHTML!==''){    
             //mytabs2: transportation data by corridor   
                var my_subregion = '';
                my_subregion = document.getElementById('table_subregion').value;          
                var cql_FilterCorr;                                                                             //      = marymcs.demoApp.chosen_subregion; 
                if(my_subregion==='Core'){
                    cql_FilterCorr = "(circumferential_corridor IN ('BOS','CEN'))";
                }else{
                    cql_FilterCorr = "(plan2035_radial_corr='" + marymcs.demoApp.chosen_subregion + "')";
                };
                var piece_dom = $('#mytabs2 ul > li.current').text();               
                var oElement = document.getElementById("downloadAnchorTag2"); 
                cql_Filter = cql_FilterCorr;              
                    
       } else if (document.getElementById('airport_grid')!==''){
               //mytabs3: transportation data regionwide
                var piece_dom = $('#mytabs3 ul > li.current').text();                 
                var cql_FilterBoats = "(passenger='Yes')AND(mpo='Boston Region')";              
                var oElement = document.getElementById("downloadAnchorTag3");            
       }
      
	table_choice = piece_dom.substring(13);                                                                     //      identifies which TABLE is showing--  
    if(table_choice=='Boat Docks'){                                                                             //      the TABLE name will be used to extract data from PLAN file
        cql_Filter = cql_FilterBoats;                                                                           //      (note that 'boat docks' is the only table in mytabs3 which needs a cql_Filter)
     };
    
    for(var i=0;i<PLAN.download_choice.length;i++){
        if(table_choice==PLAN.download_choice[i][1]){        
            typename = PLAN.download_choice[i][2];
            propertyName = PLAN.download_choice[i][3];
            break;
        }
    }
      
    szQry = "request=getfeature&version=1.0.0&service=wfs&";
    szQry += "typename=" + typename + "&";    
    szQry += "outputFormat=csv&";    
    if(cql_Filter!==''){
        szQry += "CQL_filter=" + cql_Filter + "&";
    } else {
        szQry = szQry;
    };    
    szQry += "propertyName=" + propertyName; 
   
// Construct the HTML for the "download" page.     
			var downloadText = '';            
			var szTemp = 'http://www.ctps.org:8080/geoserver/wfs?';                                                    //      NOTE:  CHANGED TO MAKE DOWNLOAD WORK FROM \\lindalino:8080
    //        var szTemp = "http://" + window.location.hostname;        
			szTemp += szQry;
            
            var downloadText = szTemp;           

			$('.spanForButtonWithLink').each(function() { 
				$(this).click(function() {
					location = $(this).find('a').attr('href');
				});	
			});                                                                                                 //      end each() 
                      
            oElement.setAttribute("href", downloadText);

    });                                                                                                         //      END OF download_data function
});                                                                                                             //      END OF (document).ready function


