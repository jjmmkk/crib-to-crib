define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/page/page.html',
    'view/page/list/header',
    'view/page/list/part/add',
    'view/page/list/part/list'
], function( $, _, Backbone, PageTpl, PageHeaderView, PagePartAdd, PagePartList ) {

    var PageView = Backbone.View.extend( {

        el: '#tag-app',

        template: PageTpl,

        initialize: function () {
        },

        render: function () {
            this.$el.html( _.template( this.template, { 'markup_class': 'page-list' } ) );

            var pageHeaderView = new PageHeaderView( this.options );
            pageHeaderView.render();

            var pagePartAdd = new PagePartAdd( this.options );
            pagePartAdd.render();

            var pagePartList = new PagePartList( this.options );
            pagePartList.render();
        }

    } );

    return PageView;

} );
