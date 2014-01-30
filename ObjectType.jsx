//PasteIntoAllFrames.jsx
/*  
@@@BUILDINFO@@@ "PasteIntoAllFrames.jsx" 1.0.0 21 October 2013
*/
// 
//
main();
function main() {
    var sel = app.selection;
    
   // var noneStyle = app.documents[0].objectStyles.itemByName('$ID/web-icon');
  //  alert( noneStyle.isValid );
   // alert( noneStyle.id );

    if( sel.length == 1 ) {
        alert( sel[0].constructor.name );
        alert( "Parent is a " + sel[0].parent.constructor.name );
        if ( sel[0] instanceof Group ) alert( "Group items = " + sel[0].allPageItems.length );
        
        if ( sel[0] instanceof Rectangle ) alert( "Rectangle items = " + sel[0].allPageItems.length );
        if ( sel[0] instanceof Polygon ) alert( "Polygon items = " + sel[0].allPageItems.length );
        //alert( sel[0].appliedObjectStyle.id );
        //alert( sel[0].geometricBounds );
        alert( "id = " + sel[0].id );
        alert( "image count = " + sel[0].images.length );
       // alert(sel[0].paragraphs[0].keepAllLinesTogether);
        //sel[0].paragraphs[0].keepAllLinesTogether = true;
       // alert( sel[0].lines.length );
        //alert( sel[0].itemLayer.id );
        /*
        var items = sel[0].allPageItems;
        for( var i = 0; i < items.length; i++ ) {
            alert( items[i].constructor.name );
        }*/
        
    }
    else if ( sel.length == 2 ) {
    	b1 = sel[0].geometricBounds;
    	b2 = sel[1].geometricBounds;
    	alert( getBoundsDiff( b1, b2 ) );
    	alert( sel[0].id );
    	alert( sel[1].id );
    	items = sel;
    	i=0;
    	alert( items[i].constructor.name );
    	//alert( items[i] instanceof SplineItem );
    	i=1;
    	alert( items[i].constructor.name );
    	//alert( items[i] instanceof SplineItem );
    	
    	alert( "inside? " + isObjectInside(  b1, b2 ) );
    }
}

function getBoundsDiff( b1, b2 ) {
	return Math.abs( b1[0] - b2[0] ) + Math.abs( b1[1] - b2[1] ) + Math.abs( b1[2] - b2[2] ) + Math.abs( b1[3] - b2[3] );
}
function isObjectInside( b1, b2 ) { //Is one of the objects 'inside' of the other?
	return ( b1[0] >= b2[0] && b1[1] >= b2[1] && b1[2] <= b2[2] && b1[3] <= b2[3] ) || ( b2[0] >= b1[0] && b2[1] >= b1[1] && b2[2] <= b1[2] && b2[3] <= b1[3] );
}