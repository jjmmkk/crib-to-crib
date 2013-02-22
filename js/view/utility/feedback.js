define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/utility/feedback.html'
], function( $, _, Backbone, FeedbackTpl ) {

	var FeedbackView = Backbone.View.extend( {

		container_id: 'tag-feedback',

		template: FeedbackTpl,

		initialize: function ( feedback ) {
			if ( typeof feedback !== 'undefiend' ) {
				this.render( feedback );
			}
		},

		render: function ( feedback ) {
			// Clear previous feedback if present
			var previous_feedback_present = false;
			var container_selector = [ '#', this.container_id ].join( '' );
			if ( document.getElementById( this.container_id ) ) {
				previous_feedback_present = true;
				$( container_selector ).remove();
			}

			// Display
			$( '#tag-app' ).append( _.template( this.template, feedback ) );
			var $container = $( container_selector );
			if ( previous_feedback_present ) {
				$container.show();
			} else {
				$container.slideDown( 250 );
			}

			// Remove self after some time
			var view = this;
			var timeout = setTimeout( function() {
				$container.slideUp( 250, function() {
					$( this ).remove();
					view.off();
					view.remove();
				} );
			}, 1750 );
		}

	} );

	return FeedbackView;

} );
