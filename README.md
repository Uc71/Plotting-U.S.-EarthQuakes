# Plotting U.S. EarthQuakes
Plotting Earthquakes from USGS JSON site on a Mapbox map in JavaScript

I created a map off of a map box map centered on the geographic center of the U.S.

I accessed the GeoJSON data with d3, and created a function in my reading statement to read the JSON as data.
Within this function, I nested other functions to select features of my HTML and give them certain stylings dependent on variables created as outputs from yet other functions.

I created a function "getcolor", incorporating a switch case statement, to choose colors for my quake markers based off of the depths of the quakes.

I created another function, using the formula "return 3*((mag/Math.PI)**.5)" to calculate a radius result "getradius", based on the mag of each earthquake.
In the "getradius" function, I made the total area of each marker directly proportional to the mag of the earthquake.
This is the reason for the widely varying marker radii.