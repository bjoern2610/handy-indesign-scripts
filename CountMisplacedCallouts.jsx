//FindMisplacedCallouts.jsx
/*  
@@@BUILDINFO@@@ "FindMisplacedCallouts.jsx" 1.0.0 21 October 2013
*/
// Counts up the callouts which aren't on their own.
// TODO: Maybe then try to rearrange the text so that the callouts are in the right place.
//

main();
function main() {
    

    var count = countMisplacedCallouts();
    alert( "Found " + count + " callouts out of place" );

}

function countMisplacedCallouts() {
    var items = app.documents[0].textFrames;

    var count = 0;
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( items[i].paragraphs.length > 1 ) {
        	for ( var p = 0; p < items[i].paragraphs.length; p++ ) { //Every paragraph of the textFrame
        		para = items[i].paragraphs[p];
        	    if ( para.appliedParagraphStyle.name == 'Callouts' ) { //Find Callouts
                    if ( count == 0 ) items[i].select( SelectionOptions.REPLACE_WITH );
        	        count++;
        	    }
        	}
        }
    }
    return count;
}