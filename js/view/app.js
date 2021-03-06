define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/app.html'
], function( $, _, Backbone, AppTpl ) {

    var AppView = Backbone.View.extend( {

        el: '#tag-root',

        template: AppTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html( this.template );
        }

    } );

    return AppView;

} );
