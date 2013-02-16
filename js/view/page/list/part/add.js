define( [
	'jquery',
	'underscore',
	'backbone',
	'text!tpl/page/list/part/add.html',
	'model/crib',
	'lib/map'
], function( $, _, Backbone, AddTpl, Crib, map ) {

	var AddView = Backbone.View.extend( {

		el: '#tag-content',

		template: AddTpl,

		initialize: function () {
		},

		render: function () {
			this.$el.append( this.template );
			this.fields = {
				address: $( '#crib-address' ),
				owner: $( '#crib-owner' )
			};
		},

		events: {
			'click #event-add': 'addCrib'
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
						// storage rather than the nonexistent backend
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

	return AddView;

} );
