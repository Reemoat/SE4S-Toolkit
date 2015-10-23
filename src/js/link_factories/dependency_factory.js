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
        var dPath = "M ",             // The D shape's drawing path
            dObject,                  // The D shape's object
            ax1 = (x1 + x2) / 2,      // The first x-coordinate of the D's path
            ay1 = (y1 + y2) / 2 - 10, // The first y-coordinate of the D's path
            ax2 = ax1 + 20,           // The second x-coordinate of the D's path
            ay2  = ay1 + 20,          // The second y-coordinate of the D's path
            ry = (y1 + y2) / 2,       // The y-coordinate for shape rotation
            set = PAPER.set(),        // A set containing the path and D
            theta,                    // How much the head must rotate
            rotate = "r";             // The rotation string

        dPath = dPath.concat(ax1.toString(), ",", ay1.toString(), " C ",
            ax2.toString(), ",", ay1.toString(), " ", ax2.toString(), ",",
            ay2.toString(), " ", ax1.toString(), ",", ay2.toString(), " z");
        theta = LINK_CALCULATOR.calculateRotation(x1, y1, x2, y2);
        rotate = rotate.concat(theta.toString(), ",", ax1.toString(), ",",
                               ry.toString());
        set.push(PAPER.path(path).attr({"stroke-width": 5}));
        dObject = PAPER.path(dPath).attr({"stroke-width": 5, fill: "#000000"});
        dObject.transform(rotate);
        set.push(dObject);
        return set;
    }
}
