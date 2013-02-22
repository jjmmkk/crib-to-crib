define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/page/page.html',
    'view/page/map/header',
    'view/page/map/part/map'
], function( $, _, Backbone, PageTpl, PageHeaderView, PagePartMap ) {

    var PageView = Backbone.View.extend( {

        el: '#tag-app',

        template: PageTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html( _.template( this.template, {} ) );

            var pageHeaderView = new PageHeaderView( this.options );
            pageHeaderView.render();

            var pagePartMap = new PagePartMap( this.options );
            pagePartMap.render();
        }

    } );

    return PageView;

} );
