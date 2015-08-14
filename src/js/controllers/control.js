var CONTROL = {    
    /**
     * Allow the user to drag and scale canvas elements
     */
    enableTransform: function () {
        // Make every element transformable
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.showHandles();
        }
    },
        
    /**
     * Prevent the user from dragging and scaling canvas elements
     */
    disableTransform: function () {
        // Make every element nontransformable
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.hideHandles();
        }
    },
    
    /**
     * Allow the user to draw connections between elements
     */
    makeSegmentable: function () {
        // Make every element able to generate a segment
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.subject.click(this.drawSegment);
        }
    },
    
    /**
     * Disallow the user from drawing connections
     */
    makeUnsegmentable: function () {
        // Make every element unable to generate a new segment
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.subject.unclick(this.drawSegment);
        }
    },
    
    /**
     * Allow the user to draw connections between elements
     */
    makeConnectable: function () {
        // Make every element connectable
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.subject.click(this.drawConnection);
        }
    },
    
    /**
     * Disallow the user from drawing connections between elements
     */
    makeUnconnectable: function () {
        // Make every element unconnectable
        for (var i = 0; i < CANVAS.element.length; i++) {
            CANVAS.element[i].ft.subject.unclick(this.drawConnection);
        }
    },
    
    /**
     * This function makes the text move with its corresponding element
     */
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
    
    /**
     * Handler for when a user clicks on text to edit it
     */
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
    
    /**
     * Find the nearest x-coordinate to x on shape 
     */
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
    
    /**
     * Find the nearest y-coordinate to y on shape 
     */
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
    
    /**
     * Connect a source and destination element with the link of the type
     * highlighted in the palette
     */
    connect: function (dst) {
        var x1,          // The src's connection pt
            y1,          // The src's connection pt
            x2,          // The dst's connection pt
            y2,          // The dst's connection pt
            path = "M "; // The path string

        // Check if the shapes have overlapping horizontalcoordinates
        if (SEGMENT.source.x > dst.x && SEGMENT.source.x < dst.x2
                || SEGMENT.source.x2 > dst.x
                && SEGMENT.source.x2 < dst.x2) {
            x1 = (Math.max(SEGMENT.source.x, dst.x)
                    + Math.min(SEGMENT.source.x2, dst.x2)) / 2;
        } else if (SEGMENT.source.x2 < dst.x) { // src is left of dst
            x1 = SEGMENT.source.x2;
        } else { // src is right of dst
            x1 = SEGMENT.source.x;
        }

        // Check if the shapes have overlapping vertical coordinates
        if (SEGMENT.source.y > dst.y && SEGMENT.source.y < dst.y2
                || SEGMENT.source.y2 > dst.y
                && SEGMENT.source.y2 < dst.y2) {
            y1 = (Math.max(SEGMENT.source.y, dst.y)
                    + Math.min(SEGMENT.source.y2, dst.y2)) / 2;
        } else if (SEGMENT.source.y2 < dst.y) { // src is above dst
            y1 = SEGMENT.source.y2;
        } else { // src is below dst
            y1 = SEGMENT.source.y;
        }

        x2 = this.getNearestX(x1, dst);
        y2 = this.getNearestY(y1, dst);

        path = path.concat(x1.toString(), ",", y1.toString(), " ",
                           x2.toString(), ",", y2.toString());
        PALETTE.current.makeLink(path, x1, y1, x2, y2);
    },
    
    /**
     * Remove the old segment and draw a new one
     */
    moveSegment: function () {
        SEGMENT.path.remove();
        SEGMENT.makeSegment();
    },
    
    /**
     * Handler for clicking an element while the palette has a link highlighted,
     * and the user has yet to select a source
     */
    drawSegment: function () {
            SEGMENT.source = this.getBBox();
            SEGMENT.makeSegment();
            CANVAS.overlay.mousemove(CONTROL.moveSegment);
            CONTROL.makeUnsegmentable();
            CONTROL.makeConnectable();
    },
        
    /**
     * Draw the connection from source to destination, and reset the segment
     */
    drawConnection: function () {
        CONTROL.connect(this.getBBox());
        SEGMENT.path.remove();
        SEGMENT.path = null;
        SEGMENT.source = null;
        CANVAS.overlay.unmousemove(CANVAS.moveSegment);
        CONTROL.makeUnconnectable();
        CONTROL.makeSegmentable();
    }
}