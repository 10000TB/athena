var map;
$(document).ready(function(){
	$('#mapDiv').css('height', $(document).height()).css('height', '-=62px'); //62px is the height of the header in base.html
	initMap();
});
function initMap() {
	//Enabling new cartography and themes
	google.maps.visualRefresh = true;
	//Setting starting options of map
	var mapOptions = {
		center: new google.maps.LatLng(40.5566,-105.0676),
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false,
		zoomControl: true,
		scaleControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.TOP_LEFT
		}
	};
	//Getting map DOM element
	var mapElement = $('#mapDiv')[0];
	var map = new google.maps.Map(mapElement, mapOptions);

	// Create the search box and link it to the UI element.
	var searchPlace = $('#searchPlace')[0];
	var autocomplete = new google.maps.places.Autocomplete(searchPlace);
	autocomplete.bindTo('bounds', map);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchPlace);
	var infowindow = new google.maps.InfoWindow();
	var marker = new google.maps.Marker({
		map: map
	});
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
	autocomplete.addListener('place_changed', function() {
		infowindow.close();
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			return;
		}
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
			map.setZoom(10);
		}
	});

	var drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.RIGHT_BOTTOM,
			drawingModes: [
			//google.maps.drawing.OverlayType.MARKER,
			google.maps.drawing.OverlayType.CIRCLE,
			google.maps.drawing.OverlayType.POLYGON,
			google.maps.drawing.OverlayType.POLYLINE,
			google.maps.drawing.OverlayType.RECTANGLE
			]
		},
		//markerOptions: {icon: 'images/beachflag.png'},
		circleOptions: {
			strokeWeight: 5,
			clickable: false,
			draggable: true,
			editable: true,
			zIndex: 1
		}
	});
	drawingManager.setMap(map);
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
		if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
			var radius = event.overlay.getRadius();
		} else if(event.type == google.maps.drawing.OverlayType.POLYGON){
			event.overlay.setOptions({draggable: true});
		}
	});
}
