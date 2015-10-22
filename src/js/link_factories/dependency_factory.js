// This object creates dependency links
var DEPENDENCY_FACTORY = {
    /**
     * Handle canvas clicks when the palette has "Dependency" highlighted
     */
    canvasClick: function () {
    },
    
    /**
     * Create the dependency link
     */
    makeLink: function (path, x1, y1, x2, y2) {
        /*var dPath = "M ",        // The D shape's drawing path
            dObject,             // The D shape's object
            ax1 = (x1 + x2) / 2, // The first x-coordinate of the D's path
            ay1 = y1 - 10,       // The first y-corrdinate of the D's path
            ax2 = ax1 + 20,      // The second x-coordinate of the D's path
            ay2 = ay1,           // The second y-corrdinate of the D's path
            ax3 = ax2,           // The third x-coordinate of the D's path
            ay3 = y1 + 10,       // The first y-corrdinate of the D's path
            ax4 = ax1,           // The fourth x-coordinate of the D's path
            ay4 = ay3,           // The second y-corrdinate of the D's path
            set = PAPER.set(),   // A set containing the path and its head
            theta,               // How much the head must rotate
            rotate = "r";        // The rotation string

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
        return set;*/
    }
}
