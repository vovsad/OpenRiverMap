map.on("click", function(e) {
    select.getFeatures().on('remove', function(event) {

      clearCalculationOutputs();
      });
    });


map.on("dblclick", function(e) {
      console.log("start or finish");
      var coordinate = e.coordinate;
      var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
          coordinate, 'EPSG:3857', 'EPSG:4326'));

      console.log('You clicked here:' + hdms);
      // map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
      //   var f = feature.clone();
      //   f.setGeometry(feature.getGeometry());
      //   f.setStyle(feature.getStyle(e));
      //   marker.getSource().addFeature(f);
      //   //console.log(feature.U);
      // });



      var iconStartFeature = new ol.Feature({
          geometry: new ol.geom.Point(coordinate)  
      });
      iconStartFeature.setStyle(dotIconStyle);

      if(startPointCoordinates === 0){
        startPointCoordinates = iconStartFeature;
      }else if(endPointCoordinates === 0){
        endPointCoordinates = iconStartFeature;
      }else{
          featuresOverlay.getSource().removeFeature(startPointCoordinates);
          featuresOverlay.getSource().removeFeature(endPointCoordinates);
          startPointCoordinates = endPointCoordinates = 0;
          return false;
      }

      //add icon to vector source
      featuresOverlay.getSource().addFeature(iconStartFeature);
      return false;
});
