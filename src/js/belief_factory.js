var BELIEF_FACTORY = {
    canvasClick: function () {
        var shape = CANVAS.paper.ellipse(event.clientX, event.clientY, 100, 50)
                    .attr({"stroke-width": 3, fill: "#ffffff"}),
            text = "belief"; // The belief's initial text contents
        
        CANVAS.pushElement(shape, event.clientX, event.clientY, text);
    }
}