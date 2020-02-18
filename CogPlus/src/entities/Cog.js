function Cog(x, y, imgNum, angle) {
    this.x = x;
    this.y = y;
    this.z = this.y;
    this.imgNum = imgNum;
    this.angle = angle;
    this.rotating = false;
    this.oldY = this.y;

    this.horizontal;
    this.vertical;

    this.correctHorizontalVertical = function() {
        if(this.imgNum === 0) {
            if(this.angle === 0 || this.angle === 180 || this.angle === 360) {
                this.horizontal = 'b';
                this.vertical = 'r';
            }
            else {
                this.horizontal = 'r';
                this.vertical = 'b';
            }
        }
        else if(this.imgNum === 1) {
            if(this.angle === 0 || this.angle === 180 || this.angle === 360) {
                this.horizontal = 'g';
                this.vertical = 'r';
            }
            else {
                this.horizontal = 'r';
                this.vertical = 'g';
            }
        }
        else if(this.imgNum === 2) {
            if(this.angle === 0 || this.angle === 180 || this.angle === 360) {
                this.horizontal = 'g';
                this.vertical = 'b';
            }
            else {
                this.horizontal = 'b';
                this.vertical = 'g';
            }
        }
    }
    this.correctHorizontalVertical();

    this.update = function() {
        if(this.y !== this.z) {
            this.y += 5;
        }
        if(this.y === this.z && this.oldY !== this.z)
            Game.world.changed = true;

        if(Game.mouseDown && !Game.mouseDownLastFrame) {
            if(Game.mouseY <= this.y - 10 && Game.mouseY >= this.y - 30 &&
            Game.mouseX <= this.x + 10 && Game.mouseX >= this.x - 10) {
                this.rotating = true;
            }
            if(Game.mouseY <= this.y + 10 && Game.mouseY >= this.y - 10 &&
            Game.mouseX <= this.x + 30 && Game.mouseX >= this.x + 10) {
                this.rotating = true;
            }
            if(Game.mouseY <= this.y + 30 && Game.mouseY >= this.y + 10 &&
            Game.mouseX <= this.x + 10 && Game.mouseX >= this.x - 10) {
                this.rotating = true;
            }
            if(Game.mouseY <= this.y + 10 && Game.mouseY >= this.y - 10 &&
            Game.mouseX <= this.x - 10 && Game.mouseX >= this.x - 30) {
                this.rotating = true;
            }
        }
        if(this.rotating && !Game.mouseDown) {
            this.rotating = false;
            this.angle = Math.round(this.angle / 90) * 90;
            if(this.angle < 0)
                this.angle = this.angle + 360;
            else if(this.angle > 360)
                this.angle = this.angle - 360;
            this.correctHorizontalVertical();
            Game.world.changed = true;
        }
        if(this.rotating) {
            var mouseAngle = Math.atan2(Game.mouseX - this.x, Game.mouseY - this.y) * (180 / Math.PI);
            this.angle -= this.oldMouseAngle - mouseAngle;
        }
        this.oldMouseAngle = Math.atan2(Game.mouseX - this.x, Game.mouseY - this.y) * (180 / Math.PI);
        this.oldY = this.y;
    }
    this.draw = function(context) {
        context.translate(this.x, this.y);
        context.rotate(-this.angle * (Math.PI / 180) + Math.PI/2.0);
        context.drawImage(this.img[this.imgNum], -this.img[this.imgNum].width / 2, -this.img[this.imgNum].height / 2, this.img[this.imgNum].width, this.img[this.imgNum].height);
        context.rotate(this.angle * (Math.PI / 180) - Math.PI/2.0);
        context.translate(-(this.x), -(this.y));
    };
}
