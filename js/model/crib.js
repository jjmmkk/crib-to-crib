define( [
	'underscore',
	'backbone'
], function( _, Backbone ) {

    var Crib = Backbone.Model.extend( {

        defaults: {
            'address': '',
            'is_destination': false,
            'is_origin': false,
            'lat_lng': '',
            'owner': ''
        }

    } );

	return Crib;

} );
