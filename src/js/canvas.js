var CANVAS = {
    paper: null, // The Raphael canvas
    overlay: null, // A rectangle placed on top of the canvas for functionality
    element: [], // An array that records the grl elements on the canvas
    connection: [], // A collection of the canvas' connections
    src: null, // The source of an impending connection
    dst: null, // The destination of an impending connection
    segment: null, // The segment from the source when making a link
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
        this.overlay = this.paper.rect(0, 0, this.paper.width,
                this.paper.height).attr({fill: "#ffffff"});
    },
    makeLinkable: function () {
        // Make every element nontransformable
        for (var i = 0; i < this.element.length; i++) {
            textElement = this.element[i].ft.subject.click(this.drawLink);
        }
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
            this.makeLinkable();
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
    makeSegment: function () {
        var path = "M "; // Path from the source to the mouse
            x = event.clientX, // x-coordinate of the mouse
            y = event.clientY; // y-coordinate of the mouse

        path = path.concat(this.src.x.toString(), ",", this.src.y.toString(),
                           " ", x.toString(), ",", y.toString());
        this.segment = this.paper.path(path);
    },
    moveSegment: function () {
        CANVAS.segment.remove();
        CANVAS.makeSegment();
    },
    drawLink: function () {
        // Check that a source has not already been established
        if (PALETTE.current === "contribution" && CANVAS.src === null) {
            CANVAS.src = this.getBBox();
            CANVAS.makeSegment();
            CANVAS.overlay.mousemove(CANVAS.moveSegment);
        }
    },
    editText: function () {
        var text = this;
        var input = this.inlineTextEditing.startEditing();

        input.addEventListener("blur", function (e) {
            text.inlineTextEditing.stopEditing();
        }, true);
        var str = text.attrs.text;
        var strarray = str.split("\n");
        //var chars = Math.max(strarray);
        //console.log(text.attrs["font-size"]);
    },
    pushElement: function (grlelement, x, y) {
        var textElement, // An encapsulation of text and an element
            text = this.paper.text(x, y, PALETTE.current).attr(
                {font: "15px Georgia"}),
            freeTransform = this.paper.freeTransform(grlelement,
                {rotate: false}, this.moveText);

        CANVAS.paper.inlineTextEditing(text);
        text.click(this.editText);
        freeTransform.hideHandles();
        //grlelement.click(this.drawLink);
        textElement = {ft: freeTransform, text: text};
        this.element.push(textElement);
    },
    exportXml: function () {
        var svgString = CANVAS.paper.toSVG(), // The svg generated by Raphael
            a = document.createElement('a'),
            blob; // A variable for the blob API

        a.download = 'model.svg';
        a.type = 'image/svg+xml';
        blob = new Blob([svgString], {"type": "image/svg+xml"});
        a.href = (window.URL || webkitURL).createObjectURL(blob);
        a.click();
    },
    exportImage: function () {
        var svgString = CANVAS.paper.toSVG(); // The svg generated by Raphael
        var dataURL;
        var myCanvas;
        var a = document.createElement('a');

        canvg('myCanvas', svgString);
        myCanvas = document.getElementById("myCanvas");
        dataURL = myCanvas.toDataURL("image/png");
        //document.getElementById("export").src = dataURL;
        a.download = 'goals.png';
        a.type = 'image/png';
        a.href = dataURL;
        a.click();
    }
}
