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
    converted = 0;
    failed = 0;
    for( i = 0; i < chars.length; i ++ ) {
        try {
          chars[i].createOutlines(true);
          converted += 1;
        } catch( e ) {
            failed += 1;
        }
        //chars[i]
    }
    chars = app.activeDocument.changeText();
    alert( "Converted " + converted + " of font '" + dafont + "' (for some reason,  " + failed + " conversions failed)");
}