$(document).ready(function() {

var map = new GMaps({
	div: '#map',
	lat: 0,
	lng: 0,
	zoom: 1,
	click: function(e) {
		console.log('Lat: ' + e.latLng.lat() + ' Lng: ' + e.latLng.lng());
	},
	dragend: function(e) {
		//console.log(e);
	}
});

map.addMarker({
	lat: 0,
	lng: 0,
	// title: 'Drag it!',
	click: function(e) {
		// console.log('Lat: ' + e.position.lat() + ' Lng: ' + e.position.lng());
		updateDom(e, 'position');
	},
	infoWindow: {
		content: '<p>Zoom the map and drag the marker to find your desired lat and lng</p>',
		maxWidth: 180,
		disableAutoPan: true
	},
	draggable: true,
	dragend: function(e) {
		// console.log('Lat: ' + e.latLng.lat() + ' Lng: ' + e.latLng.lng());
		updateDom(e, 'latLng');
	},
	animation: google.maps.Animation.DROP

});

$('form').on('submit', function(e) {

	GMaps.geocode({
		address: $('#address').val(),
		callback: function(results, status) {
			if (status == 'OK') {
				var latlng = results[0].geometry.location;
				updateDom(results[0].geometry, 'location');
				map.setCenter(latlng.lat(), latlng.lng());
				map.setZoom(5);
				map.addMarker({
					lat: latlng.lat(),
					lng: latlng.lng(),
					draggable: true,
					dragend: function(e) {
						// console.log('Lat: ' + e.latLng.lat() + ' Lng: ' + e.latLng.lng());
						updateDom(e, 'latLng');
					},
					animation: google.maps.Animation.DROP,
					click: function(e) {
						// console.log('Lat: ' + e.position.lat() + ' Lng: ' + e.position.lng());
						updateDom(e, 'position');
					},
					infoWindow: {
						content: '<p>Zoom the map and drag the marker to find your desired lat and lng</p>',
						maxWidth: 180,
						disableAutoPan: true
					},
				});
			}
		}
	});
	e.preventDefault();

});

function updateDom(e, position) {
	$('.lat').val(e[position].lat());
	$('.lng').val(e[position].lng());
}

$('.lat, .lng').on('click', function() {
	$(this).select();
});




});
