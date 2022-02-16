let x,y,a,b;
let x_off = 0;
let y_off = 7000
let w = 1;
let t = 1;

let v = 0.005

function setup() {
	createCanvas(windowWidth, windowHeight);
	x = width /2;
	y = height /2;
	w = random() * 100
	t = (1000 - w) * random()
	strokeWeight(0.3);
	console.log(w,t)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	// x =  width * sin(frameCount * v) * w * 1.1
	// y =  height * cos(frameCount * v) * t * 1.1
	x = noise(x_off) * w;
	y = noise(y_off) * t;
	a = noise(x_off + 1500) * width;
	b = noise(y_off + 2500) * height;
	

	push();
	// translate to where you want the center of the ellipse to be
	// translate(width/2, height/2);
	translate(a, b);
	// rotate using the frameCount (increases by one on each frame)
	rotate(noise(x_off + 5000) * TWO_PI);
	// draw the ellipse at the origin
	ellipse(0, 0,x, y);
	pop();
	// if(frameCount%19 == 0){
	// 	fill(255,0,0)
	// }
	// else if(frameCount%13 == 0){
	// 	fill(0,0,255)
	// }
	// else{
	// 	fill(255)
	// }
	x_off += 0.01	
	y_off += 0.005
}

