(function() {
	var position = {lat: '', lng: ''};
	function updateDom() {
		$('.lat').val(position.lat);
		$('.lng').val(position.lng);
	}
	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 0, lng: 0},
			zoom: 1
		});

		var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {});
		var marker = new google.maps.Marker({
			map: map,
			anchorPoint: new google.maps.Point(0, -29),
			animation: google.maps.Animation.DROP,
			draggable: true
		});
		autocomplete.addListener('place_changed', function() {
			var place = autocomplete.getPlace();
			position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

			if(place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);
			}

			marker.setPosition(place.geometry.location);
			marker.setAnimation(google.maps.Animation.DROP);
			updateDom();
		});

		marker.addListener('dragend', function(e) {
			position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
			updateDom();
		});
	}

	google.maps.event.addDomListener(window, 'load', initMap);
	$('.lat, .lng').on('click', function() {
		$(this).select();
	});
})();