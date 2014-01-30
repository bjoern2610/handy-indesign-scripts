//InsertFrameBreaks.jsx

// 
//main();
app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );

function main() {
    
    var misplacedcount = countMisplacedCallouts();
    if ( misplacedcount > 0 ) {
        if ( !confirm( "There are " + misplacedcount + " misplaced Callouts. Run anyway?") ) return false;
    }


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
    else { //get all text frames
        alert('No threading found. This script is for threaded text frames.');
        return false;
    }

    var count = 0;
    var matched = 0;
    for( var i = 0; i < items.length; i++ ) { //Every textFrame
        if ( items[i].characters.lastItem().isValid ) {
            items[i].characters.lastItem().select( SelectionOptions.REPLACE_WITH ); // = SpecialCharacters.FRAME_BREAK;
            myParentStory = app.documents[0].selection[0].parentStory;
            myCharIndex = app.documents[0].selection[0].index;
            myCompareChar = myParentStory.characters.item(myCharIndex);
            if ( myCompareChar.contents == "\r" ) {
                app.selection[0].contents = SpecialCharacters.FRAME_BREAK;
                count++;
            }
        }

    }
    alert( "Inserted " + count + " Frame Breaks" );
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

