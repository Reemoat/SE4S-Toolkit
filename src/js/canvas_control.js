// This object thiss most of the program's flow
var CANVAS_CONTROL = {
    widthFactor: 7 / 25, // Adjusts textbox widths
    heightFactor: 1 / 5, // Adjusts textbox heights
    element: [],    // An array of objects that bind shapes and text together
    overlay: null,  // Rectangle placed on top of PAPER for handling mouse moves
    source: null,   // The source element of the segment
    connection: [], // The graph's connections
    
    /**
     * Prepare the text for raphael and editing
     */
    prepareText: function(str, x, y) {
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
    moveText: function(freeTransform) {
        var translate = "t"; // String that dictates the translation

        translate = translate.concat(freeTransform.attrs.translate.x.toString(),
            ",", freeTransform.attrs.translate.y.toString());
        freeTransform.text.transform(translate);
    },

    /**
     * This function adjusts connections when an element moves
     */
    reconnect: function(element) {
        // Locate any connection that has the moving shape
        for (var i = 0; i < CANVAS_CONTROL.connection.length; i++) {
            // If the connection has the moving element as a source, reconnect
            if (CANVAS_CONTROL.connection[i].source === element) {
                CANVAS_CONTROL.connection[i].element[0].remove();
                CANVAS_CONTROL.connection[i].element[1].remove();
                CANVAS_CONTROL.source = element;
                CANVAS_CONTROL.connect(
                    CANVAS_CONTROL.connection[i].destination, i);
                CANVAS_CONTROL.source = null;
            }

            // If connection has the moving element as a destination, reconnect
            if (CANVAS_CONTROL.connection[i].destination === element) {
                CANVAS_CONTROL.connection[i].element[0].remove();
                CANVAS_CONTROL.connection[i].element[1].remove();
                CANVAS_CONTROL.source = CANVAS_CONTROL.connection[i].source;
                CANVAS_CONTROL.connect(element, i);
                CANVAS_CONTROL.source = null;
            }
        }
    },

    /**
     * This function moves an element's text and adjusts its connections
     */
    moveTextAndReconnect: function () {
        CANVAS_CONTROL.moveText(this);
        CANVAS_CONTROL.reconnect(this.subject);
    },

    /**
     * This function returns the length of the longest string in an array
     */
    getLongestLength: function(array) {
        var longest = 0; // The length of the longest string

        // Loop through every member of the array
        for (var i = 0; i < array.length; i++) {
            // If the current string's length exceeds longest, then record it
            if (array[i].length > longest) {
                longest = array[i].length;
            }
        }

        return longest;
    },

    /**
     * The function returns the parent element of a text object
     */
    getParent: function(child) {
        // Loop through the element's until a match is found
        for (var i = 0; i < this.element.length; i++) {
            // If the text element matches the child, then parent is found
            if (this.element[i].text === child) {
                return this.element[i];
            }
        }
    },
    
    /**
     * Handler for when a user clicks on text to edit it
     */
    editText: function () {
        var text = this, // Needed for call to stopEditing()
            input = text.inlineTextEditing.startEditing(), // Edit object
            textBox,       // The text's containing box
            freeTransform, // the text's corresponding freeTransform object
            elementBox;    // The bounding box of the text's element

        input.addEventListener("blur", function (e) {
            text.inlineTextEditing.stopEditing();
            textBox = text.getBBox(); // The text's containing box
            freeTransform = CANVAS_CONTROL.getParent(text); // the text's ft
            elementBox = freeTransform.subject.getBBox();

            // If the text's width exceeds the shape's width, then expand
            if (textBox.width >= elementBox.width - elementBox.width
                    * CANVAS_CONTROL.widthFactor) {
                freeTransform.attrs.scale.x = textBox.width
                                              / freeTransform.textWidth + 0.1;
                freeTransform.apply()
                freeTransform.updateHandles();
            }

            // If the text's height exceeds the shape's height, then expand
            if (textBox.height >= elementBox.height - elementBox.height
                    * CANVAS_CONTROL.heightFactor) {
                freeTransform.attrs.scale.y = textBox.height
                                              / freeTransform.textHeight + 0.1;
                freeTransform.apply()
                freeTransform.updateHandles();
            }
        }, true);
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
     * Check if the coordindates of two shapes overlap along the x or y-axis
     */
    overlap: function (box1, box2) {
        return box1.x > box2.x && box1.x < box2.x2 || box1.x2 > box2.x
               && box1.x2 < box2.x2;
    },
    
    /**
     * Connect a source and destination element with the link of the type
     * highlighted in the palette
     */
    connect: function(dst, id) {
        var x1,                             // The src's connection pt
            y1,                             // The src's connection pt
            x2,                             // The dst's connection pt
            y2,                             // The dst's connection pt
            srcBox = this.source.getBBox(), // The source's bounding box
            dstBox = dst.getBBox(),         // The destination's bounding box
            path = "M ",                    // The path string
            link;                           // The finished connection

        // Check if the shapes have overlapping horizontal coordinates
        if (this.overlap(srcBox, dstBox)) {
            x1 = (Math.max(srcBox.x, dstBox.x)
                + Math.min(srcBox.x2, dstBox.x2)) / 2;
        } else if (srcBox.x2 < dstBox.x) { // src is left of dst
            x1 = srcBox.x2;
        } else { // src is right of dst
            x1 = srcBox.x;
        }

        // Check if the shapes have overlapping vertical coordinates
        if (srcBox.y > dstBox.y && srcBox.y < dstBox.y2 || srcBox.y2 > dstBox.y
                && srcBox.y2 < dstBox.y2) {
            y1 = (Math.max(srcBox.y, dstBox.y) + Math.min(srcBox.y2, dstBox.y2))
                / 2;
        } else if (srcBox.y2 < dstBox.y) { // src is above dst
            y1 = srcBox.y2;
        } else { // src is below dst
            y1 = srcBox.y;
        }

        x2 = this.getNearestX(x1, dstBox);
        y2 = this.getNearestY(y1, dstBox);

        path = path.concat(x1.toString(), ",", y1.toString(), " ",
                           x2.toString(), ",", y2.toString());

        // Check if the connection is new or not
        if (PALETTE_CONTROL.currentSelection === SELECT) {
            this.connection[id].element = this.connection[id].type.makeLink(
                path, x1, y1, x2, y2);
        } else {
            this.connection.push({source: this.source,
                destination: dst,
                type: PALETTE_CONTROL.currentSelection,
                element: PALETTE_CONTROL.currentSelection.makeLink(path, x1, y1,
                                                                   x2, y2)
            });
        }
    },
            
    /**
     * Draw a line from the source element of a click
     */
    makeSegment: function () {
        var path = "M ", // Path from the source to the mouse
            srcBox = this.source.getBBox(),        // The source's bounding box
            x = event.clientX,                     // x-coordinate of the mouse
            y = event.clientY,                     // y-coordinate of the mouse
            x2 = this.getNearestX(x, srcBox), // x-coord on src
            y2 = this.getNearestY(y, srcBox); // y-coord on src

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
        CANVAS_CONTROL.source = this;
        CANVAS_CONTROL.makeSegment();
        CANVAS_CONTROL.overlay.mousemove(CANVAS_CONTROL.moveSegment);
        CANVAS_CONTROL.makeUnsegmentable();
        CANVAS_CONTROL.makeConnectable();
    },
        
    /**
     * Draw the connection from source to destination, and reset the segment
     */
    drawConnection: function () {
        CANVAS_CONTROL.connect(this, CANVAS_CONTROL.connection.length);
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
                            this.moveTextAndReconnect).hideHandles(),
            box = grlElement.getBBox(); // Initial element's bounding box
        
        freeTransform.text = this.prepareText(str, x, y);
        freeTransform.type = str; // Store the element's type
        freeTransform.textWidth = box.width - box.width * this.widthFactor;
        freeTransform.textHeight = box.height - box.height * this.heightFactor;
        this.element.push(freeTransform);
    }
}
