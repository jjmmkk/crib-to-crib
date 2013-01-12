define([
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
        },

        render: function() {
            this.$el.html( _.template( this.template, this.model.toJSON() ) );
            return this;
        },

        events: {
            'click .act-destroy': 'destroy'
        },

        destroy: function() {
            this.model.destroy();
            this.model.off( null, null, this );
            this.off();
        }

    } );

    return ListItemView;

} );
