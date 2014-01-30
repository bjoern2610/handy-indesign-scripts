//SelectNextUnanchoredItem.jsx

app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    app.activeDocument.select(NothingEnum.NOTHING);
    var graphs = app.documents[0].pageItems.everyItem().getElements();

     //var count = 0;
    while( t = graphs.pop()  ) {
        if( ((t instanceof Rectangle)||(t instanceof Oval)||(t instanceof Polygon)) && !(t.parent instanceof Rectangle) ) {
            
            if(
                t.isValid &&
                t.hasOwnProperty('anchoredObjectSettings') &&
                (t.parent instanceof Character)
            ) {
            } else {
                t.select(SelectionOptions.REPLACE_WITH);
                return;
                // count++;
            }
            
        }
    }

   // if ( count == 0 ) 
    alert( "No unanchored items found." );
   // else alert( "Selected the next unanchored item. There are " + count + " in total." );
}
