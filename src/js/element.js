var palette = {
    current: "select",
    options: document.getElementsByClassName("option"),
    highlight: function() {
        // White out the background of every option
        for(i = 0; i < this.options.length; i++) {
            this.options[i].style.backgroundColor = "#FFFFFF";
        }

       event.target.style.backgroundColor = "#AAFFFF";
       this.current = event.target.id;
    }
}

var canvas = {
    paper: null,
    makeCanvas: function() {
        var container = document.getElementById("canvas");
        this.paper = Raphael(container, 1024, 720);
    },
    canvasClick: function() {
        var x = event.clientX;
        var y = event.clientY;

        // Check for the current palette selection
        switch(palette.current) {
            case "select":
              break;
            case "comment":
              break;
            case "decomposition":
              break;
            case "contribution":
              break;
            case "dependency":
              break;
            case "belief_link":
              break;
            case "actor":
              break;
            case "softgoal":
              break;
            case "goal":
              goal = this.paper.rect(x, y, 100, 100);
              //this.paper.freeTransform(goal);
              break;
            case "task":
              break;
            case "resource":
              break;
            case "belief":
              break;
        }
    }
}
