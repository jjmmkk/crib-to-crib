define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/splash/header.html'
], function( $, _, Backbone, SplashHeaderTpl ) {

	var ListHeaderView = Backbone.View.extend( {

		el: '#tag-header',

		template: SplashHeaderTpl,

		initialize: function () {
		},

		render: function () {
			this.$el.html( this.template );
		}

	} );

	return ListHeaderView;

} );
