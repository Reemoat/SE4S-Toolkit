// This object creates softgoals
var SOFTGOAL_FACTORY = {
    /**
     * Create a softgoal shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        var path = "M ", // The path string for the softgoal shape
            centerx = event.clientX + 100; // Centers the mouse cursor
            
        path = path.concat(centerx.toString(), ",", event.clientY.toString(),
            " c 0,108 -47,43 -100,39 -47,0 -100,65 -100,-39 0,-108 47,-43 \
            100,-43 47,0 100,-65, 100,43");
        CONTROL.pushElement(PAPER.path(path).attr({"stroke-width": 3,
            fill: "#ffffff"}), event.clientX, event.clientY, "softgoal");
    }
}