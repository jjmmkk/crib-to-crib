define( function() {

    return d = {
        c: function( msg ) {
            if ( typeof console === 'undefined' ) {
                return;
            }
            return console.log( msg );
        }
    };

} );
