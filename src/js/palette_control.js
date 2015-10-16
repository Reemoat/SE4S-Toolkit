// A control object for the palette
var PALETTE_CONTROL = {
    currentSelection: SELECT, // The currently highlighted paeltte option
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
        this.currentSelection = SELECT;
        this.highlight();
        CANVAS_CONTROL.makeUnsegmentable();
        CANVAS_CONTROL.enableTransform();
    },

    /**
     * Check if the current palette selection has made the elements linkable
     */
    isLinkable: function () {
        return this.currentSelection === DECOMPOSITION_FACTORY
               || this.currentSelection === CONTRIBUTION_FACTORY
               || this.currentSelection === DEPENDENCY_FACTORY
               || this.currentSelection === BELIEF_LINK_FACTORY;
    },

    /**
     * Make the elements linkable and highlight
     */
    highlightLink: function () {
        // Only make linkable if not already linkable
        if (!this.isLinkable()) {
            CANVAS_CONTROL.makeSegmentable();
        }

        CANVAS_CONTROL.disableTransform();
        this.highlight();
    },

    /**
     * Highlight decomposition and set it to current
     */
    highlightDecomposition: function () {
        this.highlightLink();
        this.currentSelection = DECOMPOSITION_FACTORY;
    },

    /**
     * Highlight contribution and set it to current
     */
    highlightContribution: function () { 
        this.highlightLink();
        this.currentSelection = CONTRIBUTION_FACTORY;
    },

    /**
     * Highlight dependency and set it to current
     */
    highlightDependency: function () { 
        this.highlightLink();
        this.currentSelection = DEPENDENCY_FACTORY;
    },

    /**
     * Highlight belief link and set it to current
     */
    highlightBeliefLink: function () { 
        this.highlightLink();
        this.currentSelection = BELIEF_LINK_FACTORY;
    },

    /**
     * Disable tranforms, make element unlinkable, and highlight clicked entry
     */
    highlightElement: function() {
        CANVAS_CONTROL.disableTransform();
        CANVAS_CONTROL.makeUnsegmentable();
        this.highlight();
    },

    /**
     * Highlight softgoal and set it to current
     */
    highlightSoftgoal: function () {
        this.highlightElement();
        this.currentSelection = SOFTGOAL_FACTORY;
    },

    /**
     * Highlight goal and set it to current
     */
    highlightGoal: function () {
        this.highlightElement();
        this.currentSelection = GOAL_FACTORY;
    },

    /**
     * Highlight task and set it to current
     */
    highlightTask: function () {
        this.highlightElement();
        this.currentSelection = TASK_FACTORY;
    },

    /**
     * Highlight resource and set it to current
     */
    highlightResource: function () {
        this.highlightElement();
        this.currentSelection = RESOURCE_FACTORY;
    },

    /**
     * Highlight belief and set it to current
     */
    highlightBelief: function () {
        this.highlightElement();
        this.currentSelection = BELIEF_FACTORY;
    },
}
