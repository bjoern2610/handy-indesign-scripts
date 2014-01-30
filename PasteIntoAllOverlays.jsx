//PasteIntoAllOverlays.jsx

// This script goes through all graphic objects in the document and tries to group them with other objects that are 'overlayed'
// (A good example is images and their frame). It then does a PasteInto to group them.
//
//TODO: Set Object Style based on graphic size?
//TODO: Rather than relying ont he object style, maybe ask at the beginning whether the image needs to be wrapped or not?
//TODO: currently only matches on one instead of multiple?

app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
//main();
function main() {

    var items = app.documents[0].allPageItems;
    //alert('Just the current page'); items = app.activeWindow.activePage.allPageItems;
    var count = 0;
    
    var sel = app.selection;
    if ( sel.length > 0 ) {
        if ( confirm("You've selected some items. Do you only want to run this script on those items? (Choosing No will run the script on the whole doc)") ) {
            items = sel;
        }
    }
    
        
	for( var i = 0; i < items.length; i++ ) {
        var children = items[i]
        
		graphic = items[i];
        if ( graphic.isValid && ( graphic.id == 217317 || graphic.id == 217309 ) ) alert( graphic.id );
		if ( isValidType( graphic ) ) {
			try {
				graphic_bounds = graphic.geometricBounds;
				if ( groupOverlays( graphic_bounds, graphic ) ) count++;
			}
			catch (err) {
                //alert(err);
			}
		}

	}
        
    alert( "Grouped " + count + " items" );
    
}
function isValidType( graphic ) { // && graphic.allPageItems.length <= 1
	return ( ( graphic instanceof Rectangle && graphic.isValid ) || graphic instanceof Image || graphic instanceof Group || graphic instanceof Oval );
}
function getBoundsDiff( b1, b2 ) {
	return Math.abs( b1[0] - b2[0] ) + Math.abs( b1[1] - b2[1] ) + Math.abs( b1[2] - b2[2] ) + Math.abs( b1[3] - b2[3] );
}
function isObjectInside( b1, b2 ) { //Is one of the objects 'inside' of the other?
	return ( b1[0] >= b2[0] && b1[1] >= b2[1] && b1[2] <= b2[2] && b1[3] <= b2[3] ) || ( b2[0] >= b1[0] && b2[1] >= b1[1] && b2[2] <= b1[2] && b2[3] <= b1[3] );
}

function groupOverlays( bounds, graphic ) {
  // if ( graphic.id != 217317 ) return false;

    var top = getTopLevel( graphic );
    if ( top != graphic && top instanceof Rectangle ) return false; //if the top level parent is a Rectangle, then it's probably sorted?   
    
   
    var p = graphic.parent;
    var items = graphic.parentPage.allPageItems;
	graphic.select( SelectionOptions.REPLACE_WITH );
   
	
    var g = [];
    //var count = 0;
    for( var i = 0; i < items.length; i++ ) {
    	var diff = getBoundsDiff( items[i].geometricBounds, bounds );
    	if ( items[i] != graphic && ( diff < 0.5 || ( diff < 3 && isObjectInside( items[i].geometricBounds, bounds ) ) ) && items[i].parent == p && isValidType( items[i] ) ) {
            
           //alert( "id:" + items[i].id + " diff:" + diff );
            items[i].select( SelectionOptions.ADD_TO );
    		//count++;
    	}
    	
    }
    var sel = app.selection;
    if ( sel.length > 1 ) {
        if ( sel.length == 2 ) {
            if ( 
                ( sel[0].parent == sel[1] && sel[1].allPageItems.length == 1 ) ||
                ( sel[1].parent == sel[0] && sel[0].allPageItems.length == 1 )
            ) { //1 item inside another
                //alert( '1 item inside another' );
                return false;
            }
        }
        
        if ( sel[0].parent instanceof Group ) sel[0].parent.select( SelectionOptions.REPLACE_WITH );
    	pasteIntoHack();
    	return true;
    }
    else return false;
}


function pasteIntoHack() {
    
    
    var myObj = new Array;
    myObj = app.selection;
    var bounds = getSelectionBounds(app.selection);

    
    if( myObj.length == 1 && myObj[0] instanceof Group ) {
        var g = myObj[0];
    } else {
        var g = app.activeWindow.activePage.groups.add(myObj);
    }
    g.select();
    
    app.cut();
    var r = app.activeWindow.activePage.rectangles.add({geometricBounds:bounds});
    r.select();
    app.pasteInto();
    //r.fit(FitOptions.frameToContent);

}



function getSelectionBounds(selection) {
    bounds = selection[0].visibleBounds;
    for(var myCounter = 1; myCounter < selection.length; myCounter ++){
        myObject = selection[myCounter];
        ob = myObject.visibleBounds;
        if (bounds[0] > ob[0]){
            bounds[0] = ob[0];
        }
        if (bounds[2] < ob[2]){
            bounds[2] = ob[2];
        }
        if (bounds[1] > ob[1]){
            bounds[1] = ob[1];
        }
        if (bounds[3] < ob[3]){
            bounds[3] = ob[3];
        }
    }
    return bounds;
}

function getTopLevel( obj ) {
    if ( obj.parent instanceof Spread || obj.parent instanceof Character ) return obj;
    else return getTopLevel( obj.parent );
}