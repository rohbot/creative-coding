let balls = [];
let SHADE = 0;
let DIR = 1;
let NUM_BALLs = 500;
let target;
function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(50);

  for (let i = 0; i < NUM_BALLs; i++) {
    let b = new Ball(random(width), random(height));
    balls.push(b);
  }

  target = createVector(width / 2, height / 2);
  stroke(SHADE)
}

function mouseMoved() {
  target.x = mouseX;
  target.y = mouseY;
}

function keyPressed(){
  clear()
}

function draw() {
  //background(255);
  // ellipse(target.x, target.y, 20);
  stroke(SHADE)
  let hit = false;
  for (let ball of balls) {
    if (ball.seek(target)) {
      hit = true;
    }
    ball.run();
  }
  if (hit) {
    for (let ball of balls) {
      ball.randomise();
      
    }
    target = createVector(random(width), random(height))
  }

  SHADE += 1 * DIR;
  if(SHADE > 255){
    SHADE = 255;
    DIR = -1;
  }
  if(SHADE < 0){
    SHADE = 0;
    DIR = 1;
  }
}
