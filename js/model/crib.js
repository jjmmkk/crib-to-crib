define( [
	'underscore',
	'backbone'
], function( _, Backbone ) {

    var Crib = Backbone.Model.extend( {

        defaults: {
            'address': '',
            'lat_lng': '',
            'owner': ''
        }

    } );

	return Crib;

} );
