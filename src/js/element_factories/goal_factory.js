// This object creates goal elements
var GOAL_FACTORY = {
    /**
     * Create a goal shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        CONTROL.pushElement(PAPER.rect(event.clientX - 100, event.clientY
                - 50, 200, 100, 20).attr({"stroke-width": 3, fill: "#ffffff"}),
                event.clientX, event.clientY, "goal");
    }
}