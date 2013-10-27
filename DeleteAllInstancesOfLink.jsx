//DeleteAllInstancesOfLink.jsx
/*  
@@@BUILDINFO@@@ "DeleteAllInstancesOfLink.jsx" 1.0.0 21 October 2013
*/
// Select an image, then this will delete all other links of same image
//
main();
function main() {
    var sel = app.selection;
    if( sel.length == 1 ) {
        graphic = sel[0];
        if( graphic instanceof Image ) {
            if( graphic.itemLink ) {
                aid = graphic.itemLink.filePath;
                //alert( graphic.itemLink.filePath );
                delLinks( aid );
            }   
        }
    } 
}

function delLinks( aid ) {
    var graphs = app.documents[0].allGraphics;
    for( i = graphs.length - 1; i >= 0; i-- ) {
        try {
            if( graphs[i].itemLink ) {
                if( graphs[i].itemLink.filePath == aid ) {
                    graphs[i].remove();
                }
            }
        } catch(_) {};
    }
}