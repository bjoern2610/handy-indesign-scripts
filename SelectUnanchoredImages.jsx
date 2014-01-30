//PasteIntoHack.jsx
/*  
@@@BUILDINFO@@@ "DeleteAllInstancesOfLink.jsx" 1.0.0 21 October 2013
*/
// Select an image, then this will delete all other links of same image
//
main();
function main() {
    graphs = app.selection;
    app.activeDocument.select(NothingEnum.NOTHING);
    if( graphs.length < 1 ) {
        graphs = app.activeWindow.activeSpread.pageItems.everyItem().getElements();
    }
     var spreadcount = 0;
    while( t = graphs.pop() ) {
        if( ((t instanceof Rectangle)||(t instanceof Oval)||(t instanceof Polygon)) && !(t.parent instanceof Rectangle) ) {
            if( t.images.length == 1 ) {
                if(
                    t.isValid &&
                    t.hasOwnProperty('anchoredObjectSettings') &&
                    (t.parent instanceof Character)
                ) {
                } else {
                    t.select(SelectionOptions.ADD_TO);
                     spreadcount++;
                }
            }
        }
    }
    var totalcount = countAllUnanchoredImages( app.documents[0].pageItems.everyItem().getElements() );
    alert( "Selected " + spreadcount + " unanchored images in the active spread. There are " + totalcount + " total in the whole doc." );
}

function countAllUnanchoredImages( graphs ) {
    var count = 0;
    while( t = graphs.pop() ) {
        if( ((t instanceof Rectangle)||(t instanceof Oval)||(t instanceof Polygon)) && !(t.parent instanceof Rectangle) ) {
            if( t.images.length == 1 ) {
                if(
                    t.isValid &&
                    t.hasOwnProperty('anchoredObjectSettings') &&
                    (t.parent instanceof Character)
                ) {
                } else {
                    count++;
                }
            }
        }
    }
    return count;
}