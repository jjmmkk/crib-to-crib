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
        },

        setDestination: function () {
            if ( this.get( 'is_origin' ) === true ) {
                // @todo
                // Error handling
            } else {
                this.setSingle( 'is_destination' );
            }
        },

        setOrigin: function () {
            if ( this.get( 'is_destination' ) === true ) {
                // @todo
                // Error handling
            } else {
                this.setSingle( 'is_origin' );
            }
        },

        setSingle: function ( attribute_key ) {
            _.each( this.collection.models, function( model ) {
                model.set( attribute_key, false ).save();
            } );
            this.set( attribute_key, true ).save();
        }

    } );

	return Crib;

} );
