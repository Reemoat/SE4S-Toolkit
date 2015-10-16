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
        var set = PAPER.set(); // A set containing the path and the cross line

        set.push(PAPER.path(path).attr({"stroke-width": 5}));
        set.push(PAPER.path(""));
        return set;
    }
}
