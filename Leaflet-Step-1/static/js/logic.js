var myMap=L.map("mapid",{
    center:[52,-120],
    zoom:4
   });
var grayMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:10,
    id:'mapbox/streets-v11',
    tileSize:512,
    zoomOffset:-1,
    accessToken:API_KEY
});
grayMap.addTo(myMap);
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",function(data){
    function styleI(feature){
        return {
          fillColor: getcolor(feature.geometry.coordinates[2]),
          "color": "black",
          "fillOpacity":.5,
          "opacity":1,
          "stroke":false,
          radius: getradius(feature.properties.mag)
        }
    };
    function getcolor(depth){
      switch(true){
        case depth > 90:
          return "#FF0101";
        case depth > 70:
          return "#D50000";
        case depth > 50:
          return "#B60000";
        case depth > 30:
          return "#8C0000";
        case depth > 10:
          return "#660000";
        default:
          return "000000";
      }
      };
    function getradius(mag){
      return 3*((mag/Math.PI)**.5);
    };
    L.geoJSON(data, {
      style: styleI,
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng )
      }
  }).addTo(myMap);
});
var legend=L.control({
  position:"bottomright"
});
// Then we add all the details for our legend
legend.onAdd=function(){
  var div=L
    .DomUtil
    .create("div","info legend");
  var depths=[90,70,50,30,10,-10];
  var colors=[
    "#FF0101",
    "#D50000",
    "#B60000",
    "#8C0000",
    "#660000",
    "#000000"
  ];
  // Loop through our intervals and generate a label with a colored square for each interval.
  for (var i=0;i<depths.length;i++){
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
  }
  return div;
};
legend.addTo(myMap);