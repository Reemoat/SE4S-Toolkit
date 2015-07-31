var CONTRIBUTION_FACTORY = {
    canvasClick: function() {
    },
    makeLink: function (path) {
        CANVAS.paper.path(path).attr({"stroke-width": 5, "arrow-end": "open"});
    }
}