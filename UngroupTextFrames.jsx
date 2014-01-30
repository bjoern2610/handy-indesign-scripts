//UngroupTextFrames.jsx

// Finds all textFrames in groups and ungroups them.
//

app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    var totalcount = 0;
    var count = 0;
    while( ( count = ungroupTextFrames() ) > 0 ) {
    	totalcount += count;
    }

    alert( "Ungrouped " + totalcount + " Groups containing a TextFrame" );

}

function ungroupTextFrames() {
    var items = app.documents[0].allPageItems;

    var count = 0;
    for( var i = 0; i < items.length; i++ ) {
    	if ( items[i] instanceof TextFrame && ( items[i].nextTextFrame != null || items[i].previousTextFrame != null ) ) {
    		
    		var group = getTopLevel( items[i] );
    		if ( group instanceof Group ) {
    			items[i].select( SelectionOptions.REPLACE_WITH );
    			group.ungroup();
    			count++;
    		}
    	}

    }
    return count;
}

function getTopLevel( obj ) {
    if ( obj.parent instanceof MasterSpread || obj.parent instanceof Spread || obj.parent instanceof Character ) return obj;
    else return getTopLevel( obj.parent );
}


