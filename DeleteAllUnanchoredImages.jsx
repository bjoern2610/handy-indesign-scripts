
app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    graphs = app.selection;
    app.activeDocument.select(NothingEnum.NOTHING);
    if( graphs.length < 1 ) {
        graphs = app.activeDocument.allPageItems;
    }
    while( t = graphs.pop() ) {
        if( t instanceof Rectangle ) {
            if( t.images.length == 1 ) {
                if(
                    t.isValid &&
                    t.hasOwnProperty('anchoredObjectSettings') &&
                    (t.parent instanceof Character)
                ) {
                } else {
                    t.remove();
                }
            }
        }
    }
}