//DeleteAllInstancesOfLink.jsx

// Select an image, then this will delete all other links of same image
//
app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    var sel = app.selection;
    if( sel.length == 1 ) {
        graphic = sel[0];
        if( graphic instanceof Image ) {
            if( graphic.itemLink ) {
                aid = graphic.itemLink.filePath;
               // alert( graphic.itemLink.filePath );
                delLinks( aid );
            }   
        }
        else alert( "Must be an Image. This is a " + graphic.constructor.name );
    } 
}

function delLinks( aid ) {
    var graphs = app.documents[0].allGraphics;
    var count = 0;
    for( i = graphs.length - 1; i >= 0; i-- ) {
        try {
            if( graphs[i].itemLink ) {
                if( graphs[i].itemLink.filePath == aid ) {
                    graphs[i].remove();
                    count++;
                }
            }
        } catch(_) {};
    }
    alert( "Deleted " + count + " instances of the link" );
}