var EXPORTER = {
    exportXml: function () {
        var svgString = CANVAS.paper.toSVG(), // The svg generated by Raphael
            a = document.createElement('a'), // The resulting file
            blob; // A variable for the blob API

        a.download = 'goals.svg';
        a.type = 'image/svg+xml';
        blob = new Blob([svgString], {"type": "image/svg+xml"});
        a.href = (window.URL || webkitURL).createObjectURL(blob);
        a.click();
    },
    exportPng: function () {
        var svgString = CANVAS.paper.toSVG(), // The svg generated by Raphael
            dataURL, // The image data
            myCanvas, // An intermediate canvas object
            a = document.createElement('a'); // The file

        canvg('myCanvas', svgString); // Bind the svg to the canvas
        myCanvas = document.getElementById("myCanvas");
        dataURL = myCanvas.toDataURL("image/png"); // Turn the canvas to .png
        a.download = 'goals.png';
        a.type = 'image/png';
        a.href = dataURL;
        a.click();
    },
    exportPdf: function () {
        /*var svgString = CANVAS.paper.toSVG(), // The svg generated by Raphael
            a = document.createElement('a'), // The resulting file
            blob; // A variable for the blob API

        a.download = 'goals.pdf';
        a.type = 'application/pdf';
        blob = new Blob([svgString], {type: "application/pdf"});
        a.href = (window.URL || webkitURL).createObjectURL(blob);
        a.click();*/
    }
}
