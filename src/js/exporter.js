// This object controls the exporting of the goal model to various formats
var EXPORTER = {
    /**
     * Export the goal model to XML
     */
    exportXml: function () {
        var a = document.createElement('a'); // The resulting file

        a.download = 'goals.svg';
        a.type = 'image/svg+xml';
        a.href = (window.URL || webkitURL).createObjectURL(new Blob(
            [PAPER.toSVG()], {type: "image/svg+xml"}));
        a.click();
    },

    /**
     * Export the goal model to PNG
     */
    exportPng: function () {
        var a = document.createElement('a'); // The file

        canvg('myCanvas', PAPER.toSVG()); // Bind the svg to the canvas
        a.download = 'goals.png';
        a.type = 'image/png';
        a.href = document.getElementById("myCanvas").toDataURL("image/png");
        a.click();
    },

    /**
     * Export the goal model to JPG
     */
    exportJpg: function () {
        var a = document.createElement('a'); // The file

        canvg('myCanvas', PAPER.toSVG()); // Bind the svg to the canvas
        a.download = "goals.jpg";
        a.type = "image/pjpeg";
        a.href = document.getElementById("myCanvas").toDataURL("image/pjpeg");
        a.click();
    },

    /**
     * Export the goal model to GIF
     */
    exportGif: function () {
        var a = document.createElement('a'); // The file

        canvg('myCanvas', PAPER.toSVG()); // Bind the svg to the canvas
        a.download = "goals.gif";
        a.type = "image/gif";
        a.href = document.getElementById("myCanvas").toDataURL("image/gif");
        a.click();
    }
}
