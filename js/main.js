//
// Namespace
//
var app;


//
// Paths and RequireJS config
//
requirejs.config( {

	paths: {
		'async': '../vendor/js/require.async',
		'backbone': '../vendor/js/backbone',
		'backbone.localStorage': '../vendor/js/backbone.localStorage',
		'debug': 'lib/debug',
		'jquery': '../vendor/js/jquery',
		'text': '../vendor/js/require.text',
		'underscore': '../vendor/js/underscore'
	},

	shim: {
		'backbone': {
			deps: [ 'underscore', 'jquery' ],
			exports: 'Backbone'
		},
		'backbone.localStorage': {
			deps: [ 'backbone' ],
			exports: 'Backbone.LocalStorage'
		},
		'jquery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		}
	},

	waitSeconds: 20

} );


//
// Start application
//
require( [
	'view/app',
	'router/app',
	'lib/viewmanager',
	'collection/cribs'
],
function( AppView, AppRouter, ViewManager, CribsCollection ) {

	app = {

		cribsCollection: new CribsCollection(),

		view: ViewManager.create( {}, 'AppView', AppView )

	};

	$( document ).ready( function() {
		app.view.render();
		app.router = new AppRouter();
		app.router.start( { appView: app.view } );
	} );

} );
