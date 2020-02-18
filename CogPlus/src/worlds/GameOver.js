function GameOver(score) {
	this.score = score;
	this.entities = [];
	this.gameOverText = new Text("Game Over", 100, 100);
	this.scoreText = new Text("Score: " + this.score, 150, 150);
	this.playAgainButton = new PlayAgainButton(200, 200);

	this.entities.push(this.gameOverText);
	this.entities.push(this.scoreText);
	this.entities.push(this.playAgainButton);

	this.update = function() {
		
	}
}
