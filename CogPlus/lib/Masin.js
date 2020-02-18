function Masin(fps, htmlOptions) {
	this.world = {
		update: function(){},
		draw: function(){},
	};
	this.fps = fps;
	this.mouseDown = false;
	this.mouseDownLastFrame = false;

	this.canvas = document.createElement("canvas");
	for(var property in htmlOptions) {
		this.canvas[property] = htmlOptions[property];
	}

	// Remake with recursion...
	this.update = function() {
		var worldEntityCount = this.world.entities.length;
		for(var i = 0; i < worldEntityCount; i++) {
			if(this.world.entities[i].length) {
				for(var x = 0; x < this.world.entities[i].length; x++) {
					for(var y = 0; y < this.world.entities[i][x].length; y++) {
						this.world.entities[i][x][y].update();
					}
				}
			}
			else {
				this.world.entities[i].update();
			}
		}

		this.world.update();

		Game.mouseDownLastFrame = Game.mouseDown;
	}
	// Recursion here too pls
	this.draw = function() {
		var context = this.canvas.getContext("2d");
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		var worldEntityCount = this.world.entities.length;
		for(var i = 0; i < worldEntityCount; i++) {
			if(this.world.entities[i].length) {
				for(var x = 0; x < this.world.entities[i].length; x++) {
					for(var y = 0; y < this.world.entities[i][x].length; y++) {
						this.world.entities[i][x][y].draw(context);
					}
				}
			}
			else {
				this.world.entities[i].draw(context);
			}
		}
	}

	this.run = (function() {
		var loops = 0;
		var skipTicks = 1000 / fps;
		var maxFrameSkip = 10;
		var nextGameTick = (new Date).getTime();

		return function() {
			loops = 0;

			while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
				this.update();
				nextGameTick += skipTicks;
				loops++;
			}

			this.draw();
		};
	})();

	this.start = function() {
		var masin = this; // Reference to be used in callback function for requestAnimationFrame. "this" in cb refers to window.
		var cb = function() {
			masin.run();
			window.requestAnimationFrame(cb);
		}
		cb();
	};

	this.canvas.addEventListener('mousemove', function(e) {
		var clientRect = Game.canvas.getBoundingClientRect();
		Game.mouseY = e.clientY - clientRect.top;
		Game.mouseX = e.clientX - clientRect.left;
	});

	this.canvas.addEventListener('mousedown', function(e) {
		Game.mouseDown = true;
		console.log("mousedown");
	});

	this.canvas.addEventListener('mouseup', function(e) {
		Game.mouseDown = false;
		console.log("mouseup");
	});

}
