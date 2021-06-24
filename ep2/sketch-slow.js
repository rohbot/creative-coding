let bugs = []; // Declare object

const NUM_BUGS = 15;

const MAX_SPEED = 25;
const MAX_FORCE = 3;

let SPEED = 1;
let RD = 150;


// function preload() {
//   font = loadFont('AvenirNextLTPro-Demi.otf');
// }


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(51);
	// var points = font.textToPoints('train', width/2 - 250, height/2, 500, {
	//     sampleFactor: 0.01
	// });



	for (var i = 0; i < NUM_BUGS; i++) {
		// var pt = createVector(random(width), random(height));
		var vehicle = new Vehicle(random(width), random(height));
		bugs.push(vehicle);
	// stroke(255);
	// strokeWeight(8);
	// point(pt.x, pt.y);
	}


	// for(let i = 0; i < NUM_BUGS; i++){
	// 	bugs.push(new Vehicle(random(width), random(height)))
	// }

}

function keyPressed(){

}


function mouseMoved(){
	let md = dist(mouseX, mouseY, width/2, height/2);
	RD = map(md,0,width/2,10, 200)
	//console.log(RD)
}

function draw() {
	background(51);
	for(let i = 0; i < bugs.length; i++){
		bugs[i].behaviours();
		bugs[i].update();
  		bugs[i].show();
  	}
  	
  	for(let i = 0; i < bugs.length; i++){
	
  		let bug = bugs[i];
  		bug.connections = 0;
  		bug.nearest_d = width*4;
  		bug.further_d = 0;
  		
  		bug.furthest = bug.target;
  		bug.nearest = bug.pos;
  		// bug.nearest = bug.pos;
  		
  		for(let j = 0; j < bugs.length; j++){
  			if(i == j)
  				continue;
  			let b = bugs[j];
  			let dt = bug.pos.dist(b.pos);

  			if (dt <= RD){
  				line(bug.pos.x, bug.pos.y, b.pos.x, b.pos.y)	
  				bug.connections++;
  			}
  			if(dt > bug.further_d){
  				// console.log(i, dt);
  				bug.furthest = b.pos;
  				bug.further_d = dt;

  			}
  			if(dt < bug.nearest_d){
  				bug.nearest = b.pos;
  				bug.nearest_d = dt;
  			}


  		}
  		let dt = dist(bug.pos, bug.target);
  		if(dt <  10){
  			bug.vel.mult(-2.5)
  		}
  	// 	if(bug.connections < 1){
			// let desired = p5.Vector.sub(bug.target, bug.pos);
			// let d = desired.mag();
			// let speed = MAX_SPEED;
			// if (d < 100) {
			// 	speed = map(d, 0, 100, 0, MAX_SPEED);
			// }
			// desired.setMag(speed);
			// let steer = p5.Vector.sub(desired, bug.vel);
			// steer.limit(MAX_FORCE);
  	// 		bug.acc.add(steer);
  	// 	}
  
		

	 }		
	
	

}


// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(random(width), random(height));
    this.furthest = createVector(x, y);
    this.nearest = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 1;
  }

  behaviours() {
    var arrive = this.arrive(this.furthest);
    // var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(this.nearest);

    arrive.mult(0.1);
    flee.mult(3);

    this.applyForce(arrive);
    this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);

	if(this.pos.x < 0 || this.pos.x > width){
		this.vel.x = -this.vel.x;
	}

	if(this.pos.y < 0 || this.pos.y > height){
		this.vel.y = -this.vel.y;
	}



  }

  show() {
    stroke(255);
    // strokeWeight(this.r);
    ellipse(this.pos.x, this.pos.y, this.r);
  }


  arrive(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxspeed;
    if (d < 10) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}




class Jitter {
  constructor() {
    this.diameter = 10 //random(10, 30);
    this.speed = SPEED;
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
	this.acc = createVector();
 	this.maxspeed = MAX_SPEED;
 	this.maxforce = MAX_FORCE;
 	this.nearest = this.pos;
  }

  behaviours(){
	let converge = this.converge(this.nearest);
	//let mouse = createVector(mouseX, mouseY);
	//let flee = this.flee(mouse);

	converge.mult(1);
	//flee.mult(1);

	this.applyForce(converge);
	// this.applyForce(flee);
  }

  applyForce(f){
  	this.acc.add(f);
  }

  flee(target){
	let desired = p5.Vector.sub(target, this.pos);
	let d = desired.mag();
	if (d < 50) {
		//desired.setMag(this.maxspeed);
		desired.mult(-1);
		let steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.maxforce);
		return steer;
	} 
	// else {
	// 	return createVector(0, 0);
	// }
  }

  converge(target){
	let desired = p5.Vector.sub(target, this.pos);
	let d = desired.mag();
	
	let speed = this.maxspeed;
	if (d < 100) {
		speed = map(d, 0, 100, 0, this.maxspeed);
	}
	desired.setMag(speed);
	let steer = p5.Vector.sub(desired, this.vel);
	steer.limit(this.maxforce);
	
	return steer;
  }

  update() {
	  this.pos.add(this.vel);
	  this.vel.add(this.acc);
	  this.acc.mult(0);

	  if(this.pos.x < 0 || this.pos.x > width){
	  	this.vel.x = -this.vel.x;
	  }
	
	  if(this.pos.y < 0 || this.pos.y > height){
	  	this.vel.y = -this.vel.y;
	  }
  
	  // if(this.vel.mag() > 5){
	  // 		this.vel.mult(0.8);
	  // }

  }

  display() {
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }
}