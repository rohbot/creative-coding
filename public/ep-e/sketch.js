let X = 50;
let Y = 25;
let offset = 0;
let points = [];

let rows;
let cols;

let SHADE = 0;
let DIR = 1;

let LOW = 0;
let HIGH = 255;

let x, y;
let rx , ry;
let xoff = 0;

let lines = []
let max_lines = 50;

function setup() {

	createCanvas(windowWidth, windowHeight);
	// background(51);
	// stroke(0);

	strokeWeight(0.1);
	// fill(0)
	rows = int(height / Y) + 1;
	cols = int(width / X) + 1;
	
	x = ceil(cols/2);
	y = ceil(rows/2);

	rx = width/2;
	ry = height /2;

	for (let j = 0; j < rows; j++) {
		let row = []
		for (let i = 0; i < cols; i++) {
			let p = createVector(i * X, j * Y)
			row.push(p)
		}
		points.push(row)
	}
}


function mouseMoved(){
	// console.log(x,y)
	rx = mouseX
	ry = mouseY;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function draw() {
	
	// rx += (noise(xoff) - 0.5) * 10;
	// ry += (noise(xoff+ 1000) - 0.5) * 10;
	rx = noise(xoff) * width;
	ry = noise(xoff + 1000) * height;

	if(rx > width || rx < 0){
		rx = random(width);
	}
	if(ry > height || ry < 0){
		ry = random(height);
	}


	x = min(int(rx / X), cols -1)
	y = min(int(ry / Y), rows - 1)
	
	//  background(255)
	stroke(SHADE);
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < cols; i++) {
			let p = points[j][i]
			// point(p.x, p.y)
		}
	}		
	let p = points[y][x]
	// ellipse(p.x, p.y,20)
	for(let i = 0; i < 30; i++){
		let x1 = int((random() - 0.5) * cols)
		let y1 = int((random() - 0.5) * rows)
		let px = max(min(x + x1, cols-1),0)
		let py = max(min(y + y1, rows - 1),0)
		let p1 = points[py][px]
		if(p1.x != p.x && p1.y != p.y){
			line(p1.x, p1.y, p.x, p.y)
		}
	}

	xoff += 0.005

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

