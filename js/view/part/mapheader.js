define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/header/map.html'
], function( $, _, Backbone, MapHeaderTpl ) {

    var MapHeaderView = Backbone.View.extend( {

        el: '#tag-header',

        template: MapHeaderTpl,

        initialize: function() {
        },

        render: function() {
            this.$el.html( this.template);
        },

        events: {
            'click #act-list': function() {
                app.router.navigate( 'list', { trigger: true } );
            }
        }

    } );

    return MapHeaderView;

} );
