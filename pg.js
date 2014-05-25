function initMap () {
	//Map object Contructor
	var map = new google.maps.Map(document.getElementById('map_canvas'), {
  center: new google.maps.LatLng(-15,-44),
  zoom: 3,
  mapTypeId: google.maps.MapTypeId.HYBRID,
  minZoom: 3,
  maxZoom:6
	});
	return map
}

function initHeatMap(map){
	// Heatmap Contructor
	var points = getData();
	var pointArray = new google.maps.MVCArray(points);
	heatmap = new google.maps.visualization.HeatmapLayer({
	data: pointArray,
	});
	heatmap.setMap(map);

}


function markCountry (map,callback) {
	// Layer that colors the country in the map
	var world_geometry = new google.maps.FusionTablesLayer({
  query: {
    select: 'geometry',
    from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk'
  },
  map: map,
   query: {
    select: 'geometry',
    from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
    where: "ISO_2DIGIT IN ('BR')" //The map filter...
  },
  styles: [{
  	polygonOptions: {
    fillColor: "#00FFBC",
    strokeColor: "#00FFBC",
    strokeWeight: "int"},
  	polylineOptions: {
    strokeColor: "#00FFBC",
    strokeWeight: "int"  }}
    ],
  suppressInfoWindows: true,
	});
	callback(map);
}

function initializeEspectrum() {
	var map = initMap();
	markCountry(map,initHeatMap);
	// initHeatMap(map);
}

$(document).ready(function(){
	// getDevicePoints();
	google.maps.event.addDomListener(window, 'load', initializeEspectrum);
});

function getDevicePoints() {
	// TODO: Implement GET points from the server using JQuery...
	$.get( "http://wsdb.zapto.org:8182/SAM/devices", 
		function( data ) {
			$( "body" ).append( "Name: " + data);
	},"xml");
}