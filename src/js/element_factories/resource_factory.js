// This object creates resource elements
var RESOURCE_FACTORY = {
    /**
     * Create a resource shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        CANVAS_CONTROL.pushElement(PAPER.rect(event.clientX - 100,
            event.clientY - 50, 200, 100).attr({"stroke-width": 3, fill:
            "#ffffff"}), event.clientX, event.clientY, "resource");
    }
}
