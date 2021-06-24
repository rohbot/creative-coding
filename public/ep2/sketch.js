let ball1;
let ball2;
let ball3;
function setup() {
	
	createCanvas(windowWidth, windowHeight);
	background(51);
	stroke(255);
	strokeWeight(0.1);
	ball1 = new Ball();
	ball2 = new Ball();
	ball3 = new Ball();
}

function mouseMoved(){
	
	// line(ball1.pos.x, ball1.pos.y,ball2.pos.x,ball2.pos.y)
	line(mouseX, mouseY,ball2.pos.x,ball2.pos.y)
	line(mouseX, mouseY,ball1.pos.x,ball1.pos.y)
	line(mouseX, mouseY,ball3.pos.x,ball3.pos.y)

}

function mousePressed() {
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let soff = 0.01;
let tick = 0;
function draw() {
	tick += soff;
	stroke(map(cos(tick),-1, 1, 75, 255 ));
  if(frameCount % 1000 == 0 ){
	  //background(51)
	//ball1 = new Ball()
//ball2 = new Ball()
  //	ball3 = new Ball()
 }


  ball1.update();
  ball2.update();
  ball3.move();
  ball3.update();
  
  line(ball3.pos.x,ball3.pos.y,ball2.pos.x,ball2.pos.y)
  line(ball3.pos.x,ball3.pos.y,ball1.pos.x,ball1.pos.y)
  line(ball2.pos.x,ball2.pos.y,ball1.pos.x,ball1.pos.y)
//   console.log(frameRate)
  //ellipse(pos.x, pos.y, 10, 10)
}
let XOFF = 0.00005;

class Ball{
	constructor() {
		this.xoff = 0;
		this.init()
	}
	init(){
		this.pos = createVector(random(width),random(height));
		this.vel = p5.Vector.random2D();
		this.acc = p5.Vector.random2D();
		
	}

	update(){
		this.xoff += XOFF
	    // this.vel.x = noise(this.xoff);
	    // this.vel.y = noise(this.xoff + 1000);
		
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		if(this.pos.x < 0 || this.pos.x > width){
			this.vel.x = -this.vel.x;
			this.init();
		}
		if(this.pos.y < 0 || this.pos.y > height){
			this.vel.y = -this.vel.y;
			this.init()
		}
	}

	move(){
		this.xoff += XOFF
	    // this.acc.x = noise(this.xoff) * 0.01;
		// this.acc.y = noise(this.xoff + 1000) * 0.01;
		this.acc.x = random();
	    this.acc.y = random();
	}


	show(){
		//ellipse(this.pos.x, this.pos.y, 10, 10)
	}
}

