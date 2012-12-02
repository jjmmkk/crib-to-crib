requirejs.config(
    {
        paths: {
            'async': 'vendor/require.async',
            'jquery': 'vendor/jquery',
            'backbone': 'vendor/backbone',
            'backbone.localStorage': 'vendor/backbone.localStorage',
            'underscore': 'vendor/underscore',
            'debug': 'lib/debug',
            'map': 'lib/map'
        },
        shim: {
            'backbone': {
                deps: [ 'underscore', 'jquery' ],
                exports: 'Backbone'
            },
            'backbone.localStorage': {
                deps: [ 'backbone' ],
                exports: 'Backbone.LocalStorage'
            }
        },
        waitSeconds: 20
    }
);

require(
[
    'underscore',
    'jquery',
    'backbone',
    'backbone.localStorage',
    'debug'
],
function() {// Global boys don't cry and export whatever they want



    //
    // Namespace
    //
    var app = {};



    //
    // Model
    //
    var Crib = Backbone.Model.extend( {

        // Only for reference, not used by the script
        defaults: {
            'address': '',
            'owner': ''
        }

    } );



    //
    // Collection
    //      Use localStorage as backend storage
    //
    var CribCollection = Backbone.Collection.extend( {

        model: Crib,

        localStorage: new Store( 'crib-to-crib' )

    } );
    app.cribs = new CribCollection();



    //
    // Views
    //

    // Header
    var ListHeader = Backbone.View.extend( {

        el: '#tag-header',

        template: _.template( $( '#tpl-header-list' ).html() ),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );
            this.fields = {
                address: $( '#crib-address' ),
                owner: $( '#crib-owner' )
            };
        },

        events: {
            'click #act-add': 'addCrib',
            'click #act-map': function() {
                app.router.navigate( 'map', { trigger: true } );
            }
        },

        addCrib: function() {
            // Simple validation
            var error = false;
            if ( this.fields.address.val() === '' ) {
                error = true;
                this.fields.address.addClass( 'error' );
            }
            if ( this.fields.owner.val() === '' ) {
                error = true;
                this.fields.owner.addClass( 'error' );
            }

            if ( error === false ) {
                // Create crib
                app.cribs.create( {
                    'address': this.fields.address.val(),
                    'owner': this.fields.owner.val()
                } );
                // Reset fields
                this.fields.address.val( '' ).removeClass( 'error' );
                this.fields.owner.val( '' ).removeClass( 'error' );
            }
        }

    } );

    var MapHeader = Backbone.View.extend( {

        el: '#tag-header',

        template: _.template( $( '#tpl-header-map' ).html() ),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );
        },

        events: {
            'click #act-list': function() {
                app.router.navigate( 'list', { trigger: true } );
            }
        }

    } );

    // Crib
    var ListItemView = Backbone.View.extend( {

        tagName: 'article',

        template: _.template( $( '#tpl-part-list-item' ).html() ),

        initialize: function () {
            this.model.bind( 'destroy', this.remove, this );
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        events: {
            'click .act-destroy': 'destroy'
        },

        destroy: function() {
            this.model.destroy();
        }

    });

    // Crib list
    var ListView = Backbone.View.extend( {

        el: '#tag-content',

        template: _.template( $( '#tpl-content-list' ).html() ),

        initialize: function() {
            this.model.bind( 'reset', this.render, this );
            var self = this;
            this.model.bind( 'add', function( crib ) {
                self.renderOne( crib );
            });
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );
            _.each( this.model.models, function( crib ) {
                this.renderOne( crib );
            }, this );
            return this;
        },

        renderOne: function( crib ) {
            var view = new ListItemView( { model: crib } );
            this.$( '#tag-list' ).append( view.render().el );
        }

    });

    // Map
    // @todo
    var MapView = Backbone.View.extend( {

        el: '#tag-content',

        template: _.template( $( '#tpl-content-map' ).html() ),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );
        }

    } );
    require( [ 'map' ], function( map ) {
        map.hello();
    } );



    //
    // Router
    //
    var AppRouter = Backbone.Router.extend( {
        routes: {
            '': 'list',
            'list': 'list',
            'map': 'map'
        },

        list: function() {
            // Header
            // Only initialize once
            if ( app.listHeader ) {
                app.listHeader.render();
            } else {
                app.listHeader = new ListHeader();
            }

            // Crib list
            // Only initialize once
            if ( !app.listView ) {
                app.listView = new ListView( { model: app.cribs } );
            }
            app.cribs.fetch( {
                success: function() {
                    app.listView.render();
                }
            } );
        },

        map: function() {
            // Header
            // Only initialize once
            if ( app.mapHeader ) {
                app.mapHeader.render();
            } else {
                app.mapHeader = new MapHeader();
            }

            // Crib map
            // @todo
            app.mapView = new MapView();
        }
    } );

    // Start router and history
    app.router = null;
    $( document ).ready( function() {
        app.router = new AppRouter();
        Backbone.history.start();
    } );



} );
