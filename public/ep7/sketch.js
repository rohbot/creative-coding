let ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  ball = new Ball(0, 0);
}




function draw() {
  translate(width/2, height/2)
  background(50);
  ball.run();
}

