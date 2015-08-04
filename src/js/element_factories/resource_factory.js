var RESOURCE_FACTORY = {
    canvasClick: function () {
        var shape = CANVAS.paper.rect(event.clientX - 100, event.clientY - 50,
                    200, 100).attr({"stroke-width": 3, fill: "#ffffff"}),
            text = "resource"; // The resource's initial text content
        
            CANVAS.pushElement(shape, event.clientX, event.clientY, text);
    }
}