var Game = new Masin(60, {
    width: 525,
    height: 550,
});

Game.world = new Preloader();
document.getElementById("gamecontainer").appendChild(Game.canvas);
Game.start();
