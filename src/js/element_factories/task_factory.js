// This object creates task elements
var TASK_FACTORY = {
    /**
     * Create a task shape and its text, then send it to the canvas
     */
    canvasClick: function () {
        var path = "m ",                   // The path to shape the task
            centerx = event.clientX - 100; // Center the pointer
            
        path = path.concat(centerx.toString(), ",", event.clientY.toString(),
                           " 28,-57 144,0 28,57 -28,57, -144,0 z");
        CANVAS_CONTROL.pushElement(PAPER.path(path).attr({"stroke-width": 3,
            fill: "#ffffff"}), event.clientX, event.clientY, "task");
    }
}
