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

PlaygroundSquare.prototype.containsPoint = function(clientX, clientY) {
    var a = {
        x: this.x,
        y: this.y,
    };
    var b = {
        x: this.x + this.width,
        y: this.y,
    };
    var c = {
        x: this.x,
        y: this.y + this.width,
    };
    // var d = {
    //     x: this.x + this.width,
    //     y: this.y + this.width,
    // };

    if(clientX > a.x && clientX < b.x && clientY > a.y && clientY < c.y) {
        return true;
    }

    return false;
};