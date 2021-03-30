var myMap=L.map("map",{
    center:[44.967243,-103.771556],
    zoom:13
   });
   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:18,
    id:'mapbox/streets-v11',
    tileSize:512,
    zoomOffset:-1,
    accessToken:API_KEY
}).addTo(mymap);
var quakes=d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(data))
for(var i=0;i<quakes.length;i++){
    L.circle(quakes[i].location,{
     fillOpacity:.75,
     color:"white",
     fillColor:"purple",
     radius:markerSize(quakes[i].mag) 
     }).bindPopup("<h1>"+quakes[i].time +"</h1> <hr> <h3>Population: "+quakes[i].gap+"</h3>").addTo(myMap);
    }