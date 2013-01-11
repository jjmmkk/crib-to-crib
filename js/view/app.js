define( [
    'jquery',
    'underscore',
    'backbone',
    'lib/viewmanager',
    'text!tpl/app.html'
], function( $, _, Backbone, ViewManager, AppTpl ) {

    var AppView = Backbone.View.extend( {

        el: '#tag-root',

        template: AppTpl,

        initialize: function() {
            d.l( 'view: app' );
        },

        render: function() {
            this.$el.html( this.template );
        }

    } );

    return AppView;

} );
