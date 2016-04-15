var geolocation = new ol.Geolocation({
    projection : view.getProjection(),
    tracking : true
});

geolocation.on('error', function(error) {
    console.log(error.message);
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(dotIconStyle);

var geolocationOverlay = new ol.layer.Vector({
    map : map,
    source : new ol.source.Vector({
	features : [ positionFeature ]
    })
});
var featuresOverlay = new ol.layer.Vector({
    map : map,
    source : new ol.source.Vector({

    })
});

var geolocation = new ol.Geolocation({
    projection : view.getProjection(),
    tracking : true
});
geolocation.once('change:position', function() {
    view.setCenter(geolocation.getPosition());
    positionFeature.setGeometry(geolocation.getPosition() ? new ol.geom.Point(geolocation.getPosition()) : null);

});