function PlayAgainButton(x, y) {
    this.x = x;
    this.y = y;

    this.update = function() {
        if(!Game.mouseDownLastFrame && Game.mouseDown) {
            if(Game.mouseY <= this.y + 100 && Game.mouseY >= this.y &&
            Game.mouseX <= this.x + 200 && Game.mouseX >= this.x) {
                Game.world = new GameWorld();
            }
        }
    }
    this.draw = function(context) {
        context.drawImage(this.img, this.x, this.y);
    }
}
