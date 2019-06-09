function resetGame() {
	frameCounter = 0;
	pipes = [];
}

function createNextGeneration() {
	resetGame();
	normalizeFitness(allBirds);
	aliveBirds = generate(allBirds);
	allBirds = aliveBirds.slice();
}

function generate(oldBirds) {
	let newBirds = [];
	for (let i = 0; i < oldBirds.length; i++) {
		// Select a bird based on fitness
		let bird = poolSelection(oldBirds);
		newBirds[i] = bird;
	}
	return newBirds;
}

function normalizeFitness(birds) {
	for (let i = 0; i < birds.length; i++) {
		birds[i].score = pow(birds[i].score, 2);
	}

	let sum = 0;
	for (let i = 0; i < birds.length; i++) {
		sum += birds[i].score;
	}

	for (let i = 0; i < birds.length; i++) {
		birds[i].fitness = birds[i].score / sum;
	}
}

// An algorithm for picking one bird from an array
// based on fitness
function poolSelection(birds) {
	// Start at 0
	let index = 0;

	// Pick a random number between 0 and 1
	let r = random(1);

	// Keep subtracting probabilities until you get less than zero
	// Higher probabilities will be more likely to be fixed since they will
	// subtract a larger number towards zero
	while (r > 0) {
		r -= birds[index].fitness;
		// And move on to the next
		index += 1;
	}

	// Go back one
	index -= 1;

	// Make sure it's a copy!
	// (this includes mutation)
	return birds[index].copy();
}
