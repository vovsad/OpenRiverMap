var selectedRiverStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: '#33CC00',
        width: 2
      })
    });
var anyRiverStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 4
      })
    });

var clonedRiverStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
        color: 'red',
        width: 4
      })
    });

var RedPoint = new ol.style.Style({
    stroke: new ol.style.Circle({
        color: 'red',
        width: 4
    })
});

var dotIconStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
});
