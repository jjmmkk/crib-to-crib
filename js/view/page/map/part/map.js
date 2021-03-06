define([
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/map/part/map.html',
	'lib/map'
], function( $, _, Backbone, MapTpl, map ) {

	var MapView = Backbone.View.extend( {

		el: '#tag-content',

		template: MapTpl,

		initialize: function () {
		},

		render: function () {
			if ( app.cribsCollection.mapViable() === true ) {
				this.$el.html( this.template );
				map.create( 'tag-map-wrap' );
			} else {
				app.router.navigate( 'list', { trigger: true } );
			}
		}

	} );

	return MapView;

} );
