// The number of birds in each population
const totalPopulation = 300;

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
	let canvas = createCanvas(bg.width, bg.height);
	canvas.parent("sketch");
	// image(groundImg, 0, height - groundImg.height);
	// for (let i = 0; i < totalPopulation; i++) {
	// 	let bird = new Bird();
	// 	aliveBirds[i] = bird;
	// 	allBirds[i] = bird;
	// }
}

function draw() {
	console.log(pipes);
	image(bg, 0, 0);
	for (let i = pipes.length - 1; i >= 0; i--) {
		pipes[i].update();
		if (pipes[i].checkOffScreen()) {
			pipes.splice(i, 1);
		}
	}

	if (frameCounter % 75 === 0) {
		pipes.push(new Pipe());
	}

	frameCounter++;

	for (let i = 0; i < pipes.length; i++) {
		pipes[i].show();
	}
	image(groundImg, 0, height - groundImg.height);
}
