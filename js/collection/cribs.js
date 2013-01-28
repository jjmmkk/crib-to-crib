define( [
	'underscore',
	'backbone',
	'model/crib',
	'backbone.localStorage'
], function( _, Backbone, Crib ) {

	var Cribs = Backbone.Collection.extend( {

		model: Crib,

		localStorage: new Store( 'crib-to-crib' ),

		origin: function () {
			var returned = this.modelsByAttr( 'is_origin', true );
			return returned[0] || false;
		},

		destination: function () {
			var returned = this.modelsByAttr( 'is_destination', true );
			return returned[0] || false;
		},

		modelsByAttr: function ( name, value ) {
			var cribs = this.filter( function( crib ) {
				return crib.get( name ) === value;
			} );
			return cribs;
		},

		mapViable: function () {
			var is_viable = true;
			var conditions = [
				( this.models.length >= 2 ),
				( this.destination() !== false ),
				( this.origin() !== false )
			];
			for ( var i = conditions.length - 1; i >= 0; i-- ) {
				is_viable = conditions[i];
				if ( !is_viable ) {
					break;
				}
			}
			return is_viable;
		}

	} );

	return Cribs;

} );
