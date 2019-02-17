var PlaygroundSquare = function(x, y, width, name, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.name = name;
    this.color = color;
};

PlaygroundSquare.prototype.draw = function() {
    CanvasManager.context.fillStyle = this.color;
    CanvasManager.context.strokeRect(this.x, this.y, this.width, this.width);
    CanvasManager.context.fillRect(this.x, this.y, this.width, this.width);
};