define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/part/listitem.html'
], function( $, _, Backbone, ListItemTpl ) {

	var ListItemView = Backbone.View.extend( {

		tagName: 'article',

		template: ListItemTpl,

		initialize: function () {
			this.model.bind( 'destroy', this.remove, this );
			this.model.on( 'change:is_destination', this.render, this );
			this.model.on( 'change:is_origin', this.render, this );
		},

		render: function () {
			this.$el.addClass( 'tag-crib' ).html( _.template( this.template, this.model.toJSON() ) );
			return this;
		},

		events: {
			'click .event-destination': 'setDestination',
			'click .event-destroy': 'destroy',
			'click .event-origin': 'setOrigin'
		},

		destroy: function () {
			this.model.destroy();
			this.model.off( null, null, this );
			this.off();
		},

		setDestination: function () {
			this.model.setDestination();
		},

		setOrigin: function () {
			this.model.setOrigin();
		}

	} );

	return ListItemView;

} );
