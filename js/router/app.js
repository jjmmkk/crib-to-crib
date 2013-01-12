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

		start: function ( options ) {
			var appView = options.appView;

			// Page: Map
			this.on( 'route:map', function () {
				var options = {
					model: app.cribsCollection
				};
				app.cribsCollection.fetch( {
					success: function() {
						// Header
						require( [ 'view/part/mapheader' ], function( MapHeader ) {
							var mapHeader = ViewManager.create( appView, 'MapHeader', MapHeader, options );
							mapHeader.render();
						} );

						// Content
						require( ['view/page/map'], function ( MapPage ) {
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
						// Header
						require( [ 'view/part/listheader' ], function( ListHeader ) {
							var listHeader = ViewManager.create( appView, 'ListHeader', ListHeader, options );
							listHeader.render();
						} );

						// Content
						require( [ 'view/page/list' ], function( ListPage ) {
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
