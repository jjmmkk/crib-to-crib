define([
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/page/map.html'
], function( $, _, Backbone, MapPageTpl ) {

    var MapView = Backbone.View.extend( {

        el: '#tag-content',

        template: MapPageTpl,

        initialize: function() {
            d.l( 'view: map' );
        },

        render: function() {
            this.$el.html( this.template );
        }

    } );

    return MapView;

} );
