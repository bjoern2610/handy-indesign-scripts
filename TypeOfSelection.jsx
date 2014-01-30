
main();
function main() {
    var sel = app.selection[0];
    alert( sel.constructor.name );
    alert( sel.parent.constructor.name );
}
