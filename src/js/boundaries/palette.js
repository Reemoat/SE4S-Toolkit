var PALETTE = {
    current: SELECT, // The currently highlighted paeltte option
    options: document.getElementsByClassName("option"), // Palette options
    
    /**
     * Highlight the selected palette option
     */
    highlight: function () {
        // White out the background of every option
        for(i = 0; i < this.options.length; i++) {
            this.options[i].style.backgroundColor = "#FFFFFF";
        }

        event.target.style.backgroundColor = "#AAFFFF";
    },

    /**
     * Highlight Select and enable transformations
     */
    highlightSelect: function () {
        PALETTE.current = SELECT;
        this.highlight();
        CONTROL.makeUnsegmentable();
        CONTROL.enableTransform();
    },

    /**
     * Make the elements linkable and highlight
     */
    highlightLink: function () {
        // Only make linkable if not already linkable
        if (this.current != DECOMPOSITION_FACTORY && this.current
                != CONTRIBUTION_FACTORY && this.current != DEPENDENCY_FACTORY
                && this.current != BELIEF_LINK_FACTORY) {
            CONTROL.makeSegmentable();
        }

        CONTROL.disableTransform();
        this.highlight();
    },

    /**
     * Highlight decomposition and set it to current
     */
    highlightDecomposition: function () {
        this.highlightLink();
        this.current = DECOMPOSITION_FACTORY;
    },

    /**
     * Highlight contribution and set it to current
     */
    highlightContribution: function () { 
        this.highlightLink();
        this.current = CONTRIBUTION_FACTORY;
    },

    /**
     * Highlight dependency and set it to current
     */
    highlightDependency: function () { 
        this.highlightLink();
        this.current = DEPENDENCY_FACTORY;
    },

    /**
     * Highlight belief link and set it to current
     */
    highlightBeliefLink: function () { 
        this.highlightLink();
        this.current = BELIEF_LINK_FACTORY;
    },

    /**
     * Disable tranforms, make element unlinkable, and highlight clicked entry
     */
    highlightElement: function() {
        CONTROL.disableTransform();
        CONTROL.makeUnsegmentable();
        this.highlight();
    },

    /**
     * Highlight softgoal and set it to current
     */
    highlightSoftgoal: function () {
        this.highlightElement();
        this.current = SOFTGOAL_FACTORY;
    },

    /**
     * Highlight goal and set it to current
     */
    highlightGoal: function () {
        this.highlightElement();
        this.current = GOAL_FACTORY;
    },

    /**
     * Highlight task and set it to current
     */
    highlightTask: function () {
        this.highlightElement();
        this.current = TASK_FACTORY;
    },

    /**
     * Highlight resource and set it to current
     */
    highlightResource: function () {
        this.highlightElement();
        this.current = RESOURCE_FACTORY;
    },

    /**
     * Highlight belief and set it to current
     */
    highlightBelief: function () {
        this.highlightElement();
        this.current = BELIEF_FACTORY;
    }
}
