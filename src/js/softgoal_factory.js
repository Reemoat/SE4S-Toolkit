var SOFTGOAL_FACTORY = {
    canvasClick: function () {
        var path = "M ", // The path string for the softgoal shape
            centerx = event.clientX + 100, // Centers the mouse cursor
            text = "softgoal", // The initial text content of the element
            shape; // The softgoal's shape
        
        path = path.concat(centerx.toString(), ",", event.clientY.toString(),
                " c 0,108 -47,43 -100,39 -47,0 -100,65 -100,-39 0,-108 47,-43 \
                100,-43 47,0 100,-65, 100,43");
        shape = CANVAS.paper.path(path).attr({"stroke-width": 3,
                                              fill: "#ffffff"}),
        CANVAS.pushElement(shape, event.clientX, event.clientY, text);
    }
}