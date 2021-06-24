let balls = []
let vels = []
let NUM_BALLS = 10;
let SPEED = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i =0; i < NUM_BALLS; i++){
    let ball = createVector(random(width), random(height));
    balls.push(ball);
    vels.push(createVector(random(-SPEED,SPEED), random(-SPEED,SPEED)));
  }
  stroke(220);
  background(50);
}

function display(){
  if(!(frameCount % 1000))
    background(50);
 
  for(let i =0; i < NUM_BALLS; i++){
    let ball = balls[i];
    ellipse(ball.x, ball.y, 10, 10);
  }
 
}

function moveBalls(){
  for(let i =0; i < NUM_BALLS; i++){
    balls[i].add(vels[i])
    if(balls[i].x > width || balls[i].x < 0){
      vels[i].x *= -1
    }
    if(balls[i].y > height || balls[i].y < 0){
      vels[i].y *= -1
    } 
  }

}

function draw() {
  display()
  moveBalls()
  
}
