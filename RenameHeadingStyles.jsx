//BreakFrame.jsx
//An InDesign JavaScript
/*  
@@@BUILDINFO@@@ "BreakFrame.jsx" 3.0.0 15 December 2009
*/
//Removes the selected text frame (or text frames) from the
//story containing the text frame and removes the text contained
//by the text frame from the story.
//
//If you want to split *all* of the text fames in the story, use the
//SplitStory.jsx script.
//
//For more information on InDesign scripting, go to http://www.adobe.com/products/indesign/scripting/index.html
//Or visit the InDesign Scripting User to User forum at http://www.adobeforums.com.
//
app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main(){
    var myDoc = app.activeDocument;
    var styles = myDoc.allParagraphStyles;
    for( a = 0; a < styles.length; a++ ) {
        if( styles[a].name.match( /^[0-9]H/ ) ) {
            var new_style = styles[a].name = styles[a].name.replace( /^([0-9])H/, 'H$1' );
        } else if ( !styles[a].name.match( /^\[/ ) ) {
            // piggyback style
            styles[a].name = styles[a].name.replace( /.*_CHAPTERHEAD/, 'CT' ).replace( /[^a-zA-Z\s0-9_-]/, "-" );
            styles[a].name = styles[a].name.replace( /.*_SECTION/, 'H1' ).replace( /[^a-zA-Z\s0-9_-]/, "-" );
            styles[a].name = styles[a].name.replace( /.*_SUBSECTION/, 'H2' ).replace( /[^a-zA-Z\s0-9_-]/, "-" );
            styles[a].name = styles[a].name.replace( /.*HEAD/, 'H3 ' ).replace( /[^a-zA-Z\s0-9_-]/, "-" );
        }
    }
}
