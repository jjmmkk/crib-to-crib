define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/splash/part/buttons.html'
], function( $, _, Backbone, ButtonsTpl ) {

	var AddView = Backbone.View.extend( {

		el: '#tag-content',

		template: ButtonsTpl,

		initialize: function () {
		},

		render: function () {
			this.$el.html( this.template );
		},

		events: {
			'click #route-list': function() {
				app.router.navigate( 'list', { trigger: true } );
			},
			'click #route-sync': function() {
				app.router.navigate( 'sync', { trigger: true } );
			}
		}

	} );

	return AddView;

} );
