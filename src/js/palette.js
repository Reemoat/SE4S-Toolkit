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
    highlightSelect: function () {
        this.current = SELECT;
        this.highlight();
        CANVAS.makeUnlinkable
        CANVAS.enableTransform();
    },
    highlightLink: function () {
        // Only make linkable if not already linkable
        if (this.current != DECOMPOSITION_FACTORY && this.current
                != CONTRIBUTION_FACTORY && this.current != DEPENDENCY_FACTORY
                && this.current != BELIEF_LINK_FACTORY) {
            CANVAS.makeLinkable();
        }

        CANVAS.disableTransform();
        this.highlight();
    },
    highlightDecomposition: function () {
        this.highlightLink();
        this.current = DECOMPOSITION_FACTORY;
    },
    highlightContribution: function () { 
        this.highlightLink();
        this.current = CONTRIBUTION_FACTORY;
    },
    highlightDependency: function () { 
        this.highlightLink();
        this.current = DEPENDENCY_FACTORY;
    },
    highlightBeliefLink: function () { 
        this.highlightLink();
        this.current = BELIEF_LINK_FACTORY;
    },
    highlightElement: function() {
        CANVAS.disableTransform();
        CANVAS.makeUnlinkable();
        this.highlight();
    },
    highlightSoftgoal: function () {
        this.highlightElement();
        this.current = SOFTGOAL_FACTORY;
    },
    highlightGoal: function () {
        this.highlightElement();
        this.current = GOAL_FACTORY;
    },
    highlightTask: function () {
        this.highlightElement();
        this.current = TASK_FACTORY;
    },
    highlightResource: function () {
        this.highlightElement();
        this.current = RESOURCE_FACTORY;
    },
    highlightBelief: function () {
        this.highlightElement();
        this.current = BELIEF_FACTORY;
    }
}
