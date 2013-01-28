define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/utility/feedback.html'
], function( $, _, Backbone, FeedbackTpl ) {

	var FeedbackView = Backbone.View.extend( {

		template: FeedbackTpl,

		initialize: function ( feedback ) {
			if ( typeof feedback !== 'undefiend' ) {
				this.render( feedback );
			}
		},

		render: function ( feedback ) {
			$( '#tag-app' ).append( _.template( this.template, feedback ) );
			var view = this;
			setTimeout( function() {
				$( '#tag-feedback' ).slideUp( 1000, function() {
					$( this ).remove();
					view.off();
					view.remove();
				} );
			}, 1000 );
		}

	} );

	return FeedbackView;

} );
