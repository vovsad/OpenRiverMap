var geolocation = new ol.Geolocation({
    projection : view.getProjection(),
    tracking : true
});

geolocation.on('error', function(error) {
    console.log(error.message);
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
    image : new ol.style.Circle({
	radius : 6,
	fill : new ol.style.Fill({
	    color : '#3399CC'
	}),
	stroke : new ol.style.Stroke({
	    color : '#fff',
	    width : 2
	})
    })
}));

var featuresOverlay = new ol.layer.Vector({
    map : map,
    source : new ol.source.Vector({
	features : [ positionFeature ]
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