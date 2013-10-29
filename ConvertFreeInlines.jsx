//PasteIntoHack.jsx
/*  
@@@BUILDINFO@@@ "DeleteAllInstancesOfLink.jsx" 1.0.0 21 October 2013
*/
// Select an image, then this will delete all other links of same image
//
main();
function main() {
    //stories = app.selection;
    app.activeDocument.select(NothingEnum.NOTHING);
    //if( stories.length < 1 ) {
        stories = app.activeWindow.activeSpread.pageItems.everyItem().getElements();
    //}
    for( i = 0; i < stories.length; i ++ ) {
        if( stories[i] instanceof TextFrame ) {
            graphs = stories[i].parentStory.allPageItems;
            while( t = graphs.pop() ) {
                if( t instanceof Group ) {
                    if(
                        t.isValid &&
                        t.hasOwnProperty('anchoredObjectSettings') &&
                        (t.parent instanceof Character) &&
                        t.anchoredObjectSettings.anchoredPosition == AnchorPosition.INLINE_POSITION
                    ) {
                        //t.parent.select();
                        //index = t.parent.characters.firstItem().index;
                        //story = t.parent.parentStory;
                        ip = t.parent.insertionPoints[0].getElements()[0];
                        with( t.anchoredObjectSettings ) {
                            anchoredPosition = AnchorPosition.ANCHORED;
                            releaseAnchoredObject();
                        }
                        //app.select(index);
                        //return;
                        //index = app.selection[0].index+1;
                        //alert( index ); return;
                        //alert( story ); return; 
                        //alert( story.insertionPoints[index] ); return;
                        r = convert(t);
                        r.anchoredObjectSettings.insertAnchoredObject( ip, AnchorPosition.INLINE_POSITION );
                        //return;
                    }
                }
            }
        }
    }
}


function convert(g) {
    g.select();
    bounds = getSelectionBounds(app.selection);
    app.cut();
    r = app.activeWindow.activePage.rectangles.add({geometricBounds:bounds});
    r.select();
    app.pasteInto();
    r.fit(FitOptions.frameToContent);
    return r;
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