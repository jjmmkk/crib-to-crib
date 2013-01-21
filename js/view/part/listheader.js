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

		initialize: function () {
		},

		render: function () {
			this.$el.html( this.template );
			this.fields = {
				address: $( '#crib-address' ),
				owner: $( '#crib-owner' )
			};
		},

		events: {
			'click #event-add': 'addCrib',
			'click #event-map': function() {
				app.router.navigate( 'map', { trigger: true } );
			}
		},

		addCrib: function () {
			// Simple validation
			var valid = true;
			_.each( this.fields, function( field ) {
				if ( field.val() === '' ) {
					valid = false;
					field.addClass( 'error' );
				} else {
					field.removeClass( 'error' );
				}
			} );
			if ( valid ) {
				// Create crib
				var crib = new Crib( {
					'address': this.fields.address.val(),
					'owner': this.fields.owner.val()
				} );
				app.cribsCollection.push( crib );
				map.addressToLatLng( crib.get( 'address' ), function( lat_lng ) {
					crib.save( { 'lat_lng': lat_lng } );
				} );
				// Reset fields
				_.each( this.fields, function( field ) {
					field.val( '' ).removeClass( 'error' );
				} );
			}
		}

	} );

	return ListHeaderView;

} );
