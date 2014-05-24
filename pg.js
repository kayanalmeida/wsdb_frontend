function initialize() {
	var points = getData();
	var mapOptions = {
		center: new google.maps.LatLng(-22  , -44),
		zoom: 7,
		mapTypeId: google.maps.MapTypeId.SATELLITE};

		var map = new google.maps.Map(document.getElementById('map_canvas') ,
		mapOptions);

		var pointArray = new google.maps.MVCArray(points);

		heatmap = new google.maps.visualization.HeatmapLayer({
		data: pointArray
		});

	heatmap.setMap(map);
}
$(document).ready(function(){
	
	initialize();
});