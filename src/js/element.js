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
        this.paper = Raphael(container, 1024, 720);
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
              var softGoal = this.paper.path(
                      "m 292.42625,108.03112 c 0,139.29317 -61.44177,54.97922 -129.24678,52.38302 C 103.33749,158.12283 34.751234,255.76386 34.426785,116.47162 34.102323,-22.820596 87.54865,67.976128 175.65107,67.206668 263.75344,66.437233 291.77302,-31.240699 292.4219,108.0487")
                      .attr(attr);
              var ft = this.paper.freeTransform(softGoal);
              ft.hideHandles();
              this.element.push(ft);
              break;
            case "goal":
              var goal = this.paper.rect(x, y, 200, 100, 20).attr(attr);
              var ft = this.paper.freeTransform(goal);
              ft.hideHandles();
              this.element.push(ft);
              break;
            case "task":
              var task = this.paper.path(
                      "m 160.49646,324.24178 39.50504,-90.20654 202.64622,1e-5 49.01551,80.28382 -50.47866,86.59827 -193.86732,-0.90206 z")
                      .attr(attr);
              var ft = this.paper.freeTransform(task);
              ft.hideHandles();
              this.element.push(ft);
              break;
            case "resource":
              var resource = this.paper.rect(x, y, 200, 100).attr(attr);
              var ft = this.paper.freeTransform(resource);
              ft.hideHandles();
              this.element.push(ft);
              break;
            case "belief":
              var belief = this.paper.ellipse(x, y, 100, 50).attr(attr);
              var ft = this.paper.freeTransform(belief);
              ft.hideHandles();
              this.element.push(ft);
              break;
        }
    }
}
