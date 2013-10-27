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
    alert(myObj);
    if( myObj.length == 1 && myObj[0] instanceof Group ) {
        myGroupItems = myObj[0].pageItems;
        alert(myGroupItems);
        myObj[0].ungroup();
        myObj = myGroupItems;
    }
    alert(myObj);
    g = app.activeWindow.activePage.groups.add(myObj);
    g.select();
    app.cut();
    r = app.activeWindow.activePage.rectangles.add({geometricBounds:myGetBounds(app.activeDocument,app.activeWindow.activePage)})
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