// This object creates softgoals
var SOFTGOAL_FACTORY = {
    /**
     * Create a softgoal shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        var path = "M ", // The path string for the softgoal shape
            centerx = event.clientX + 100; // Centers the mouse cursor
            
        path = path.concat(centerx.toString(), ",", event.clientY.toString(),
            " c 0,80 -47,40 -100,40 -53,0 -100,40 -100,-40 0,-80 47,-40 \
            100,-40 53,0 100,-40 100,40");
        CANVAS_CONTROL.pushElement(PAPER.path(path).attr({"stroke-width": 3,
            fill: "#ffffff"}), event.clientX, event.clientY, "softgoal");
    }
}
