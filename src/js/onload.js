// This function initializes the raphael canvas and its overlay
window.onload = function () {
    PAPER = Raphael(document.getElementById("canvas"));
    PAPER.setSize("100%", "100%");
    CANVAS_CONTROL.overlay = PAPER.rect(0, 0, PAPER.width, PAPER.height).attr(
                             {fill: "#ffffff"});
}
