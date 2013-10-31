main()
function main() {
    //replaceTextByFont( "Martin");
    //replaceTextByFont( "XBOX-360");
    //replaceTextByFont( "PrimaDingbatsWii");
    replaceTextByFont( get_font() );
}

function replaceTextByFont( dafont ) {
    app.findTextPreferences = app.changeTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.appliedFont = app.fonts.item(dafont);
    app.changeTextPreferences.appliedFont = app.fonts.item("Arial");
    chars = app.activeDocument.findText();
    converted = 0;
    failed = 0;
    for( i = 0; i < chars.length; i ++ ) {
        if( chars[i] instanceof Character ) {
            try {
              chars[i].createOutlines(true);
              converted += 1;
            } catch( e ) {
                failed += 1;
            }
        }
        //chars[i]
    }
    chars = app.activeDocument.changeText();
    alert( "Converted " + converted + " of font '" + dafont + "' (for some reason,  " + failed + " conversions failed, but you don't worry, these were probably <space> characters)");
}

function get_font()
{
    var fontnames = find_fonts();
    var w = new Window ('dialog {text: "Choose which font to embed", properties: {closeButton: false}}');
    var main = w.add ('panel {alignChildren: "left"}');
    var fontgroup = main.add ('group');
    var replacement_font = fontgroup.add ('dropdownlist', undefined, fontnames);
    var buttons = w.add ('group {alignment: "right"}');
    buttons.add ('button {text: "OK", name: "ok"}');
    buttons.add ('button {text: "Cancel", name: "cancel"}');
    
    replacement_font.onChange = function () {}

    var minion = replacement_font.find ("XBOX-360");
    if (minion != null)
        replacement_font.selection = minion;
    else
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

    return replacement_font.selection.text;
}



function find_fonts () {
    var known = {}, typefaces = [], fontfamilies = app.fonts.everyItem().fontFamily;
        
    for (var i = 0; i < fontfamilies.length; i++) {
        if (!known[fontfamilies[i]]) {
            known[fontfamilies[i]] = true;
            typefaces.push(fontfamilies[i]);
        }
     }
    return typefaces;
}