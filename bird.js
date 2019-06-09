class Bird {
	constructor(brain) {
		this.actualHeight = height - groundImg.height;
		this.x = 50;
		this.y = this.actualHeight / 2;
		this.radius = birdImg.width / 2;
		this.gravity = 0.8;
		this.upLift = -12;
		this.velocity = 0;

		// How many frames the bird stays alive
		this.score = 0;

		// The fitness of the bird
		this.fitness = 0;

		if (brain instanceof NeuralNetwork) {
			this.brain = brain.copy();
			this.brain.mutate(mutate);
		} else {
			// Parameters are number of inputs, number of units in hidden Layer, number of outputs
			this.brain = new NeuralNetwork(5, 8, 1);
		}
	}

	copy() {
		return new Bird(this.brain);
	}

	show() {
		image(birdImg, this.x, this.y);
	}

	chooseAction(pipes) {
		let closest = null;
		let minimum = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let diff = pipes[i].x + pipes[i].width - this.x;
			if (diff > 0 && diff < minimum) {
				minimum = diff;
				closest = pipes[i];
			}
		}

		if (closest != null) {
			// We get all the inputs and normalize them between 0 and 1
			let inputs = [];
			// The 5 inpputs I have chosen for the network are
			// 1. The horizontal distance of the pipe from the bird
			inputs[0] = map(closest.x, this.x, width, 0, 1);

			// 2. top of the closest pipe
			inputs[1] = map(closest.top, 0, this.actualHeight, 0, 1);

			// 3. bottom of the closest pipe
			inputs[2] = map(closest.bottom, 0, this.actualHeight, 0, 1);

			// 4. bird's y position
			inputs[3] = map(this.y, 0, this.actualHeight, 0, 1);

			// 5. bird's velocity
			inputs[4] = map(this.velocity, -12, 12, 0, 1);

			// const action = this.brain.predict(inputs);
			const action = [0.3];
			if (action[0] > 0.5) {
				this.jump();
			}
		}
	}

	jump() {
		this.velocity += this.upLift;
		this.velocity *= 0.9;
	}

	bottomTopCollision() {
		return this.y + this.radius > this.actualHeight || this.y - this.radius < 0;
	}

	update() {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;
		this.score++;
	}
}
