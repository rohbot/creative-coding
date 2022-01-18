let vibrations = [];
let anim = 0;
let last_touched;

let prev;

let xoff = 0;

var synth = new Tone.FMSynth({
			"modulationIndex" : 12.22,
			"envelope" : {
				"attack" : 0.01,
				"decay" : 0.2
			},
			"modulation" : {
				"type" : "square"
			},
			"modulationEnvelope" : {
				"attack" : 0.2,
				"decay" : 0.01
			}
		}).toMaster();


function setup() {
	createCanvas(windowWidth, windowHeight);
	last_touched = millis();
	//prev = createVector(-1,-1);
}

function draw() {
	background(0, 0, 150);

	if (touches.length > 0) {
		drawTouches();
	}
	noFill();
	beginShape();

	for (let i = 0; i < vibrations.length; i++) {
		vertex(vibrations[i].x, vibrations[i].y);


	}
	endShape();

	for (let i = 0; i < vibrations.length; i++) {
		let i2 = int(i/10) * 10;
		line(vibrations[i].x, vibrations[i].y, vibrations[i2].x, vibrations[i2].y);
	}

	if (millis() - last_touched > 50) {
		vibrations.splice(0, 1);
		last_touched = millis();
	}
}

let noiseScale = 0.1;

function addPoint(x, y) {
	//vibrations.push(createVector(x, y));
	let noiseVal = noise(x * noiseScale, y * noiseScale) * 100;
	console.log(noiseVal);
	vibrations.push(createVector(x + noiseVal, y + noiseVal));

	if (vibrations.length > 50) {
		vibrations.splice(0, 1);
	}
	last_touched = millis();
	prev = createVector(x, y);
	
}

function mouseDragged() {
	addPoint(mouseX, mouseY);
}

function mousePressed(){
	let freq = map(mouseX, 0, width, 500,5000);
	synth.triggerAttack(freq);

}

function mouseReleased(){
	synth.triggerRelease();
}

function drawTouches() {

	for (var i = 0; i < touches.length; i++) {
		addPoint(touches[i].x, touches[i].y);
		//scatter();

	}


}