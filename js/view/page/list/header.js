define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/list/header.html',
	'view/utility/feedback'
], function( $, _, Backbone, ListHeaderTpl, FeedbackView ) {

	var ListHeaderView = Backbone.View.extend( {

		el: '#tag-header',

		template: ListHeaderTpl,

		initialize: function () {
		},

		render: function () {
			this.$el.html( this.template );
		},

		events: {
			'click #route-splash': function() {
				app.router.navigate( 'splash', { trigger: true } );
			},
			'click #route-map': function() {
				if ( app.cribsCollection.mapViable() === true ) {
					app.router.navigate( 'map', { trigger: true } );
				} else if ( app.cribsCollection.models.length > 8 ) {
					new FeedbackView( {
						'type': 'error',
						'title': 'Too many cribs!',
						'message': 'A generous donation could be a step closer to Google Maps Business.'
					} );
				}
			}
		}

	} );

	return ListHeaderView;

} );
