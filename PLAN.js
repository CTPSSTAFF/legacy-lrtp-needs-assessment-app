var PLAN = {};

//                0           1             2             3            3
// Fields are:  index, subregion code, a coordinate, b coordinate, zoom level
PLAN.subregions = [
    [1,'N',231747,913376,3],
    [2,'NE',251432,920361,3],
    [3,'NW',214523,913456,3],
    [4,'W',212776,894087,3],
    [5,'SW',218650,880038,3],
    [6,'SE',253575,880276,3],
    [7,'Core',236866,901151,4],
    [8,'Region',236590,901392,2]
]                                                   //   end of subregion definitions

//                 0      1         2             3                  4                 5            
//  Fields are: index,  item,   new_style,   szLegendHeader,   layer shorthand,   layer code
PLAN.socioeconomic = [
    [1,"2010pop", "Plan2035_pop_2010", "<span class='legend_text'>Population Density 2012: Residents per Sq Mi</span>",taz2727,"oTAZ",0],
    [2,"2040pop", "Plan2040_pop_2040","<span class='legend_text'>Population Density 2040: Residents per Sq Mi</span>",taz2727,"oTAZ",0],           
    [3,"changePop","Plan2035_pop_change","<span class='legend_text'>Change in Pop. Density 2012-2040</span>",taz2727,"oTAZ",0],
    [4,"catchment","Plan2035_pop_2010_donut","<span class='legend_text'>Areas Beyond Range of Transit Stops/Stations: <br />Pop. Density per Sq Mi</span>",taz2727_donut,"oTAZ_donut",1],
    [5,"2010emp","Plan2035_emp_2010","<span class='legend_text'>Employment Density 2012: Jobs per Sq Mi</span>",taz2727,"oTAZ",0], 
    [6,"2040emp","Plan2040_emp_2040","<span class='legend_text'>Employment Density 2040: Jobs per Sq Mi</span>",taz2727,"oTAZ",0],      
    [7,"changeEmp","Plan2035_emp_change","<span class='legend_text'>Change in Emp. Density 2012-2040</span>", taz2727,"oTAZ",0],
    [8,"eldPop","Plan2035_elderly_pop","<span class='legend_text'>Population Aged Over 70 Years, 2010</span>", elderly,"oElderly",2],
    [9,"eldPct","Plan2035_elderly_pct","<span class='legend_text'>Percent of Population Over 70 Years, 2010</span>",elderly,"oElderly",2],
    [10,"EJTitleVI","Plan2035_EJ_TitleVI_2","<span class='legend_text'>Minority and Low-Income Areas Under Title VI</span>",ej_layer,"oEJ",3],
    [11,"EJConcern","Plan2035_EJ_concern_areas_2","<span class='legend_text'>Environmental Justice Areas of Concern</span>", ej_layer,"oEJ",3],
    [12,"2010HH", "Plan2040_hh_2010", "<span class='legend_text'>Household Density 2012: Households per Sq Mi</span>",taz2727,"oTAZ",0],
    [13,"2040HH", "Plan2040_hh_2040","<span class='legend_text'>Household Density 2040: Households per Sq Mi</span>",taz2727,"oTAZ",0],           
    [14,"changeHH","Plan2040_hh_change","<span class='legend_text'>Change in Household Density 2012-2040</span>",taz2727,"oTAZ",0],
]                                                   //  end of socioeconomic data layer parameters


//                 0      1         2             3                  4                 5
//  Fields are: index,  item,   new_style,   szLegendHeader,   layer shorthand, OpenLayers layer
PLAN.transportation = [
    [1,'highway','Plan2035_RoadsMultiscaleGrouped_01','<span class="legend_text">Major Roadways</span>',major_roads,'oRoads'],  
    [2,'pavement','Plan2035_pavement_cond','<span class="legend_text">Pavement Condition</span>',pavement,'oPavement'],
    [3,'RT','Plan2035_mbta_rapid_transit','<span class="legend_text">MBTA Rapid Transit:</span>',rapid_transit,'oRT'],                                                                        
    [4,'CR','Plan2035_mbta_CR','<span class="legend_text">MBTA Commuter Rail:</span>',CR_arcs+","+CR_stns,'oCR'],                                                                      
    [5,'airports_etc','point','<span class="legend_text">Transportation Facilities:</span>',airports,'oPorts_PkRide'],                                               
    [6,'ferries','Plan2040_ferry_routes','<span class="legend_text">Commuter Boats <br />& Ferries</span>',ferries,'oFerries'],                                                          
    [7,'bikes','Plan2035_bikes','<span class="legend_text">Dedicated Bicycle Paths</span>',bikes_built,'oBikes'],
    [8,'2030truckgen','Plan2040_trucks_2012,Plan2035_truckgen_2030','<span class="legend_text">Truck Trips per Sq Mi 2012</span>',taz2727  + ',' + truck_gen ,'oTruckGen'],
    [9,'2040trucks','Plan2040_trucks_2040','<span class="legend_text">Truck Trips per Sq Mi 2040</span>',taz2727,'oTAZ_trucks'],
    [10,'change_trucks','Plan2040_trucks_change','<span class="legend_text">Change in Truck Trip Density, 2012-2040</span>',taz2727,'oTAZ_trucks'],
//      NOTE:  truck generators originally attached to 2040 trip ends in [12] below--now, attached to 2012 trip ends in [8] above, as per B.Kuttner.  MPM, Oct 14, 2014.                                                
//    [12,'2030truckgen','Plan2040_trucks_2040,Plan2035_truckgen_2030','<span class="legend_text">Truck Trips per Sq Mi 2040</span>',taz2727 + ',' + truck_gen ,'oTruckGen'],                                        
    [15,'VOC2012_AM_E','Plan2035_VOC_14AMExpwy','<span class="legend_text">Volume-to-Capacity Ratio 2012 AM - Expressways</span>',VOClayer,'oVOC'],
    [16,'VOC2012_AM_A','Plan2035_VOC_14AMArter','<span class="legend_text">Volume-to-Capacity Ratio 2012 AM - Arterials</span>',VOClayer,'oVOC'],
    [17,'VOC2012_PM_E','Plan2035_VOC_14PMExpwy','<span class="legend_text">Volume-to-Capacity Ratio 2012 PM - Expressways</span>',VOClayer,'oVOC'],
    [18,'VOC2012_PM_A','Plan2035_VOC_14PMArter','<span class="legend_text">Volume-to-Capacity Ratio 2012 PM - Arterials</span>',VOClayer,'oVOC'], 
    [19,'VOC2040_AM_E','Plan2040_VOC_40AMExpwy','<span class="legend_text">Volume-to-Capacity Ratio 2040 AM - Expressways</span>',VOClayer_2040,'oVOC_2040'],
    [20,'VOC2040_AM_A','Plan2040_VOC_40AMArter','<span class="legend_text">Volume-to-Capacity Ratio 2040 AM - Arterials</span>',VOClayer_2040,'oVOC_2040'],
    [21,'VOC2040_PM_E','Plan2040_VOC_40PMExpwy','<span class="legend_text">Volume-to-Capacity Ratio 2040 PM - Expressways</span>',VOClayer_2040,'oVOC_2040'],
    [22,'VOC2040_PM_A','Plan2040_VOC_40PMArter','<span class="legend_text">Volume-to-Capacity Ratio 2040 PM - Arterials</span>',VOClayer_2040,'oVOC_2040'],        
//    [23,'crashes','Plan2035_crash','<span class="legend_text">Top 5 Percent Crash Locations: Equivalent Property Damage Only <br />(EPDO) Ratings</span>',crash_layer,'oCrashes'],
    [23,'crashes','Plan2040_crash_gen_poly_1color,Plan2040_crash_gen_point_1color','<span class="legend_text">Top 5% Crash Locations (2011-2013): Equivalent Property Damage Only <br />(EPDO) Ratings</span>',crash_layer_poly + ',' + crash_layer_pt,'oCrashes'],
    [24,'bike_crashes','Plan2040_crash_bike_poly_1color,Plan2040_crash_bike_point_1color','<span class="legend_text">Top 5% Bike Crash Locations (2004-2013): Equivalent Property Damage Only <br />(EPDO) Ratings</span>',crash_bikes_poly + ',' + crash_bikes_pt,'oBikeCrashes'],
    [25,'ped_crashes','Plan2040_crash_ped_poly_1color,Plan2040_crash_ped_point_1color','<span class="legend_text">Top 5% Pedestrian Crash Locations (2004-2013): Equivalent Property Damage Only (EPDO) Ratings</span>',crash_peds_poly + ',' + crash_peds_pt,'oPedCrashes'],
    [26,'rail_freight','Plan2040_rail_freight','<span class="legend_text">Massachusetts Rail Freight Lines: Operators</span>',rail_freight,'oRailFreight']
]                                                   //  end of transportation data layer parameters

//                      0          1             2             3
//  Fields are:     index,  div_identifier   typename,   propertyName
PLAN.download_choice = [
    [1,'Population',taz2727,"taz,town,pop_psqmi_2010,pop_psqmi_2040,pop_psqmi_change"], 
    [2,'Employment',taz2727,"taz,town,emp_psqmi_2010,emp_psqmi_2040,emp_psqmi_change"],                  //    marymcs.demoApp.items_emp;
    [3,'Elderly',elderly,"town,town_id,age_70_plus,population,pct_elderly"],
    [4,'Top 5% Crashes',crash_layer_poly,"epdo,l1street,l2street,towns,plan2035_radial_corr,crashcount,circumferential_corridor"],
    [5,'VOC Ratio',VOC_table,"plan2035_radial_corr,circumferential_corridor,roadway_type,peak_period,roadway,voc"],
    [6,'Speed Index',spd_idx_table,"year,plan2035_radial_corr,circumferential_corridor,peakperiod,route,direction,from_to,speedindex"],
    [7,'Travel Time Index',tt_table,"year,plan2035_radial_corr,circumferential_corridor,peakperiod,route,direction,from_to,traveltimeindex"],
    [8,'Rail Stations',CR_stns,"station,line_brnch,plan2035_radial_corr"],
    [9,'Airports',airports,"town,airport_name"],
    [10,'Park-Ride Lots',park_ride_lots,"town,location,capacity,bus_service"],
    [11,'Boat Docks',seaports,"term_name,passenger,town,service,mpo"],
    [12,'Bike Paths',bikes_table,"localname,length_miles"],
    [13,'Households',taz2727,"taz,town,hh_psqmi_2010,hh_psqmi_2040,hh_psqmi_change"],
]