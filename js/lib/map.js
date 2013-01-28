// https://developers.google.com/maps/documentation/javascript/reference
// @todo:
// https://developers.google.com/maps/documentation/javascript/directions
// https://developers.google.com/maps/documentation/javascript/distancematrix
define( [ 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCzxM0KiQvl_h2C29l5t43Jx-MR7wMbuEA&sensor=false' ],
function() {

	// Google Maps stuff
	var gm = {

		// Geocoder
		geocoder: new google.maps.Geocoder(),

		// Latitude and longitude
		position: function ( lat, lng ) {
			return new google.maps.LatLng( lat, lng );
		},

		// Bounds
		bounds: new google.maps.LatLngBounds()

	};

	// Exposed functionality
	var map = {

		addressToLatLng: function( address, callback ) {
			gm.geocoder.geocode( { 'address': address }, function( result, status ) {
				if ( status == google.maps.GeocoderStatus.OK ) {
					var location = result[0].geometry.location;
					callback( {

						lng: location.lng(),

						lat: location.lat()

					}, 'success' );
				} else {
					callback( {}, 'error' );
				}
			} );
		},

		create: function( container_id, options ) {
			// Find positions by looping cribs
			var positions = [];
			_.each( app.cribsCollection.models, function( model ) {
				var lat_lng = model.get( 'lat_lng' );
				var lat = lat_lng.lat;
				var lng = lat_lng.lng;
				positions.push( gm.position( lat, lng ) );
			} );

			// Map options
			var defaultOptions = {

				zoom: 15,

				center: positions[0],

				mapTypeId: google.maps.MapTypeId.ROADMAP

			};
			options = options || defaultOptions;

			// Create map
			var map = new google.maps.Map( document.getElementById( container_id ), options );

			// Create markers based on positions
			// and put the markers on the map
			// Add position to bounds
			_.each( positions, function( position ) {
				var marker = new google.maps.Marker( {

					position: position,

					map: map

				} );
				gm.bounds.extend( position );
			} );

			// Make map viewport contain all markers
			map.fitBounds( gm.bounds );
		}

	};

	return map;

} );
