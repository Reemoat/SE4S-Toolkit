// This object creates contribution links
var CONTRIBUTION_FACTORY = {
    /**
     * Handle canvas clicks when the palette has "Contribution" highlighted
     */
    canvasClick: function() {
    },
    
    /**
     * Create the contribution
     */
    makeLink: function (path, x1, y1, x2, y2) {
        var arrowhead = "M ", // The arrowhead, first its path, then its shape
            ax1 = x2 - 20,    // The x-coordinate of one arm of the arrowhead
            ay1 = y2 - 10,    // The y-corrdinate of one arm of the arrowhead
            ax2 = ax1,        // The x-coordinate of the other arm
            ay2 = y2 + 10,    // The y-coordinate of the other arm
            theta = 0,        // How much the arrowhead must rotate
            rotate = "r";     // The rotation string

        arrowhead = arrowhead.concat(ax1.toString(), ",", ay1.toString(), " ",
            x2.toString(), ",", y2.toString(), " ", ax2.toString(), ",",
            ay2.toString());

        // Calculate the necessary rotation for arrowhead
        if (x1 < x2 && y1 < y2) { // Quadrant I
            theta = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
        } else if (x1 === x2 && y1 < y2) { // Vertical line
            theta = 90;
        } else if (x1 > x2 && y1 < y2) { // Quadrant II
            theta = 180 - Math.atan((y2 - y1) / (x1 - x2)) * 180 / Math.PI;
        } else if (x1 > x2 && y1 === y2) { // Horizontal line
            theta = 180;
        } else if (x1 > x2 && y1 > y2) { // Quadrant III
            theta = 180 + Math.atan((y1 - y2) / (x1 - x2)) * 180 / Math.PI;
        } else if (x1 === x2) { // Vertical line in the opposite direction
            theta = 270;
        } else if (x1 < x2 && y1 > y2) { // Quadrant IV
            theta = 360 - Math.atan((y1 - y2) / (x2 - x1)) * 180 / Math.PI;
        }

        rotate = rotate.concat(theta.toString(), ",", x2.toString(), ",",
                               y2.toString());
        PAPER.path(path).attr({"stroke-width": 5});
        arrowhead = PAPER.path(arrowhead).attr({"stroke-width": 5,
                "stroke-linecap": "round"});
        arrowhead.transform(rotate);
    }
}
