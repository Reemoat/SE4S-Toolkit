$(function() {
    $( "#element" ).draggable();
});

$(function() {
    $( "#element" ).resizable();
});

function highlight() {
    var options = document.getElementsByClassName("option");

    for(i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#FFFFFF";
    }

   event.target.style.backgroundColor = "#AAFFFF";
}

/*$(function () {
    // Creates canvas 320 x 200 at 10, 50
    var paper = Raphael(10, 50, 320, 200);
    //paper.resizable();

    // Creates circle at x = 50, y = 40, with radius 10
    var circle = paper.circle(50, 40, 10);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");

    // Sets the stroke attribute of the circle to white
    circle.attr("stroke", "#fff");
});*/
