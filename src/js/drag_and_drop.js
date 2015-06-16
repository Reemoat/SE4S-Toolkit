function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('dragme');
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
}

function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    var str = (parseInt(style.getPropertyValue("left"), 10) - event.clientX)
            + ',' + (parseInt(style.getPropertyValue("top"), 10)
            - event.clientY);
    event.dataTransfer.setData("text/plain", str);
}

function drag_over(event) {
    event.preventDefault();
    return false;
}

var dm = document.getElementById('dragme');
dm.addEventListener('dragstart', drag_start, false);
document.getElementById("div1").addEventListener('dragover', drag_over, false);
document.getElementById("div1").addEventListener('drop', drop, false);