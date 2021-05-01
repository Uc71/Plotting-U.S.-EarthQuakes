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
legend.onAdd=function(){
  var div=L
    .DomUtil
    .create("div","info legend");
  var depths=[-10,10,30,50,70,90];
  var colors=[
    "#000000",
    "#660000",
    "#8C0000",
    "#B60000",
    "#D50000",
    "#FF0101"
  ];
  for (var i=0;i<depths.length;i++){
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      depths[i] + (depths[i + 1] ? " to " + depths[i + 1] + "<br>" : "+");
  }
  return div;
};
legend.addTo(myMap);