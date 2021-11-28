let ball;
let yoff = 100.0;
let SHADE = 0;
let DIR = 1;
let x_rate = 0.005;
let y_rate = 0.005;
let redraw = true;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  angleMode(DEGREES);
}

function mouseMoved(){
  x_rate = map(mouseX,0, width, 0.0005, 0.01)
  y_rate = map(mouseY,0, height, 0.0005, 0.01)

}

function mousePressed(){
  if(redraw){
    redraw = false
  }else{
    redraw = true
  }

}


function draw() {
  
  if(redraw){
    background(50);
  }
  
  fill(SHADE)
  translate(width / 2, height / 2);

  // We are going to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (let i = 0; i <= 360; i += 1) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    let r = map(noise(xoff, yoff), 0, 1, 0, width);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);
    let x = i * cos(r)
    let y = i * sin(r)
     
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += x_rate;
  }
  // increment y dimension for noise
  yoff += y_rate;
  // vertex(width, height);
  // vertex(0, height);
  endShape(CLOSE);
  SHADE += 1 * DIR;
  if(SHADE > 255){
    SHADE = 255;
    DIR = -1;
  }
  if(SHADE < 100){
    SHADE = 100;
    DIR = 1;
  }
}

