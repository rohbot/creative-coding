const NUM_PARTICLES = 200;
let particles = [];
let origin;
let xoff = 0;
let yoff = 1000;
function setup() {

  createCanvas(windowWidth, windowHeight);
  background(51);
  stroke(150);
  origin = createVector(width/2, height/2);

}

function mouseMoved() {
  let pos = createVector(mouseX, mouseY);
  if (particles.length >= NUM_PARTICLES) {
    particles.splice(0,1);
  }
  particles.push(pos);

 
}

function updatePos(){
  let x = noise(xoff) * width;
  let y = noise(yoff) * height;
  xoff += 0.005;
  yoff += 0.005;
  let pos = createVector(x, y);
  if (particles.length >= NUM_PARTICLES) {
    particles.splice(0,1);
  }
  particles.push(pos);

  origin.x = noise(xoff + 1000) * width;
  origin.y = noise(yoff + 1000) * height;

}


function draw() {
  background(51);
  updatePos();
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    // let dist = dist()
    line(p.x, p.y, origin.x, origin.y);
  }

}