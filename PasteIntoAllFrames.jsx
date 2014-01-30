//PasteIntoAllFrames.jsx
/*  
@@@BUILDINFO@@@ "PasteIntoAllFrames.jsx" 1.0.0 21 October 2013
*/
// User selects a frame and the script tries to find all other frames and then uses PasteIntoHack on the parent group.
// This is probably no longer very useful since I made PasteIntoAllOverlays.jsx
//

app.doScript( main, undefined, undefined, UndoModes.FAST_ENTIRE_SCRIPT );
function main() {
    var sel = app.selection;
    

    var default_style = chooseObjectStyle();
    
    //var wrap_around = confirm('Do you want the framed images to have wrap around?');
    wrap_around = true; //not yet working
    
    
    items = app.documents[0].allPageItems;
    count = 0;
    if( sel.length == 1 ) {
        graphic = sel[0];
        
        graphic_type = graphic.constructor.name;
        graphic_radius = graphic.topLeftCornerRadius;
        graphic_color = graphic.fillColor;
        
        for( i = 0; i < items.length; i++ ) {
            if( items[i].constructor.name == graphic_type ) {
                if( items[i].topLeftCornerRadius == graphic_radius ) {
                    if( items[i].fillColor == graphic_color ) {
                       
                        group = items[i].parent;
                        if ( group.constructor.name == 'Group' ) {
                            if ( group.isValid  ) { //&& group.hasOwnProperty('anchoredObjectSettings')
                               if ( group.parent.constructor.name != 'Rectangle' ) {
                                    pasteIntoHack( group, default_style, wrap_around );
                                    
                                    count++
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
    if ( count == 0 ) alert( "You need to select the frame graphic (on its own) before running this script");
    else alert( "Pasted " + count + " images and frames together" );
    
}

function chooseObjectStyle() {
    var options = app.documents[0].allObjectStyles;
    var option_names = new Array();
    for( var i = 0; i < options.length - 1; i++ ) {
        option_names.push(options[i].name);
    }
        
    var w = new Window ('dialog {text: "Choose which Object Style to apply to the new groups", properties: {closeButton: false}}');
    var main = w.add ('panel {alignChildren: "left"}');
    var fontgroup = main.add ('group');
    var replacement_font = fontgroup.add ('dropdownlist', undefined, option_names);
    var buttons = w.add ('group {alignment: "right"}');
    buttons.add ('button {text: "OK", name: "ok"}');
    buttons.add ('button {text: "Cancel", name: "cancel"}');
    
    replacement_font.onChange = function () {}


        replacement_font.selection = 0;

    replacement_font.active = true;
    current = replacement_font.selection.text;
    

    var i, buffer = "";
    replacement_font.onActivate = function () {buffer = ""; current = replacement_font.selection.text}
    replacement_font.addEventListener (
        "keydown",
        function (k) {
            // combo box autocomplete
            if (k.keyName == "Backspace") {
                buffer = buffer.replace (/.$/, "");
                if (buffer.length == 0) {
                    buffer = current;
                }
            } else {
                buffer += k.keyName.toLowerCase();
            }
            i = 0;
            while (i < fontnames.length-1 && fontnames[i].toLowerCase().indexOf (buffer) != 0) {
                ++i;
            }
            if (fontnames[i].toLowerCase().indexOf (buffer) == 0) {
                replacement_font.selection = i;
            }
        }
    );

    if (w.show() == 2) {
        // cancel clicked
        exit();
    }

    selectedObject = false;
    for( i = 0; i < options.length - 1; i++ ) {
        if (options[i].name == replacement_font.selection.text) selectedObject = options[i];
    }
    return selectedObject;
    
}

function pasteIntoHack(g, default_style, wrap_around) {

    bounds = g.visibleBounds;

    g.select();
    app.cut();
    r = app.activeWindow.activePage.rectangles.add({geometricBounds:bounds});
    r.select();
    app.pasteInto();
    r.fit(FitOptions.frameToContent);
    r.sendToBack();
    r.applyObjectStyle(default_style);
}
