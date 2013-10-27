main()
function main() {
    replaceTextByFont( "Martin");
    replaceTextByFont( "XBOX-360");
    replaceTextByFont( "PrimaDingbatsWii");
}

function replaceTextByFont( dafont ) {
    app.findTextPreferences = app.changeTextPreferences = NothingEnum.nothing;
    app.findTextPreferences.appliedFont = app.fonts.item(dafont);
    app.changeTextPreferences.appliedFont = app.fonts.item("Arial");
    chars = app.activeDocument.findText();
    for( i = 0; i < chars.length; i ++ ) {
        chars[i].createOutlines(true);
        //chars[i]
    }
    chars = app.activeDocument.changeText();
}