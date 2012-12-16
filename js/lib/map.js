// @todo
// The distance between two points in a grid is
// sqrt( (B->x - A->x)^2 + (B->y - A->y)^2 )
// where `A` and `B` are the two points

define( [ 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCzxM0KiQvl_h2C29l5t43Jx-MR7wMbuEA&sensor=false' ],
function() {

    // Utilities
    var u = {
        // Square a number
        sq: function( num ) {
            return Math.pow( num, 2 );
        },

        // Google Maps geocoder
        geocoder: new google.maps.Geocoder()
    }

    // Calculcate distance between points A and B
    // by sqrt( sqr(B->x - A->x) + sqr(B->y - A->y) )
    var pointsDistance = function( a, b, accuracy ) {
        accuracy = accuracy || 30;
        return Math.sqrt( u.sq( b.x - a.x ) + u.sq( b.x - a.x ) ).toFixed( accuracy );
    }

    // Export
    return map = {
        addressToLatLng: function( address, callback ) {
            u.geocoder.geocode( { 'address': address }, function( result, status ) {
                if ( status == google.maps.GeocoderStatus.OK ) {
                    callback( {
                        lng: result[0].geometry.location.lng(),
                        lat: result[0].geometry.location.lat(),
                    } );
                } else {
                    // @todo
                    // Error handling
                }
            } );
        },

        travellingSalesman: function( points ) {
            // @todo
        }
    };
} );
