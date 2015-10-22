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
    makeLink: function(path, x1, y1, x2, y2) {
        var arrowheadPath = "M ", // The arrowhead's drawing path
            arrowheadObject,   // The arrowhead object
            ax1 = x2 - 20,     // The x-coordinate of one arm of the arrowhead
            ay1 = y2 - 10,     // The y-corrdinate of one arm of the arrowhead
            ay2 = y2 + 10,     // The y-coordinate of the other arm
            set = PAPER.set(), // A set containing the path and its head
            theta,             // How much the head must rotate
            rotate = "r";      // The rotation string

        arrowheadPath = arrowheadPath.concat(ax1.toString(), ",",
            ay1.toString(), " ", x2.toString(), ",", y2.toString(), " ",
            ax1.toString(), ",", ay2.toString());
        theta = LINK_CALCULATOR.calculateRotation(x1, y1, x2, y2);
        rotate = rotate.concat(theta.toString(), ",", x2.toString(), ",",
                               y2.toString());
        set.push(PAPER.path(path).attr({"stroke-width": 5}));
        arrowheadObject = PAPER.path(arrowheadPath).attr({"stroke-width": 5,
                "stroke-linecap": "round"});
        arrowheadObject.transform(rotate);
        set.push(arrowheadObject);
        return set;
    },
}
