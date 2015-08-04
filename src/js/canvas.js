var CANVAS = {
    paper: null, // The Raphael canvas
    overlay: null, // A rectangle placed on top of the canvas for functionality
    element: [], // An array that records the grl elements on the canvas
    connection: [], // A collection of the canvas' connections
    src: null, // The source of an impending connection
    segment: null, // The segment from the source when making a link
    makeCanvas: function () {
        var container = document.getElementById("canvas");

        this.paper = Raphael(container);
        this.paper.setSize("100%", "100%");
        this.overlay = this.paper.rect(0, 0, this.paper.width,
                this.paper.height).attr({fill: "#ffffff"});
    },
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
    makeLinkable: function () {
        // Make every element linkable
        for (var i = 0; i < this.element.length; i++) {
            textElement = this.element[i].ft.subject.click(this.drawLink);
        }
    },
    makeUnlinkable: function () {
        // Make every element unlinkable
        for (var i = 0; i < this.element.length; i++) {
            textElement = this.element[i].ft.subject.unclick(this.drawLink);
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
    getNearestX: function (x, shape) {
        // Find the closest coordinate
        if (x <= shape.x) {
            return shape.x;
        } else if (x <= shape.x2) {
            return x;
        } else {
            return shape.x2;
        }
    },
    getNearestY: function (y, shape) {
        // Find the closest coordinate
        if (y <= shape.y) {
            return shape.y;
        } else if (y <= shape.y2) {
            return y;
        } else {
            return shape.y2;
        }
    },
    makeSegment: function () {
        var path = "M ", // Path from the source to the mouse
            x = event.clientX, // x-coordinate of the mouse
            y = event.clientY, // y-coordinate of the mouse
            x2 = this.getNearestX(x, this.src), // x-coordinate of the other end
            y2 = this.getNearestY(y, this.src); // y-coordinate of the other end

        path = path.concat(x2.toString(), ",", y2.toString(), " ", x.toString(),
                           ",", y.toString());
        this.segment = this.paper.path(path);
    },
    moveSegment: function () {
        CANVAS.segment.remove();
        CANVAS.makeSegment();
    },
    connect: function (dst) {
        var x1, // The src's connection pt
            y1, // The src's connection pt
            x2, // The dst's connection pt
            y2, // The dst's connection pt
            path = "M "; // The path string

        // Check if the shapes have overlapping horizontalcoordinates
        if (this.src.x > dst.x && this.src.x < dst.x2
            || this.src.x2 > dst.x && this.src.x2 < dst.x2) {
            x1 = (Math.max(this.src.x, dst.x) + Math.min(this.src.x2, dst.x2))
                 / 2;
        } else if (this.src.x2 < dst.x) { // src is left of dst
            x1 = this.src.x2;
        } else { // src is right of dst
            x1 = this.src.x;
        }

        // Check if the shapes have overlapping vertical coordinates
        if (this.src.y > dst.y && this.src.y < dst.y2
            || this.src.y2 > dst.y && this.src.y2 < dst.y2) {
            y1 = (Math.max(this.src.y, dst.y) + Math.min(this.src.y2, dst.y2))
                 / 2;
        } else if (this.src.y2 < dst.y) { // src is above dst
            y1 = this.src.y2;
        } else { // src is below dst
            y1 = this.src.y;
        }

        x2 = this.getNearestX(x1, dst);
        y2 = this.getNearestY(y1, dst);

        path = path.concat(x1.toString(), ",", y1.toString(), " ",
                           x2.toString(), ",", y2.toString());
        PALETTE.current.makeLink(path, x1, y1, x2, y2);
    },
    drawLink: function () {
        // Check that a source has not already been established
        if ((PALETTE.current === DECOMPOSITION_FACTORY || PALETTE.current
             === CONTRIBUTION_FACTORY || PALETTE.current
             === DEPENDENCY_FACTORY || PALETTE.current === BELIEF_LINK_FACTORY) 
             && CANVAS.src === null) {
            CANVAS.src = this.getBBox();
            CANVAS.makeSegment();
            CANVAS.overlay.mousemove(CANVAS.moveSegment);
        } else if (CANVAS.src != null && CANVAS.src != this.getBBox()) {
            CANVAS.connect(this.getBBox());
            CANVAS.src = null;
            CANVAS.segment.remove();
            CANVAS.overlay.unmousemove(CANVAS.moveSegment);
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
    pushElement: function (grlelement, x, y, str) {
        var textElement, // An encapsulation of text and an element
            // Need both font and font-family/font-size for proper export
            text = this.paper.text(x, y, str).attr(
                {font: "15px Georgia", "font-family": "Georgia", "font-size":
                 "15px"}),
            freeTransform = this.paper.freeTransform(grlelement,
                {rotate: false}, this.moveText);

        CANVAS.paper.inlineTextEditing(text);
        text.click(this.editText);
        freeTransform.hideHandles();
        textElement = {ft: freeTransform, text: text};
        this.element.push(textElement);
    },
}
