//PasteIntoHack.jsx
/*  
@@@BUILDINFO@@@ "DeleteAllInstancesOfLink.jsx" 1.0.0 21 October 2013
*/
// Select an image, then this will delete all other links of same image
//
main();
function main() {
    var sel = app.selection;
    items = app.activeWindow.activeSpread.allPageItems;
    if( sel.length == 1 ) {
        graphic = sel[0];
        for( i = 0; i < items.length - 1; i++ ) {
            // is there a better way than this?
            if( items[i] != graphic ) {
                if( items[i].constructor.name == graphic.constructor.name ) {
                    if( items[i].fillColor == graphic.fillColor ) {
                        items[i].select( SelectionOptions.ADD_TO );
                    }
                }
            }
        }
    } 
}
