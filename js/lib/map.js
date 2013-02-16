define( [
	'underscore',
	'text!tpl/lib/infobox.html',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCzxM0KiQvl_h2C29l5t43Jx-MR7wMbuEA&sensor=false'
],
function( _, InfoBoxTpl ) {


	//
	// Google Maps shorthands
	//
	var gm = {

		// Geocoder
		geocoder: new google.maps.Geocoder(),

		// Latitude and longitude
		position: function ( lat, lng ) {
			return new google.maps.LatLng( lat, lng );
		}

	};


	//
	// Private functions
	//
	var mapMaker = {

		render: function ( element, options ) {
			options = _.extend( {
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}, options );

			// Create map
			var map = new google.maps.Map( element, options );
			return map;
		},

		route: function ( map, options ) {
			options = options || {};

			// Forced option
			options.avoidHighways = true;
			options.optimizeWaypoints = true;
			options.travelMode = google.maps.TravelMode.WALKING;

			// Create travel route
			// Notably without infowindows and markers, as I want to make these myself
			var renderer = new google.maps.DirectionsRenderer( {
				suppressInfoWindows: true,
				suppressMarkers: true
			} );
			var service = new google.maps.DirectionsService();
			renderer.setMap( map );
			service.route( options, function( result, status ) {
			if ( status == google.maps.DirectionsStatus.OK ) {
					renderer.setDirections( result );
				}
			} );

			return map;
		},

		markers: function ( map, info_sets, options ) {
			// Loading of infobox is done here to ensure object `google` exists
			require( [ '../vendor/js/google.maps.infobox' ], function() {

				// @todo
				// http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/examples.html
				var infobox = new InfoBox( {
					'boxStyle': {
						'background': '#fff'
					}
				} );
				_.each( info_sets, function( info_set ) {
					// Create marker
					var marker = new google.maps.Marker( {
						map: map,
						position: info_set.position
					} );
					// Bind click to open infobox
					var content = info_set.content;
					google.maps.event.addListener( marker, 'click', function() {
						infobox.setContent( content );
						infobox.open( map, marker );
					} );
				} );

			} );
		}

	};


	//
	// Exposed functionality
	//
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

			// Find origin, destination and waypoints
			// Store info for infoboxes, which will be created later
			var origin;
			var destination;
			var waypoints = [];
			var info_sets = [];
			_.each( app.cribsCollection.models, function( model ) {
				var position = model.get( 'lat_lng' );
				position = gm.position( position.lat, position.lng );

				if ( model.get( 'is_origin' ) ) {
					origin = position;
				} else if ( model.get( 'is_destination' ) ) {
					destination = position;
				} else {
					waypoints.push( { 'location': position } );
				}

				// Marker info
				info_sets.push( {
					content: _.template( InfoBoxTpl, model.toJSON() ),
					position: position
				} );
			} );

			// Render map
			var element = document.getElementById( container_id );
			var map = mapMaker.render( element, {
				center: origin
			} );

			// Create travel route
			mapMaker.route( map, {
				origin: origin,
				destination: destination,
				waypoints: waypoints
			} );

			// Create markers
			mapMaker.markers( map, info_sets );
		}

	};

	return map;


} );
