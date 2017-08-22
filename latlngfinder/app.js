(function() {
	var position = {lat: '', lng: ''};
	function updateDom() {
		$('.lat').val(position.lat);
		$('.lng').val(position.lng);
	}
	function initMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 0, lng: 0},
			zoom: 2
		});

		var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'), {});
		var marker = new google.maps.Marker({
			map: map,
			anchorPoint: new google.maps.Point(0, -29),
			animation: google.maps.Animation.DROP,
			draggable: true,
			cursor: 'grab'
		});
		autocomplete.addListener('place_changed', function() {
			marker.setVisible(false);
			var place = autocomplete.getPlace();
			position = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

			if(place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);
			}

			marker.setVisible(true);
			marker.setAnimation(google.maps.Animation.DROP);
			setTimeout(function() {
				marker.setPosition(place.geometry.location);
			}, 1000);
			
			updateDom();
		});

		marker.addListener('dragend', function(e) {
			position = {lat: e.latLng.lat(), lng: e.latLng.lng()};
			updateDom();
		});
	}

	google.maps.event.addDomListener(window, 'load', initMap);
	$('.lat, .lng, #address').on('click', function() {
		$(this).select();
	});
})();