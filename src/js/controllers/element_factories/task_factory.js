var TASK_FACTORY = {
    canvasClick: function () {
        var path = "m ", // The path to shape the task
            centerx = event.clientX - 100, // Center the pointer
            str = "task", // The task's initial text content
            shape; // The task's shape
            
            path = path.concat(centerx.toString(), ",",
                    event.clientY.toString(),
                    " 28,-57 143,0 28,57 -28,57, -143,0 z");
            shape = PAPER.path(path).attr({"stroke-width": 3,
                                                  fill: "#ffffff"});
            CANVAS.pushElement(shape, event.clientX, event.clientY, str);
    }
}