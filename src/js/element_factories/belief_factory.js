// This object creates belief elements
var BELIEF_FACTORY = {
    /**
     * Create a belief shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        CANVAS_CONTROL.pushElement(PAPER.ellipse(event.clientX, event.clientY,
            100, 50).attr({"stroke-width": 3, fill: "#ffffff"}), event.clientX,
            event.clientY, "belief");
    }
}
