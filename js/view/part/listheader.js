define( [
    'jquery',
    'underscore',
    'backbone',
    'text!tpl/header/list.html',
    'model/crib',
    'lib/map'
], function( $, _, Backbone, ListHeaderTpl, Crib, map ) {

    var ListHeaderView = Backbone.View.extend( {

        el: '#tag-header',

        template: ListHeaderTpl,

        initialize: function() {
        },

        render: function() {
            this.$el.html( this.template );
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
            var valid = true;
            if ( this.fields.address.val() === '' ) {
                valid = false;
                this.fields.address.addClass( 'error' );
            }
            if ( this.fields.owner.val() === '' ) {
                valid = false;
                this.fields.owner.addClass( 'error' );
            }

            if ( valid ) {
                // Create crib
                var crib = new Crib( {
                    'address': this.fields.address.val(),
                    'owner': this.fields.owner.val()
                } );
                app.cribsCollection.push( crib );
                map.addressToLatLng(
                    crib.get( 'address' ),
                    function( lat_lng ) {
                        crib.save( { 'lat_lng': lat_lng } );
                    }
                );
                // Reset fields
                this.fields.address.val( '' ).removeClass( 'error' );
                this.fields.owner.val( '' ).removeClass( 'error' );
            }
        }

    } );

    return ListHeaderView;

} );
