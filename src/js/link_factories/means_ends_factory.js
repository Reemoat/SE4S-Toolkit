// This object creates means-ends links
var MEANS_ENDS_FACTORY = {
    /**
     * Handle canvas clicks when the palette has "Means-Ends" highlighted
     */
    canvasClick: function() {
    },
    
    /**
     * Create the means-ends
     */
    makeLink: function(path, x1, y1, x2, y2) {
        var arrowheadPath = "M ", // The arrowhead's drawing path
            arrowheadObject,      // The arrowhead object
            ax1 = (x1 + x2) / 2,  // The starting x-coordinate of the arrowhead
            ay1 = (y1 + y2) / 2 - 10, // The starting y-coordinate of arrowhead
            ax2 = ax1 + 20,    // The second x-coordinate of the arrowhead
            ay2 = ay1 + 10,    // The second y-coordinate of the arrowhead
            ay3 = ay2 + 10,    // The third y-coordinate of the arrowhead
            set = PAPER.set(), // A set containing the link and the arrowhead
            theta,             // How much the head must rotate
            rotate = "r";      // The rotation string
        
        arrowheadPath = arrowheadPath.concat(ax1.toString(), ",",
            ay1.toString(), " ", ax2.toString(), ",", ay2.toString(), " ",
            ax1.toString(), ",", ay3.toString());
        theta = LINK_CALCULATOR.calculateRotation(x1, y1, x2, y2);
        rotate = rotate.concat(theta.toString(), ",", ax1.toString(), ",",
                               ay2.toString());
        set.push(PAPER.path(path).attr({"stroke-width": 5}));
        arrowheadObject = PAPER.path(arrowheadPath).attr({"stroke-width": 5,
            "stroke-linecap": "round"});
        arrowheadObject.transform(rotate);
        set.push(arrowheadObject);
        return set;
    },
}