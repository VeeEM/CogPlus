function Preloader() {
    this.entities = [];

    Cog.prototype.img = [];

    Cog.prototype.img[0] = new Image();
    Cog.prototype.img[0].addEventListener("load", function() {
        Cog.prototype.img0Loaded = true;
    }, false);
    Cog.prototype.img0Loaded = false;
    Cog.prototype.img[0].src = "CogPlus/img/cog1.png";

    Cog.prototype.img[1] = new Image();
    Cog.prototype.img[1].addEventListener("load", function() {
        Cog.prototype.img1Loaded = true;
    }, false);
    Cog.prototype.img1Loaded = false;
    Cog.prototype.img[1].src = "CogPlus/img/cog2.png";

    Cog.prototype.img[2] = new Image();
    Cog.prototype.img[2].addEventListener("load", function() {
        Cog.prototype.img2Loaded = true;
    }, false);
    Cog.prototype.img2Loaded = false;
    Cog.prototype.img[2].src = "CogPlus/img/cog3.png";

    PlayAgainButton.prototype.img = new Image();
    PlayAgainButton.prototype.img.addEventListener("load", function() {
        PlayAgainButton.prototype.imgLoaded = true;
    }, false);
    PlayAgainButton.prototype.imgLoaded = false;
    PlayAgainButton.prototype.img.src = "CogPlus/img/playagain.png";

    this.update = function() {
        if(Cog.prototype.img0Loaded && Cog.prototype.img1Loaded && Cog.prototype.img2Loaded && PlayAgainButton.prototype.imgLoaded)
            Game.world = new GameWorld();
    }
}
