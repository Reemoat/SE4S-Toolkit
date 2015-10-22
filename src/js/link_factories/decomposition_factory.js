// This object creates decomposition links
var DECOMPOSITION_FACTORY = {
    /**
     * Handle canvas clicks when the palette has "Decomposition" highlighted
     */
    canvasClick: function () {
    },
    
    /**
     * Create the decomposition link
     */
    makeLink: function (path, x1, y1, x2, y2) {
        var crossLinePath = "M ", // Path of the line that crosses the main line
            crossLineObject,   // Object of the line that crosses the main line
            ax1 = x1 + 10,     // The horizontal position of the cross line
            ay1 = y1 - 10,     // The first end point of the cross line
            ay2 = y1 + 10,     // The second end point of the cross line
            theta,             // How much the corss line must rotate
            set = PAPER.set(), // A set containing the path and the cross line
            rotate = "r";      // The rotation string

        crossLinePath = crossLinePath.concat(ax1.toString(), ",",
            ay1.toString(), " ", ax1.toString(), ",", ay2.toString());
        theta = LINK_CALCULATOR.calculateRotation(x1, y1, x2, y2);
        rotate = rotate.concat(theta.toString(), ",", x1.toString(), ",",
                               y1.toString());
        set.push(PAPER.path(path).attr({"stroke-width": 5}));
        crossLineObject = PAPER.path(crossLinePath).attr({"stroke-width": 5});
        crossLineObject.transform(rotate);
        set.push(crossLineObject);
        return set;
    }
}
