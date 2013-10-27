//PasteIntoHack.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "PasteIntoHack.jsx" 1.0.0 16 October 2013
*/
// Groups a selection, cuts it, creates a frame, pastes group into frame, then autosizes frame.
//
main();
function main() {
    var myObj = new Array;
    myObj = app.selection;
    if( myObj.length == 1 ) {
        g = myObj[0];
        g.select();
        app.copy();
        app.pasteInto();
    }
}
