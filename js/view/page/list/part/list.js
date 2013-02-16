define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/list/part/list.html',
	'view/page/list/part/listitem'
], function( $, _, Backbone, ListTpl, ListItemView ) {

	var ListView = Backbone.View.extend( {

		el: '#tag-content',

		template: ListTpl,

		initialize: function () {
			var self = this;
			this.model.bind( 'add', function( crib ) {
				self.renderOne( crib );
			} );
		},

		render: function () {
			this.$el.append( this.template );
			_.each( this.model.models, function( crib ) {
				this.renderOne( crib );
			}, this );
		},

		renderOne: function ( crib ) {
			var view = new ListItemView( { model: crib } );
			this.$( '#tag-list' ).append( view.render().el );
		},

		clean: function () {
			this.model.unbind();
		}

	} );

	return ListView;

} );
