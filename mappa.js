var vectorSource = new ol.source.Vector({
  loader: function(extent, resolution, projection) {
    var epsg4326 =
        ol.proj.transformExtent(extent, projection, 'EPSG:4326');
    var bbox = epsg4326[1] + ',' + epsg4326[0] + ',' + epsg4326[3] + ',' + epsg4326[2];    
    var url = 'http://www.overpass-api.de/api/interpreter?data=' + 
        '[out:xml][timeout:60];' + 
//        'area["boundary"~"administrative"]["name"~"Рудне"];' + 
        'way["waterway"~"river"](' + bbox + ');' + 
        '(._;>;);' +
        'out;';
    $.ajax(url).then(function(response) {
      var features = new ol.format.OSMXML().readFeatures(response,
          {featureProjection: projection});
      vectorSource.addFeatures(features);
    });
  },
  strategy: ol.loadingstrategy.bbox
});


var vector = new ol.layer.Vector({
  source: vectorSource,
  style: [anyRiverStyle]
});
var raster = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
var featuresOverlay = new ol.layer.Vector({
    source : new ol.source.Vector(),
	style: [clonedRiverStyle]
});

var view = new ol.View({
    center: ol.proj.transform([25.3,48.8], 'EPSG:4326', 'EPSG:3857'),
    maxZoom: 19,
    minZoom: 9,
    zoom: 11
  });

var select = new ol.interaction.Select({
     // condition: function(evt) {
     //   return evt.originalEvent.type == 'mousemove' 
     //       evt.type == 'singleclick';
     // },
     style: [selectedRiverStyle]
  });

var modify = new ol.interaction.Modify({
  features: select.getFeatures()
});

var locateMe = function(opt_options) {

    var options = opt_options || {};

    var button = document.createElement('button');
    button.innerHTML = '&#9899';

    var this_ = this;
    var doGeoLocation = function(e) {
      geolocation.setTracking(true);
    };

    button.addEventListener('click', doGeoLocation, false);

    var element = document.createElement('div');
    element.className = 'locate-me ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });

  };
  ol.inherits(locateMe, ol.control.Control);
  
var map = new ol.Map({
  layers: [raster, vector, featuresOverlay],
  interactions: ol.interaction.defaults().extend([select, modify]),
  target: document.getElementById('map'),
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }).extend([
             new locateMe()
             ]),
  view: view
});



var wgs84Sphere = new ol.Sphere(6378137);
var formatLength = function(line) {
  var length;
  {
    var coordinates = line.getCoordinates();
    length = 0;
    var sourceProj = map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
      var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
      length += wgs84Sphere.haversineDistance(c1, c2);
    }
  } /*else {
    length = Math.round(line.getLength() * 100) / 100;
  }*/

  return (Math.round(length * 100) / 100);
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};

//Calculations
var totalSelectedLength = 0;
//key-value map
var addedSegments = new Object();
addedSegments.deleteAll = function(){
    for (key in addedSegments){
		if(typeof addedSegments[key] != 'function'){
		    delete addedSegments[key]; 
		}
    }
    };
addedSegments.remove = function(key){
    delete addedSegments[key];
}
addedSegments.push = function(key, value){
    addedSegments[key] = value;
}
addedSegments.contains = function(key){
    for (item in addedSegments){
		if(item == key){
			return true;
    }
    }
    return false;
}

// A transform function to convert coordinates from EPSG:3857
// to EPSG:4326.
var transform = ol.proj.getTransform('EPSG:3857', 'EPSG:4326');

function clearCalculationOutputs(){
  totalSelectedLength = 0;
  addedSegments.deleteAll();
  document.getElementById("total-length-text").innerHTML = "0 km";
  featuresOverlay.getSource().clear();
}
function setCalculationOutputs(){
  document.getElementById("total-length-text").innerHTML = Math.round(totalSelectedLength)/1000 + " km";
}

