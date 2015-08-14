var CANVAS = {
    element: [],   // An array of objects that bind shapes and text together
    overlay: null, // Rectangle placed on top of PAPER for handling mouse moves
    
    /**
     * Prepare the canvas for Raphael drawing
     */
    makeCanvas: function () {
        PAPER = Raphael(document.getElementById("canvas"));
        PAPER.setSize("100%", "100%");
        this.overlay = PAPER.rect(0, 0, PAPER.width, PAPER.height).attr(
            {fill: "#ffffff"});
    },
    
    /**
     * Add an element to the canvas with text and transform capability
     */
    pushElement: function (grlelement, x, y, str) {
        var textElement, // An encapsulation of text and an element
            text = PAPER.text(x, y, str).attr(
                {font: "15px Georgia", "font-family": "Georgia", "font-size":
                 "15px"}), // Need both font and family/size for exporting
            freeTransform = PAPER.freeTransform(grlelement,
                {rotate: false}, CONTROL.moveText);

        PAPER.inlineTextEditing(text);
        text.click(CONTROL.editText);
        freeTransform.hideHandles();
        textElement = {ft: freeTransform, text: text};
        this.element.push(textElement);
    },
}

window.onload = CANVAS.makeCanvas();