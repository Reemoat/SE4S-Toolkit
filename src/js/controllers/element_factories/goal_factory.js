var GOAL_FACTORY = {
    canvasClick: function () {
        var shape = PAPER.rect(event.clientX - 100, event.clientY - 50,
                    200, 100, 20).attr({"stroke-width": 3, fill: "#ffffff"}),
            str = "goal"; // The element's initial text content
    
            CANVAS.pushElement(shape, event.clientX, event.clientY, str);
    }
}