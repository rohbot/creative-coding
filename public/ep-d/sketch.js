let SHADE = 0;
let DIR = 1;
let theta = 0;
let r;
let x;
let y;  
let startX;
let startY;
let xoffset = 0;
let yoffset = 1000;
let zoffset = 100;
let start_pos;
let balls = [];
let NUM_BALLS = 200;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  r = max(width,height) * 0.7;
  startX = windowWidth/2;
  startY = windowHeight /2;
  start_pos = createVector(startX, startY)
  for(let i =0; i < NUM_BALLS; i++){
    balls.push(createVector(random(width), random(height)));
    offsets.push(random() * 10000)
  }
}

function draw() {
  zoffset +=0.0015
  
  stroke(SHADE)
  fill(SHADE)
  for(let i =0; i < NUM_BALLS; i++){
    let ball = balls[i]
    let offset = offsets[i]
    if(ball.dist(start_pos) > r){
      console.log(ball.dist(start_pos), r)
      
      if(random() < 0.3){
        ball.x = random(width)
        ball.y = random(height) 
      }else{
        ball.x = startX
        ball.y = startY
      }
      
      offset = random() * 10000
    }
    ball.x += (noise(offset) - 0.5) * 2
    ball.y += (noise(offset+1000) - 0.5) * 2
    offset += 0.01
  
  
    ellipse(ball.x, ball.y,5)

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
