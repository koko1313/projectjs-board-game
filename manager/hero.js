var Hero = function(name, damage, deffence, health, range, speed, availableForPick) {
    this.name = name;
    this.damage = damage;
    this.deffence = deffence;
    this.health = health;
    this.range = range;
    this.speed = speed;
    this.availableForPick = availableForPick;

    this.x = null;
    this.y = null;
    this.width = null;
};

Hero.prototype.containsPoint = function(clientX, clientY) {
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

    if(clientX > a.x && clientX < b.x && clientY > a.y && clientY < c.y) {
        return true;
    }

    return false;
};