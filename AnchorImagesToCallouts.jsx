//AnchorImagesToCallouts.jsx
/*  
@@@BUILDINFO@@@ "AnchorImagesToCallouts.jsx" 1.0.0 21 October 2013
*/
// The script goes through every callout in the document and tries to find the matching image.
// If found, the image is anchored to the callout.
//
//TODO: optimise the search for misplaced callouts. It's SLOW

app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );

function main() {
    var misplacedcount = countMisplacedCallouts();
    if ( misplacedcount > 0 ) {
        if ( !confirm( "There are " + misplacedcount + " misplaced Callouts. Run anyway?") ) return false;
    }

    var checkCallouts = true;
    //getAllThreadStarts(); return;
    var threadStarts = getAllThreadStarts();
   // var sel = app.selection;
    if ( threadStarts.length > 0 ) { //get only those in the current thread, in order
        var items = [];
        for( var i = 0; i < threadStarts.length; i++ ) { //for each thread, loop through in order
            var current = threadStarts[i];
            items[items.length] = current;
            while( ( current = current.nextTextFrame ) != null ) {
                items[items.length] = current;
            }
        }
        //alert( items.length ); return;
        checkCallouts = !confirm( "Run in FAST mode? (I recommend you first run in fast mode and if you end up with a messed-up thread, undo and run again in slow mode - which will exit as soon as a threading issue is found.)" );
    }
    else { //get all text frames
        //if ( !confirm("No threads were found. Do you want to use all the TextFrames in the document (possibly not in the right order)?") ) return false;
        var items = app.documents[0].textFrames;
        checkCallouts = false; //no point checking?
    }

    var count = 0;
    var matched = 0;
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        //if ( items[i].paragraphs.length == 1 ) {
            //para = items[i].paragraphs[0];
        for ( var p = 0; p < items[i].paragraphs.length; p++ ) { //Every paragraph of the textFrame
        	para = items[i].paragraphs[p];
            if ( para.contents == "03m-004.tif" ) alert( para );
            if ( para.appliedParagraphStyle.name == 'Callouts' ) { //Find Callouts
                count++;
                try {
                    if ( findImage( para, checkCallouts ) ) matched++; //Try to find the image for that callout
                }
                catch (err) {
                    alert( err );
                    return false;
                }
            }
        }
    }
    alert( "Anchored " + matched + " images to callouts (of " + count + " callouts found)" );
    
    misplacedcount = countMisplacedCallouts();
    if ( misplacedcount > 0 ) {
        alert( "There are now " + misplacedcount + " misplaced Callouts.");
        return false;
    }
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

function removeFileExt( filename ) {
    filename = filename.replace (' ', '');
    return filename.substr(0, filename.lastIndexOf('.')) || filename;
}

function findImage( para, checkCallouts ) {
    var filename = para.contents;
    //alert( filename ); throw "blah";
    if ( filename == "03m-004.tif" ) alert( filename );
    //var items = app.documents[0].allPageItems;
   // if ( para.parentTextFrames[0].parentPage != null ) {
        //var items = para.parentTextFrames[0].parentPage.allPageItems; //only for the same page
        //alert( para.parentTextFrames[0].parentPage );
    //}
    //else {
        var items = app.documents[0].allPageItems; //all doc
    //}
    var count = 0;
    for( var i = 0; i < items.length; i++ ) {
        if ( items[i] instanceof Image ) {
            count++;
            if ( removeFileExt(filename) == removeFileExt(items[i].itemLink.name).substr(0,removeFileExt(filename).length) ) {
            	//alert( "found " + items[i].itemLink.name );

                    var group = getTopLevel( items[i] );
                    if ( group.parent instanceof Spread ) { //Only if not already anchored
                        group.select( SelectionOptions.REPLACE_WITH );

                        try {
                        	group.anchoredObjectSettings.insertAnchoredObject( para.insertionPoints[0], AnchorPosition.ANCHORED );
                        }
                        catch(err) {
                            alert( err + ": " + filename );
                            }
                        if ( checkCallouts && hasMisplacedCallouts() ) {
                            throw "misplaced-callouts";
                        }
                        return true;
                    }
                    //else alert( "already anchored? Parent is " + group.parent.constructor.name + ": " + filename );

            }
        }
    }
    //alert( "didn't find image for " + filename );
    return false;
}

function getTopLevel( obj ) {
    if ( obj.parent instanceof Spread || obj.parent instanceof Character ) return obj;
    else return getTopLevel( obj.parent );
}

function hasMisplacedCallouts() {
    var items = app.documents[0].textFrames;

    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( items[i].paragraphs.length > 1 ) {
        	for ( var p = 0; p < items[i].paragraphs.length; p++ ) { //Every paragraph of the textFrame
        		para = items[i].paragraphs[p];
        	    if ( para.appliedParagraphStyle.name == 'Callouts' ) { //Find Callouts
        	        return true;
        	    }
        	}
        }
    }
    return false;
}

function countMisplacedCallouts() {
    var items = app.documents[0].textFrames;

    var count = 0;
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( items[i].paragraphs.length > 1 ) {
        	for ( var p = 0; p < items[i].paragraphs.length; p++ ) { //Every paragraph of the textFrame
        		para = items[i].paragraphs[p];
        	    if ( para.appliedParagraphStyle.name == 'Callouts' ) { //Find Callouts
        	        count++;
        	    }
        	}
        }
    }
    return count;
}

