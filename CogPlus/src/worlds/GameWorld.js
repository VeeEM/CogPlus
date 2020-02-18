function GameWorld() {
    this.entities = [];
    this.cogs = [];
    this.changed = false;
    this.score = 0;
    this.scoreText = new Text("Score: ", 0, 550);
    this.timeText = new Text("Time: ", 400, 550);
    this.totalTime = 60;
    this.time;
    this.startTime;
    this.update = function(){
        if(this.changed)
            this.deleteMatches(this.findMatches());

        this.time = this.totalTime - Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000);
        
        if(this.time < 0)
            Game.world = new GameOver(this.score);

        this.scoreText.text = "Score: " + this.score;
        this.timeText.text = "Time: " + this.time;
    };

    //this.entities.push(new Cog(50, 50, 0));

    this.roundToNearest = function(x, y) {
        return Math.round(x / y) * y;
    };

    this.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.findMatches = function() {
        var verticalMatches = [];
        for(var x = 0; x < 8; x++) {
            var last = '';
            var streak = 1;
            for(var y = 0; y < 8; y++) {
                if(last === this.cogs[x][y].vertical) {
                    streak++;
                    //console.log("Added to streak " + "x: " + x + " y: " + y + " streak: " + streak + " this: " + this.cogs[x][y].vertical + " last: " + last);
                }
                else if(streak < 3) {
                    streak = 1;
                }
                //console.log(streak);
                if(this.cogs[x][y].vertical !== last && streak >= 3) {
                    for(var i = 1; i < streak + 1; i++) {
                        verticalMatches.push({
                            x: x,
                            y: y - i
                        });
                    }
                    streak = 1;
                }
                else if(y === 7 && streak >= 3) {
                    //console.log("streak at 7, length: " + streak);
                    for(var i = 0; i < streak; i++) {
                        verticalMatches.push({
                            x: x,
                            y: y - i
                        });
                    }
                    streak = 1;
                }
                last = this.cogs[x][y].vertical;
            }
        }
        var horizontalMatches = [];
        for(var y = 0; y < 8; y++) {
            var last = '';
            var streak = 1;
            for(var x = 0; x < 8; x++) {
                if(last === this.cogs[x][y].horizontal) {
                    streak++;
                    //console.log("Added to streak " + "x: " + x + " y: " + y + " streak: " + streak + " this: " + this.cogs[x][y].horizontal + " last: " + last);
                }
                else if(streak < 3) {
                    streak = 1;
                }
                //console.log(streak);
                if(this.cogs[x][y].horizontal !== last && streak >= 3) {
                    for(var i = 1; i < streak + 1; i++) {
                        horizontalMatches.push({
                            x: x - i,
                            y: y
                        });
                    }
                    streak = 1;
                }
                else if(x === 7 && streak >= 3) {
                    //console.log("streak at 7, length: " + streak);
                    for(var i = 0; i < streak; i++) {
                        //console.log("adding x: " + (x - i));
                        horizontalMatches.push({
                            x: x - i,
                            y: y
                        });
                    }
                    streak = 1;
                }
                last = this.cogs[x][y].horizontal;
            }
        }
        for(var i = 0; i < horizontalMatches.length; i++) {
            var skip = false;
            for(var x = 0; x < verticalMatches.length; x++) {
                if(horizontalMatches[i].x === verticalMatches[x].x && horizontalMatches[i].y === verticalMatches[x].y) {
                    horizontalMatches.splice(i, 1);
                    break;
                }
            }
        }

        return {horizontalMatches: horizontalMatches, verticalMatches: verticalMatches};
    };

    this.deleteMatches = function(matches) {
        matches.horizontalMatches.reverse();
        matches.verticalMatches.reverse();
        /*
        for(var i = 0; i < matches.length; i++) {
        var delX = matches[i].x;
        var delY = matches[i].y;
        this.cogs[matches[i].x][matches[i].y].angle += 12;
        }
        console.log(matches);
        */
        var startHeights = [0, 0, 0, 0, 0, 0, 0, 0];
        for(var i = 0; i < matches.verticalMatches.length; i++) {
            this.score += 10;
            //this.cogs[matches.verticalMatches[i].x][matches.verticalMatches[i].y].angle += 12;
            this.cogs[matches.verticalMatches[i].x].splice(matches.verticalMatches[i].y, 1);
            this.cogs[matches.verticalMatches[i].x].unshift(new Cog(matches.verticalMatches[i].x * 60 + matches.verticalMatches[i].x * 5 + 5 + 30, startHeights[matches.verticalMatches[i].x] * -60 + -30 + startHeights[matches.verticalMatches[i].x] * -5, this.random(0, 2), this.roundToNearest(this.random(0, 360), 90)));
            startHeights[matches.verticalMatches[i].x]++;
        }
        for(var i = 0; i < matches.horizontalMatches.length; i++) {
            this.score += 10;
            //this.cogs[matches.horizontalMatches[i].x][matches.horizontalMatches[i].y].angle += 12;
            this.cogs[matches.horizontalMatches[i].x].splice(matches.horizontalMatches[i].y, 1);
            this.cogs[matches.horizontalMatches[i].x].unshift(new Cog(matches.horizontalMatches[i].x * 60 + matches.horizontalMatches[i].x * 5 + 5 + 30, startHeights[matches.horizontalMatches[i].x] * -60 + -30 + startHeights[matches.horizontalMatches[i].x] * -5, this.random(0, 2), this.roundToNearest(this.random(0, 360), 90)));
            startHeights[matches.horizontalMatches[i].x]++;
        }

        for(var x = 0; x < this.cogs.length; x++) {
            for(var y = 0; y < this.cogs[x].length; y++) {
                this.cogs[x][y].z = y * 60 + y * 5 + 5 + 30;
            }
        }
        this.changed = false;
    }


    for(var x = 0; x < 8; x++) {
        this.cogs[x] = [];
        for(var y = 0; y < 8; y++) {
            this.cogs[x][y] = new Cog(x * 60 + x * 5 + 5 + 30, y * 60 + y * 5 + 5 + 30, this.random(0, 2), this.roundToNearest(this.random(0, 360), 90));
            //this.entities.push(this.cogs[x][y]);
        }
    }

    do {
        var matches = this.findMatches();
        this.deleteMatches(matches);
    }while(matches.horizontalMatches.length || matches.verticalMatches.length);
    this.score = 0;
    this.entities.push(this.cogs);
    this.entities.push(this.scoreText);
    this.entities.push(this.timeText);
    this.startTime = new Date();
    //console.log(this.cogs);
}
