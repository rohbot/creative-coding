let X = 25;
let Y = 25;
let offset = 10;
let points = [];

let SHADE = 255;
let DIR = 1;

let LOW = 0;
let HIGH = 1;

function setup() {

	createCanvas(windowWidth, windowHeight);
	// background(51);
	stroke(0);

	strokeWeight(0.1);
	// fill(0)
	for (let j = 0; j < (height / Y) - 2; j++) {

		for (let i = 0; i < (width / X) - 2; i++) {
			let p = createVector(i * X + X, j * Y + Y)
			points.push(p)
		}
	}
}




function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function draw() {
	stroke(SHADE);
	for (let p of points) {
		// point(p.x, p.y)
	}

	let p1 = random(points)
	let p2 = random(points)

	line(p1.x, p1.y, p2.x, p2.y)
	SHADE += 1 * DIR;
	if (SHADE > HIGH) {
		SHADE = HIGH;
		DIR = -1;
	}
	if (SHADE < LOW) {
		SHADE = LOW;
		DIR = 1;
	}
}

