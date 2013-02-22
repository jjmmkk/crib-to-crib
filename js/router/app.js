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
			'*actions': 'splash'
		},

		initialize: function () {
		},

		start: function () {
			var appView = app.view;

			// Default route
			// Page: Splash screen
			this.on( 'route:splash', function( actions ) {
				actions = actions || {};
				var options = {
					actions: actions
				};

				require( [ 'view/page/splash/page' ], function( SplashPage ) {
					var splashPage = ViewManager.create( appView, 'SplashPage', SplashPage, options );
					splashPage.render();
				} );
			} );


			// Page: List
			this.on( 'route:list', function() {
				var options = {
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

			// Page: Map
			this.on( 'route:map', function() {
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

			// Page: Sync
			// Telltale, telltale .-.
			this.on( 'route:sync', function() {
			} );

			// History
			Backbone.history.start();
		}

	} );

	return AppRouter;

} );
