define( [
	'underscore',
	'backbone',
	'model/crib',
	'backbone.localStorage'
], function( _, Backbone, Crib ) {

	var Cribs = Backbone.Collection.extend( {

		model: Crib,

		localStorage: new Store( 'crib-to-crib' )

	} );

	return Cribs;

} );
