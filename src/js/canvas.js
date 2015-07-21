var CANVAS = {
    paper: null, // The Raphael canvas
    overlay: null, // A rectangle placed on top of the canvas for functionality
    element: [], // An array that records the grl elements on the canvas
    connection: [], // A collection of the canvas' connections
    src: null, // The source of an impending connection
    dst: null, // The destination of an impending connection
    enableTransform: function () {
        var textElement; // An object containing an element and its text

        // Make every element transformable
        for (var i = 0; i < this.element.length; i++) {
            textElement = this.element[i];

            textElement.ft.showHandles();
        }
    },
    disableTransform: function () {
        var textElement; // An object containing an element and its text

        // Make every element nontransformable
        for (var i = 0; i < this.element.length; i++) {
            textElement = this.element[i];

            textElement.ft.hideHandles();
        }
    },
    makeCanvas: function () {
        var container = document.getElementById("canvas");

        this.paper = Raphael(container);
        this.paper.setSize("100%", "100%");
        /*this.overlay = this.paper.rect(0, 0, this.paper.width,
                                       this.paper.height);
        this.overlay.mousemove(function (event) {
            var path = "M ";

            path = path.concat(this.src.attrs.x.toString(), ",",
                    this.src.attrs.y.toString(), " ", event.clientX.toString(),
                    ",", event.clientY.toString());
            this.paper.path(path);
        });
        console.log(this.overlay);*/
    },
    canvasClick: function () {
        var x = event.clientX,
            y = event.clientY,
            centerx, // Horizontally enter the mouse pointer
            centery, // Vertically center the mouse pointer
            attr = {"stroke-width": 3, fill: "#ffffff"},
            shape, // The shape of a GRL element
            pathString, // A string that describes a path to form a shape
            moves, // The moves of a path
            initial; // The first part of a path string

        // Check for the current PALETTE selection
        switch(PALETTE.current) {
        case "select":
            break;
        case "comment":
            break;
        case "decomposition":
            break;
        case "contribution":
            break;
        case "dependency":
            break;
        case "belief_link":
            break;
        case "actor":
            break;
        case "softgoal":
            initial = "M ";
            moves = " c 0,108 -47,43 -100,39 -47,0 -100,65 -100,-39 \
                         0,-108 47,-43 100,-43 47,0 100,-65, 100,43";
            centerx = x + 100;
            pathString = initial.concat(centerx.toString(), ",", y.toString(),
                                        moves);
            shape = this.paper.path(pathString).attr(attr);
            this.pushElement(shape, x, y);
            break;
        case "goal":
            centerx = x - 100; // Horizontally center the pointer
            centery = y - 50;  // Vertically center the pointer
            shape = this.paper.rect(centerx, centery, 200, 100, 20).attr(attr);
            this.pushElement(shape, x, y);
            break;
        case "task":
            initial = "m ";
            moves = " 28,-57 143,0 28,57 -28,57, -143,0 z"; 
            centerx = x - 100 // Center the pointer
            pathString = initial.concat(
                    centerx.toString(), ",",  y.toString(), moves);
            shape = this.paper.path(pathString).attr(attr);
            this.pushElement(shape, x, y);
            break;
        case "resource":
            centerx = x - 100; // Horizontally center the pointer
            centery = y - 50;  // Vertically center the pointer
            shape = this.paper.rect(centerx, centery, 200, 100).attr(attr);
            this.pushElement(shape, x, y);
            break;
        case "belief":
            shape = this.paper.ellipse(x, y, 100, 50).attr(attr);
            this.pushElement(shape, x, y);
            break;
        }
    },
    moveText: function (ft) {
        var translate = "t"; // String that dictates the translation

        // Find the appropriate element
        for (var i = 0; i < CANVAS.element.length; i++) {
            if (CANVAS.element[i].ft === ft) {
                translate = translate.concat(
                        ft.attrs.translate.x.toString(), ",",
                        ft.attrs.translate.y.toString());
                CANVAS.element[i].text.transform(translate);
                return;
            }
        }
    },
    drawBox: function() {
        var path;

        // Highlight if trying to connect
        if (PALETTE.current === "contribution" && CANVAS.src === null) {
            this.attr({fill: "#ffff00"});
            CANVAS.src = this;
            path = "M ";
            path = path.concat(this.attrs.x.toString(), ",",
                               this.attrs.y.toString());
        }
    },
    pushElement: function (grlelement, x, y) {
        var textElement, // An encapsulation of text and an element
            text = this.paper.text(x, y, PALETTE.current).attr(
                {"font-size": "15px", "font-family": "Georgia"}),
            freeTransform = this.paper.freeTransform(grlelement,
                {rotate: false}, this.moveText);

        freeTransform.hideHandles();
        //grlelement.click(this.drawBox);
        textElement = {ft: freeTransform, text: text};
        this.element.push(textElement);
    },
    connect: function () {
        var src,
            dst;
    }
}
