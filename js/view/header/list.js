define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/header/list.html',
	'model/crib',
	'lib/map',
	'view/utility/feedback'
], function( $, _, Backbone, ListHeaderTpl, Crib, map, FeedbackView ) {

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
				var address = this.fields.address.val();
				var owner = this.fields.owner.val();

				// Find address
				var obj = this;
				map.addressToLatLng( address, function( result, status ) {
					// Create crib
					if ( status === 'success' ) {
						var crib = new Crib( {
							'address': address,
							'owner': owner,
							'lat_lng': result
						} );
						app.cribsCollection.push( crib );
						// Reset fields
						_.each( obj.fields, function( field ) {
							field.val( '' ).removeClass( 'error' );
						} );
					// Error
					} else {
						new FeedbackView( {
							'type': 'error',
							'title': 'Could not find address'
						} );
					}
				} );
			}
		}

	} );

	return ListHeaderView;

} );
