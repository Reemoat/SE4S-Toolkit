var PALETTE = {
    current: "select",
    options: document.getElementsByClassName("option"),
    highlight: function () {
        // White out the background of every option
        for(i = 0; i < this.options.length; i++) {
            this.options[i].style.backgroundColor = "#FFFFFF";
        }

        event.target.style.backgroundColor = "#AAFFFF";
        this.current = event.target.id;

        // Make the shapes transformable if select is highlighted
        if (this.current === "select") {
            CANVAS.enableTransform();
        } else {
            CANVAS.disableTransform();
        }
    }
}