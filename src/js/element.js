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

        // Make the shapes transformable if select is highlighted
        if (this.current == "select") {
            canvas.enableTransform();
        } else {
            canvas.disableTransform();
        }
    }
}

var canvas = {
    paper: null,
    element: [],
    enableTransform: function() {
        // Make every element transformable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].showHandles();
        }
    },
    disableTransform : function() {
        // Make every element nontransformable
        for (var i = 0; i < this.element.length; i++) {
            this.element[i].hideHandles();
        }
    },
    makeCanvas: function() {
        var container = document.getElementById("canvas");

        this.paper = Raphael(container);
        this.paper.setSize("100%", "100%");
    },
    canvasClick: function() {
        var x = event.clientX;
        var y = event.clientY;
        var attr = {"stroke-width": 3, fill: "#ffffff"};

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
              var softgoal;
              var drawnSoftgoal;
              var m = "M ";
              var curves = " c 0,108 -47,43 -100,39 -47,0 -100,65 -100,-39 0,-108 47,-43 100,-43 47,0 100,-65, 100,43";

              x += 100; // Center the pointer
              drawnSoftgoal = m.concat(x.toString(), ",", y.toString(), curves);
              softgoal = this.paper.path(drawnSoftgoal).attr(attr);
              this.pushElement(softgoal);
              break;
            case "goal":
              var goal;

              x -= 100; // Center the pointer
              y -= 50;
              goal = this.paper.rect(x, y, 200, 100, 20).attr(attr);
              this.pushElement(goal);
              break;
            case "task":
              var task;
              var drawnTask;
              var m = "m ";
              var moves = " 28,-57 143,0 28,57 -28,57, -143,0 z"; 

              x -= 100; // Center the pointer
              drawnTask = m.concat(x.toString(), ",",  y.toString(), moves);
              task = this.paper.path(drawnTask).attr(attr);
 
              this.pushElement(task);
              break;
            case "resource":
              var resource;

              x -= 100; // Horizontally center the pointer
              y -= 50;  // Vertically center the pointer
              resource = this.paper.rect(x, y, 200, 100).attr(attr);
              this.pushElement(resource);
              break;
            case "belief":
              var belief = this.paper.ellipse(x, y, 100, 50).attr(attr);

              this.pushElement(belief);
              break;
        }
    },
    pushElement: function(element) {
        var freeTransform = this.paper.freeTransform(element);

        freeTransform.hideHandles();
        this.element.push(freeTransform);
    }
}
