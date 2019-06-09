// The number of birds in each population
const totalPopulation = 300;
let generation = 0;
// Birds currently alived
let aliveBirds = [];

// all the birds of the current generation
let allBirds = [];

let pipes = [];

let frameCounter = 0;

function preload() {
	birdImg = loadImage("assets/bird.png");
	pipeTopImg = loadImage("assets/pipeUp.png");
	pipeDownImg = loadImage("assets/pipeDown.png");
	bg = loadImage("assets/bg.png");
	groundImg = loadImage("assets/ground.png");
}

function setup() {
	tf.setBackend("cpu");
	let canvas = createCanvas(bg.width, bg.height);
	canvas.parent("sketch");
	for (let i = 0; i < totalPopulation; i++) {
		let bird = new Bird();
		aliveBirds[i] = bird;
		allBirds[i] = bird;
	}
}

function draw() {
	image(bg, 0, 0);
	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].update();
		if (pipes[i].checkOffScreen()) {
			pipes.splice(i, 1);
		}
	}

	for (let i = aliveBirds.length - 1; i >= 0; i--) {
		let bird = aliveBirds[i];
		bird.chooseAction(pipes);
		bird.update();
		for (let j = 0; j < pipes.length; j++) {
			if (pipes[j].checkCollision(bird)) {
				aliveBirds.splice(i, 1);
				break;
			}
		}
		if (bird.bottomTopCollision()) {
			aliveBirds.splice(i, 1);
		}
	}

	if (frameCounter % 50 === 0) {
		pipes.push(new Pipe());
	}

	frameCounter++;

	for (let i = 0; i < pipes.length; i++) {
		pipes[i].show();
	}
	for (let i = 0; i < aliveBirds.length; i++) {
		aliveBirds[i].show();
	}
	if (aliveBirds.length == 0) {
		generation++;
		console.log("generation ", generation);
		createNextGeneration();
	}

	image(groundImg, 0, height - groundImg.height);
}
