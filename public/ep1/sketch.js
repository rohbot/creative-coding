let bugs = []; // Declare object

const NUM_BUGS = 20;

const MAX_SPEED = 25;
const MAX_FORCE = 3;

let SPEED = 1;
let RD = 150;
let XOFF = 0.005

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);
	for(let i =0; i < NUM_BUGS; i++){
		bugs.push(new Bug())
	}
}

function mouseMoved(){
	let md = dist(mouseX, mouseY, width/2, height/2);
	XOFF = map(md,0,width/2,0, 0.02)

	pos = createVector(mouseX, mouseY);
	console.log(XOFF)
    ellipse(pos.x, pos.y, 8);

}

function mousePressed() {
  if(!fullscreen())
    fullscreen(true);
    //location.reload();
  
}

function touchStarted() {
	if(!fullscreen())
		fullscreen(true);
		 
	for(let i = 0; i < touches.length; i++){
		//console.log(RD)
	    ellipse(touches[i].x, touches[i].y, 8);

	}
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let noiseScale=0.02;

function draw() {
  background(0);
  // for (let x=0; x < width; x++) {
  let noiseVal = noise((mouseX)*noiseScale, mouseY*noiseScale);
  stroke('rgb(0,255,0)');
  //   line(x, mouseY+noiseVal*80, x, height);
  // }
  for(let i =0; i < bugs.length; i++){
	  	bugs[i].update();
	  	bugs[i].show();
  		
  		for(let j = 0; j < bugs.length; j++){
			if(i == j)
				continue;
			let b = bugs[j];
			let dt = bugs[i].pos.dist(b.pos);

			if (dt <= RD){
				line(bugs[i].pos.x, bugs[i].pos.y, b.pos.x, b.pos.y)	
			}
		}	

  }
}

class Bug {
	constructor() {
		this.xoff = random() * 1000;
		this.pos = createVector();
		this.r = 8;


	}
	update(){
	    this.xoff += XOFF
	    this.pos.x = noise(this.xoff) * width;
	    this.pos.y = noise(this.xoff + 1000) * height;
	    //console.log(this.pos)
	}

	show(){

  	    ellipse(this.pos.x, this.pos.y, this.r);

	}
}