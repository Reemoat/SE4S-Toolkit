// This object thiss most of the program's flow
var CANVAS_CONTROL = {
    element: [],   // An array of objects that bind shapes and text together
    overlay: null, // Rectangle placed on top of PAPER for handling mouse moves
    source: null, // The source element of the segment
    
    /**
     * Prepare the text for raphael and editing
     */
    prepareText: function(str, x, y, id) {
        // Both font and font-family are necessary for the export library
        var text = PAPER.text(x, y, str).attr({font: "15px Georgia",
                   "font-family": "Georgia", "font-size": "15px"});

        PAPER.inlineTextEditing(text);
        text.click(this.editText);
        return text;
    },
    
    /**
     * Allow the user to drag and scale the elements
     */
    enableTransform: function () {
        // Make every element transformable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].showHandles();
        }
    },
        
    /**
     * Prevent the user from dragging and scaling the elements
     */
    disableTransform: function () {
        // Make every element nontransformable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].hideHandles();
        }
    },
    
    /**
     * Allow the user to draw connections between elements
     */
    makeSegmentable: function () {
        // Make every element able to generate a segment
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].subject.click(this.drawSegment);
        }
    },
    
    /**
     * Disallow the user from drawing connections
     */
    makeUnsegmentable: function () {
        // Make every element unable to generate a new segment
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].subject.unclick(this.drawSegment);
        }
    },
    
    /**
     * Allow the user to draw connections between elements
     */
    makeConnectable: function () {
        // Make every element connectable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].subject.click(this.drawConnection);
        }
    },
    
    /**
     * Disallow the user from drawing connections between elements
     */
    makeUnconnectable: function () {
        // Make every element unconnectable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].subject.unclick(this.drawConnection);
        }
    },
    
    /**
     * This function makes the text move with its corresponding element
     */
    moveText: function () {
        var translate = "t"; // String that dictates the translation

        translate = translate.concat(this.attrs.translate.x.toString(), ",",
                                     this.attrs.translate.y.toString());
        this.text.transform(translate);
    },
    
    /**
     * Handler for when a user clicks on text to edit it
     */
    editText: function () {
        var text = this;
        var input = text.inlineTextEditing.startEditing();

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
        if (this.source.x > dst.x && this.source.x < dst.x2
                || this.source.x2 > dst.x && this.source.x2 < dst.x2) {
            x1 = (Math.max(this.source.x, dst.x)
                 + Math.min(this.source.x2, dst.x2)) / 2;
        } else if (this.source.x2 < dst.x) { // src is left of dst
            x1 = this.source.x2;
        } else { // src is right of dst
            x1 = this.source.x;
        }

        // Check if the shapes have overlapping vertical coordinates
        if (this.source.y > dst.y && this.source.y < dst.y2
                || this.source.y2 > dst.y && this.source.y2 < dst.y2) {
            y1 = (Math.max(this.source.y, dst.y)
                    + Math.min(this.source.y2, dst.y2)) / 2;
        } else if (this.source.y2 < dst.y) { // src is above dst
            y1 = this.source.y2;
        } else { // src is below dst
            y1 = this.source.y;
        }

        x2 = this.getNearestX(x1, dst);
        y2 = this.getNearestY(y1, dst);

        path = path.concat(x1.toString(), ",", y1.toString(), " ",
                           x2.toString(), ",", y2.toString());
        PALETTE_CONTROL.currentSelection.makeLink(path, x1, y1, x2, y2);
    },
            
    /**
     * Draw a line from the source element of a click
     */
    makeSegment: function () {
        var path = "M ",       // Path from the source to the mouse
            x = event.clientX, // x-coordinate of the mouse
            y = event.clientY, // y-coordinate of the mouse
            x2 = this.getNearestX(x, this.source), // x-coord on src
            y2 = this.getNearestY(y, this.source); // y-coord on src

        path = path.concat(x2.toString(), ",", y2.toString(), " ", x.toString(),
                           ",", y.toString());
        this.source.path = PAPER.path(path);
    },
    
    /**
     * Remove the old segment and draw a new one
     */
    moveSegment: function () {
        CANVAS_CONTROL.source.path.remove();
        CANVAS_CONTROL.makeSegment();
    },
    
    /**
     * Handler for clicking an element while the palette has a link highlighted,
     * and the user has yet to select a source
     */
    drawSegment: function () {
        CANVAS_CONTROL.source = this.getBBox();
        CANVAS_CONTROL.makeSegment();
        CANVAS_CONTROL.overlay.mousemove(CANVAS_CONTROL.moveSegment);
        CANVAS_CONTROL.makeUnsegmentable();
        CANVAS_CONTROL.makeConnectable();
    },
        
    /**
     * Draw the connection from source to destination, and reset the segment
     */
    drawConnection: function () {
        CANVAS_CONTROL.connect(this.getBBox());
        CANVAS_CONTROL.source.path.remove();
        CANVAS_CONTROL.source = null;
        CANVAS_CONTROL.overlay.unmousemove(CANVAS_CONTROL.moveSegment);
        CANVAS_CONTROL.makeUnconnectable();
        CANVAS_CONTROL.makeSegmentable();
    },
    
    /**
     * Add an element to the canvas with text and transform capability
     */
    pushElement: function (grlElement, x, y, str) {
        var freeTransform = PAPER.freeTransform(grlElement, {rotate: false},
                                                this.moveText).hideHandles();
        
        freeTransform.text = this.prepareText(str, x ,y);
        this.element.push(freeTransform);
    }
}
