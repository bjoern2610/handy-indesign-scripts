//DESCRIPTION: List missing glyphs or apply selected font to missing glyphs.
// Peter Kahrel -- www.kahrel.plus.com
// Based on Pete Baumgartner's method, see http://forums.adobe.com/thread/1037284?tstart=0

main();
function main() {
    alert( get_data() );
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