var PALETTE = {
    current: SELECT,
    options: document.getElementsByClassName("option"),
    highlight: function () {
        // White out the background of every option
        for(i = 0; i < this.options.length; i++) {
            this.options[i].style.backgroundColor = "#FFFFFF";
        }

        event.target.style.backgroundColor = "#AAFFFF";
    },
    highlightElement: function() {
        CANVAS.disableTransform();
        CANVAS.makeUnlinkable();
        this.highlight();
    },
    highlightSelect: function () {
        this.current = SELECT;
        this.highlight();
        CANVAS.makeUnlinkable
        CANVAS.enableTransform();
    },
    highlightContribution: function () { 
        this.current = CONTRIBUTION_FACTORY;
        CANVAS.makeLinkable();
        CANVAS.disableTransform();
        this.highlight();
    },
    highlightSoftgoal: function () {
        this.current = SOFTGOAL_FACTORY;
        this.highlightElement();
    },
    highlightGoal: function () {
        this.current = GOAL_FACTORY;
        this.highlightElement();
    },
    highlightTask: function () {
        this.current = TASK_FACTORY;
        this.highlightElement();
    },
    highlightResource: function () {
        this.current = RESOURCE_FACTORY;
        this.highlightElement();
    },
    highlightBelief: function () {
        this.current = BELIEF_FACTORY;
        this.highlightElement();
    }
}
