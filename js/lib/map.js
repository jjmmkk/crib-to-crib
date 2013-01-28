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

		// Directions
		directions: {
			display: new google.maps.DirectionsRenderer(),
			service: new google.maps.DirectionsService()
		}

	};

	// Exposed functionality
	var map = {

		addressToLatLng: function ( address, callback ) {
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

		create: function ( container_id, options ) {
			// Find waypoints
			var waypoints = [];
			_.each( app.cribsCollection.models, function( model ) {
				if ( !( model.get( 'is_origin' ) && model.get( 'is_destination' ) ) ) {
					var waypoint = model.get( 'lat_lng' );
					waypoints.push( {
						'location': gm.position( waypoint.lat, waypoint.lng )
					} );
				}
			} );

			// Find origin and destination
			var origin = app.cribsCollection.origin().get( 'lat_lng' );
			origin = gm.position( origin.lat, origin.lng );
			var destination = app.cribsCollection.destination().get( 'lat_lng' );
			destination = gm.position( destination.lat, destination.lng );

			// Configurable options
			var defaultOptions = {

				zoom: 15,

				mapTypeId: google.maps.MapTypeId.ROADMAP

			};
			options = options || defaultOptions;

			// Forced options
			options.center = origin;

			// Create map
			var map = new google.maps.Map( document.getElementById( container_id ), options );

			// Create travel route
			this.route( map, {
				origin: origin,
				destination: destination,
				waypoints: waypoints
			} );
		},

		route: function ( map, options ) {
			// Forced option
			options.avoidHighways = true;
			options.optimizeWaypoints = true;
			options.travelMode = google.maps.TravelMode.WALKING;

			// Create travel route
			gm.directions.display.setMap( map );
			gm.directions.service.route( options, function( result, status ) {
			if ( status == google.maps.DirectionsStatus.OK ) {
					gm.directions.display.setDirections( result );
				}
			} );
		}

	};

	return map;

} );
