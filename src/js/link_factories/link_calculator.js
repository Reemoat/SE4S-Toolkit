// This obect calculates information to help make links
var LINK_CALCULATOR = {
    /**
     * This function returns a rotation string for links
     */
    calculateRotation: function(x1, y1, x2, y2) {
        var theta = 0; // How much the head must rotate
        
        // Calculate the rotation
        if (x1 < x2 && y1 < y2) { // Quadrant I
            theta = Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI;
        } else if (x1 === x2 && y1 < y2) { // Vertical line
            theta = 90;
        } else if (x1 > x2 && y1 < y2) { // Quadrant II
            theta = 180 - Math.atan((y2 - y1) / (x1 - x2)) * 180 / Math.PI;
        } else if (x1 > x2 && y1 === y2) { // Horizontal line
            theta = 180;
        } else if (x1 > x2 && y1 > y2) { // Quadrant III
            theta = 180 + Math.atan((y1 - y2) / (x1 - x2)) * 180 / Math.PI;
        } else if (x1 === x2) { // Vertical line in the opposite direction
            theta = 270;
        } else if (x1 < x2 && y1 > y2) { // Quadrant IV
            theta = 360 - Math.atan((y1 - y2) / (x2 - x1)) * 180 / Math.PI;
        }
        
        return theta;
    }
}