// This object creates belief links
var BELIEF_LINK_FACTORY = {
    /**
     * Handle canvas clicks when the palette has "Belief Link" highlighted
     */
    canvasClick: function () {
    },
    
    /**
     * Create the belief link
     */
    makeLink: function (path, x1, y1, x2, y2) {
        var set = PAPER.set(); // A set containing the link and a blank path
        
        set.push(PAPER.path(path).attr({"stroke-width": 5,
                                        "stroke-dasharray": "-"}));
        set.push(PAPER.path("")); // Needed for the canvas's reconnect function
        return set;
    }
}
