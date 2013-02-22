define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/page/page.html',
    'view/page/splash/header',
    'view/page/splash/part/buttons'
], function( $, _, Backbone, PageTpl, PageHeaderView, PagePartButtons ) {

    var PageView = Backbone.View.extend( {

        el: '#tag-app',

        template: PageTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html( _.template( this.template, { 'markup_class': 'page-splash' } ) );

            var pageHeaderView = new PageHeaderView( this.options );
            pageHeaderView.render();

            var pagePartButtons = new PagePartButtons( this.options );
            pagePartButtons.render();
        }

    } );

    return PageView;

} );
