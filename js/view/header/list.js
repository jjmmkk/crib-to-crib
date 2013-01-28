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
				if ( app.cribsCollection.mapViable() === true ) {
					app.router.navigate( 'map', { trigger: true } );
				} else if ( app.cribsCollection.models.length > 8 ) {
					new FeedbackView( {
						'type': 'error',
						'title': 'Too many cribs!',
						'message': 'A generous donation could is a step closer to Google Maps Business.'
					} );
				}
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
						// Push before save, so that the sync is done to local
						// storage rather than the nonexistent backend URL
						app.cribsCollection.push( crib );
						crib.save();
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
