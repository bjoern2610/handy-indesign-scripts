//FindMisplacedCallouts.jsx
/*  
@@@BUILDINFO@@@ "FindMisplacedCallouts.jsx" 1.0.0 21 October 2013
*/
// Counts up the callouts which aren't on their own.
// TODO: Maybe then try to rearrange the text so that the callouts are in the right place.
//

main();
function main() {
    

    if ( !findNextMisplacedCallout() ) alert( "No misplaced Callouts found" );
    //alert( "Found " + count + " callouts out of place" );

}

function findNextMisplacedCallout() {
    
    var threadStarts = getAllThreadStarts();
    if ( threadStarts.length > 0 ) { //get only those in the current thread, in order
        var items = [];
        for( var i = 0; i < threadStarts.length; i++ ) { //for each thread, loop through in order
            var current = threadStarts[i];
            items[items.length] = current;
            while( ( current = current.nextTextFrame ) != null ) {
                items[items.length] = current;
            }
        }
    }
    else {
        var items = app.documents[0].textFrames;
    }

    //var count = 0;
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( items[i].paragraphs.length > 1 ) {
        	for ( var p = 0; p < items[i].paragraphs.length; p++ ) { //Every paragraph of the textFrame
        		para = items[i].paragraphs[p];
        	    if ( para.appliedParagraphStyle.name == 'Callouts' ) { //Find Callouts
                    items[i].select( SelectionOptions.REPLACE_WITH );
                    return true;
        	        //count++;
        	    }
        	}
        }
    }
    return false;
}

function getAllThreadStarts() {
    var items = app.documents[0].textFrames;
    var starts = [];
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( ( start = items[i].startTextFrame ) != null ) {
            starts[ start.id ] = start;
        }
    }
    var uniqueStarts = [];
    for ( startid in starts ) {
        uniqueStarts[uniqueStarts.length] = starts[startid];
    }
    return uniqueStarts;
}