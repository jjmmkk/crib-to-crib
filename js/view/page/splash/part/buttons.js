define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/splash/part/buttons.html',
	'view/utility/feedback'
], function( $, _, Backbone, ButtonsTpl, FeedbackView ) {

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
				new FeedbackView( {
					'type': 'info',
					'title': 'Nope',
					'message': 'Not yet implemented'
				} );
				//app.router.navigate( 'sync', { trigger: true } );
			}
		}

	} );

	return AddView;

} );
