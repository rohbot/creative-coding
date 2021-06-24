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
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  r = height * 0.85;
  startX = windowWidth/2;
  startY = windowHeight /2;
}

function draw() {
  //  background(255 - SHADE);
  translate(startX, startY)
  
  startX =  noise(xoffset) * width;
  startY =  noise(yoffset) * height;
  xoffset += 0.001
  yoffset += 0.0015
  stroke(SHADE)
  // line(random(-windowWidth,width), random(-height, height), random(-10, 10), random(-10, 10))
  for(i = 0; i < TWO_PI; i+=TWO_PI/100){
    r =  noise(zoffset) * height;
    x = r * cos(i);
    y = r * sin(i);
    line(x, y, 0, 0);
  
  }
  zoffset +=0.0015
    
  // console.log(x,y)
  // theta += 0.01

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
