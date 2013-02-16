define( [
	'jquery',
	'underscore',
	'backbone',
	'lib/viewmanager'
], function( $, _, Backbone, ViewManager ) {

	var AppRouter = Backbone.Router.extend( {

		routes: {
			// Pages
			'map': 'map',
			'list': 'list',
			// Default route
			'*actions': 'list'
		},

		initialize: function () {
		},

		start: function () {
			var appView = app.view;

			// Page: Map
			this.on( 'route:map', function () {
				var options = {
					model: app.cribsCollection
				};
				app.cribsCollection.fetch( {
					success: function() {
						require( [ 'view/page/map/page' ], function( MapPage ) {
							var mapPage = ViewManager.create( appView, 'MapPage', MapPage, options );
							mapPage.render();
						} );
					}
				} );

			} );

			// Default route
			// Page: List
			this.on( 'route:list', function ( actions ) {
				actions = actions || {};
				var options = {
					actions: actions,
					model: app.cribsCollection
				};

				app.cribsCollection.fetch( {
					success: function() {
						require( [ 'view/page/list/page' ], function( ListPage ) {
							var listPage = ViewManager.create( appView, 'ListPage', ListPage, options );
							listPage.render();
						} );
					}
				} );
			} );

			Backbone.history.start();
		}

	} );

	return AppRouter;

} );
