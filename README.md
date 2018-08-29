# legacy-lrtp-needs-assessment-app
Legacy Needs Assessment application for 2035 Long Range Transportation Plan

This app was written by Mary McShane, circa 2012-2013. It consists of three distinct applications, bundled together in the same folder, that are collectively called the "LRTP app. These are:
* main LRTP needs assessment data browser
* visualization of origins and destinations (O/D) of trips in the model area, by mode
* visualization of modeled trips into the Boston central area, by mode

This the main LRTP data browser and the O/D visualization make use of the following external resources:
* Version 1.7.1 of the jQuery library
* Version 2.13 of the OpenLayers library
The Boston trips visualization makes use of the following external resources:
* Version 1.7.1 of the jQuery library
* Version 2.13 of the OpenLayers library
* Version 3 of the d3.js library
* Version 0.1.3 of the d3pie add-in

This collection of apps was migrated from using an ArcSDE/Oracle data source to using a PostGIS/PostgreSQL data source by Ben Krepp in 2017, but was otherwise unchanged at that time. 

This collection of apps has been completely rewritten for the 2040 LRTP. This "legacy" version is being committed to GitHub solely for historical/archival/reference purposes.
