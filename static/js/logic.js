// find data to use
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// call in the data that you want to use in the JSON(everything under "features")
d3.json(url).then(function (data) {
    console.log(data)
    createFeatures(data.features)
    
});


    function markerSize(magnitude) {
        return magnitude *5
    }

    function choosecolor(depth) {
        switch(true) {
            case depth > 90: return "red";
            case depth > 70: return "orangered";
            case depth > 50: return "orange"; 
            case depth > 30: return "gold"; 
            case depth > 10: return "yellow"; 
            default: return "lime"
        }
    }

function createCircleMarker(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: markerSize(feature.properties.mag),
        fillColor: choosecolor(feature.geometry.coordinates[2]),
        color:"black",
        stroke: true,
        opacity: 0.5,
        fillOpacity: .4
    });
}
// create the popup message w/ info you want on EachFeature of the data
function createFeatures(earthquakeData){
    function onEachFeature(feature,layer){
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date:${new Date(feature.properties.time)}</p></p><p>Magnitude:${feature.properties.mag} </p><p>Depth:${feature.geometry.coordinates[2]}</p>`);
    }   

// pull out the coordinates, loop through, and and use the pop ups on each coordinate. (coordinates with the messages)
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature, 
        pointToLayer: createCircleMarker
        
    });
// sending coordinates with popup messages into createMap function
    createMap(earthquakes)

function createMap(earthquakes) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    let baseMaps = {
        "Street Map": street,
        "Topographic Map": topo
    }

    let overlayMaps = {
        Earthquakes: earthquakes
    };

    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, earthquakes]
    });

let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend")
    let depth = [-10,10,30,60,90]
    legendInfo = "<h5>Magnitude</h5>"

    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
          '<i style="background:' + choosecolor(depth[i] + 1) + ';">&emsp;</i> ' +
          depth[i] + (depth[i + 1] ? '&ndash;' + depth[i +1] + '<br>' : '+');
    }
    return div
    legend.addTo(myMap)
}
    

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
}


}


