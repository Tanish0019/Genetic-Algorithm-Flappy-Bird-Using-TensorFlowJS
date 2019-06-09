class Pipe {
	constructor() {
		// Spacing between the top and bottom pipes
		const pipeGap = 75;
		
		// Center of the pipe
		const centerOfPipe = random(height - pipeDownImg.height - pipeGap / 2, pipeTopImg.height + pipeGap / 2);

		// Top pipe's bottom y coordinate
		this.top = centerOfPipe - (pipeGap / 2);

		// Bottom pipe's top y coordinate
		this.bottom = centerOfPipe + (pipeGap / 2);

		// x position of left edge of the pipe
		this.x = width;

		// Width of the pipe
		this.width = pipeDownImg.width;

		// Speed of the pipe
		this.speed = 6;
	}

	checkCollision(bird) {
		if (bird.x + bird.width / 2 >= this.x && bird.x - bird.width / 2 <= this.x + this.width) {
			if (bird.y - bird.height / 2 <= this.top || bird.y + bird.height / 2 >= this.bottom) {
				return true;
			}
		}
		return false;
	}

	show() {
		image(pipeTopImg, this.x, -Math.abs(pipeTopImg.height - this.top), this.width, pipeTopImg.height);
		image(pipeDownImg, this.x, this.bottom, this.width, pipeDownImg.height);
	}

	update() {
		this.x -= this.speed;
	}

	checkOffScreen() {
		if (this.x < -this.width) {
			return true;
		}
		return false;
	}
}
