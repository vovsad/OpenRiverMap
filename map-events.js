/**
 * Do route start or clear selection on click
 */
map.on("click", function(e) {
    var coordinate = e.coordinate;

    // select.getFeatures().on('remove', function(event) {
    //   clearCalculationOutputs();
    //   });
    select.getFeatures().on('add', function(event) {
      var feature = event.target.item(0);
      var geometry = feature.getGeometry();
      if (geometry instanceof ol.geom.LineString && !addedSegments.contains(feature.getId())) {
        addedSegments.push(feature.getId(), geometry);
        var startCoordinatesInGeometryArray = getCloseCoordinatesArrayIndex(coordinate, geometry.getCoordinates());
        var clonedFeature = feature.clone();
        clonedFeature.setStyle(clonedRiverStyle);
//TODO: Add part of the feature through cloned feature
//        clonedFeature.getGeometry().setCoordinates(
//          clonedFeature.getGeometry().getCoordinates().slice(startCoordinatesInGeometryArray));

        totalSelectedLength += formatLength(clonedFeature.getGeometry());
        featuresOverlay.getSource().addFeature(clonedFeature);
        addEndPoint(clonedFeature.getGeometry().getCoordinates());
        setCalculationOutputs();
      };
      });

      var clearSelection = true;
      map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
              var geometry = feature.getGeometry();
              if (geometry instanceof ol.geom.LineString && 
                    !addedSegments.contains(feature.getId())) {
                      clearSelection = false;
            }
      });

      if(clearSelection){
        clearCalculationOutputs();
      }


    });

/**
 * Do route end on double click
 */
map.on("dblclick", function(e) {
      console.log("start or finish");
      var coordinate = e.coordinate;
      var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
          coordinate, 'EPSG:3857', 'EPSG:4326'));

      console.log('You clicked here:' + hdms);

      return false;
});

/**
* Utilities functions for event handlers
**/

function getCloseCoordinatesArrayIndex(coor, coorArray){
    var i = 0;
          coorArray.forEach(function(item, index){
            //console.log(ol.proj.transform(item, 'EPSG:3857', 'EPSG:4326'));
            if(twoDigitsAfterDot(ol.proj.transform(item, 'EPSG:3857', 'EPSG:4326')[0]) == 
              twoDigitsAfterDot(ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326')[0]) &&
              twoDigitsAfterDot(ol.proj.transform(item, 'EPSG:3857', 'EPSG:4326')[1]) == 
              twoDigitsAfterDot(ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326')[1])) { i = index; }
          });
          return i;
  }
  function twoDigitsAfterDot(n){
    return parseFloat(n).toFixed(2);
  }
  
  function addEndPoint(coordinates){
	  var endPointFeature = new ol.Feature();
	  endPointFeature.setStyle(dotIconStyle);
	  endPointFeature.setGeometry(new ol.geom.Point(coordinates[coordinates.length-1]));
	  featuresOverlay.getSource().addFeature(endPointFeature);
  }