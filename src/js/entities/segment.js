// The segment extending from the source when making a link
var SEGMENT = {
    path: null,   // The path from the source to the mouse pointer
    source: null, // The source element of the segment
            
    /**
     * Draw a line from the source element of a click
     */
    makeSegment: function () {
        var path = "M ",       // Path from the source to the mouse
            x = event.clientX, // x-coordinate of the mouse
            y = event.clientY, // y-coordinate of the mouse
            x2 = CONTROL.getNearestX(x, SEGMENT.source), // x-coord on src
            y2 = CONTROL.getNearestY(y, SEGMENT.source); // y-coord on src

        path = path.concat(x2.toString(), ",", y2.toString(), " ", x.toString(),
                           ",", y.toString());
        SEGMENT.path = PAPER.path(path);
    }
}