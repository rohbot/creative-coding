const NUM_PARTICLES = 50;
let particles = [];
let origin;
let xoff = 0;
let yoff = 1000;
let ratio1, ratio2;

let s = 100;
let dir = 1;

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(210);
  strokeWeight(0.01)
  stroke(s);
  origin = createVector(width/2, height/2); 
  ratio1 = random();
  ratio2 = random();
}

function mouseMoved() {
  // let pos = createVector(mouseX, mouseY);
  // if (particles.length >= NUM_PARTICLES) {
  //   particles.splice(0,1);
  // }
  // particles.push(pos);

 
}

function updatePos(){
  let x = noise(xoff) * width;
  let y = noise(xoff+1000) * height;
  xoff += 0.005;
  yoff += 0.005;
  let pos = createVector(x, y);
  if (particles.length >= NUM_PARTICLES) {
    particles.splice(0,1);
  }
  particles.push(pos);

  origin.x = noise(yoff + 10) * width;
  origin.y = noise(yoff + 1000) * height;

}


function draw() {
  // background(20);
  stroke(s)
  updatePos();
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    // let dist = dist()
    line(p.x, p.y, origin.x, origin.y);
  }

  s += dir;

  if(s > 250){
    s = 250;
    dir = -1
  }
  if(s < 50){
    s = 50;
    dir = 1
  }
  


}