//PasteIntoHack.jsx
/*  
@@@BUILDINFO@@@ "DeleteAllInstancesOfLink.jsx" 1.0.0 21 October 2013
*/
// Select an image, then this will delete all other links of same image
//
main();
function main() {
    stories = app.selection;
    app.activeDocument.select(NothingEnum.NOTHING);
    if( stories.length < 1 ) {
        stories = app.activeWindow.activeSpread.pageItems.everyItem().getElements();
    }
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
                        t.select(SelectionOptions.ADD_TO);
                        return;
                    }
                }
            }
        }
    }
}