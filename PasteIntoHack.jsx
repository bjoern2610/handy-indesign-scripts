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
    bounds = getSelectionBounds(app.selection);
    if( myObj.length == 1 && myObj[0] instanceof Group ) {
        g = myObj[0];
    } else {
        g = app.activeWindow.activePage.groups.add(myObj);
    }
    g.select();
    app.cut();
    //r = app.activeWindow.activePage.rectangles.add({geometricBounds:myGetBounds(app.activeDocument,app.activeWindow.activePage)})
    r = app.activeWindow.activePage.rectangles.add({geometricBounds:bounds});
    r.select();
    app.pasteInto();
    r.fit(FitOptions.frameToContent);
}

function myGetBounds(myDocument, myPage){
    var myPageWidth = myDocument.documentPreferences.pageWidth;
    var myPageHeight = myDocument.documentPreferences.pageHeight
    if(myPage.side == PageSideOptions.leftHand){
        var myX2 = myPage.marginPreferences.left;
        var myX1 = myPage.marginPreferences.right;
    }
    else{
        var myX1 = myPage.marginPreferences.left;
        var myX2 = myPage.marginPreferences.right;
    }
    var myY1 = myPage.marginPreferences.top;
    var myX2 = myPageWidth - myX2;
    var myY2 = myPageHeight - myPage.marginPreferences.bottom;
    return [myY1, myX1, myY2, myX2];
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