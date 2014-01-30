//DeleteAllEmptyItems.jsx

// Select an image, then this will delete all other links of same image
//
app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    graphs = app.activeDocument.allPageItems;
    var count = 0;
    while( t = graphs.pop() ) {
        if( isTop( t ) && ( t instanceof Rectangle || t instanceof Group || t instanceof Polygon ) ) {
            if( t.allPageItems.length == 0 ) {
                t.remove();
                count++;
            }
        }
    }
    alert( "Deleted " + count + " empty items" );
}

function isTop( obj ) {
	return ( obj.parent instanceof MasterSpread || obj.parent instanceof Spread || obj.parent instanceof Character );
}