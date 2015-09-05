// This object saves the model to the database
var SAVER = {
    // Save the model
    save: function () {
        var xmlhttp = new XMLHttpRequest(); // This object sends http requests
        var box;                            // An element's containing box
        var text;                           // An element's text object
        var canvas = document.getElementById("canvas"); // The html canvas

        // Save the canvas
        xmlhttp.open("GET", "database_toolkit/insert_canvas.php?width="
            + canvas.offsetWidth + "&height=" + canvas.offsetHeight, true);
        xmlhttp.send();

        // Send every element to the database
        for (var i = 0; i < CANVAS_CONTROL.element.length; i++) {
            xmlhttp = new XMLHttpRequest();
            box = CANVAS_CONTROL.element[i].subject.getBBox();
            text = CANVAS_CONTROL.element[i].text;
            xmlhttp.open("GET", 'database_toolkit/insert_element.php?type="'
                + CANVAS_CONTROL.element[i].type + '"&x=' + box.x + "&y="
                + box.y + "&x2=" + box.x2 + "&y2=" + box.y2, true);
            xmlhttp.send();
        }
    }
}
