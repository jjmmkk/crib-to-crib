define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/page/page.html',
    'view/page/list/header',
    'view/page/list/part/list'
], function( $, _, Backbone, PageTpl, PageHeaderView, PagePartList ) {

    var PageView = Backbone.View.extend( {

        el: '#tag-app',

        template: PageTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html( this.template );

            var pageHeaderView = new PageHeaderView( this.options );
            pageHeaderView.render();

            var pagePartList = new PagePartList( this.options );
            pagePartList.render();
        }

    } );

    return PageView;

} );
