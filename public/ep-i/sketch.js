let img;
let pos1, pos2, x,y;
function preload() {
  img = loadImage('bae_small.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
  background(255);
  smooth(5);
  pos1 = createVector(100,100);
  pos2 = createVector(300,400);

}




function draw() {
  pos1.x = random(width);
  pos1.y = random(height);
  pos2.x = random(width);
  pos2.y = random(height);
  strokeWeight(0.5);

  for(t =0; t <=1; t+= 0.001){
    x = lerp(pos1.x, pos2.x, t);
    y = lerp(pos1.y, pos2.y, t)
    stroke(img.get(x,y))
    point(x,y)
  }

}

function keyTyped(){
  if(key == 's'){
    saveCanvas()
  }
  
}