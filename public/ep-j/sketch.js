let img;
let pos1, pos2, x,y;
let bound = 1;
let num_chasers = 50;
let chasers = [];


class Seeker {
  constructor(c, t){
    this.x = random(width);
    this.y = random(height);
    this.prevX = this.x;
    this.prevY = this.y;
    this.col = c
    this.thickness = random(0.1, 2)
    this.count = 0
  }

  render(){
    // if(random(10) < 5){
    //   this.x = lerp(this.x, mouseX, 0.01);
    //   this.y = lerp(this.y, mouseY, 0.01);
    // }
    // if( abs(this.x - mouseX) < bound || abs(this.y - mouseY) < bound ){
      // this.x = random(width)
      // this.prevX = this.x;
      // this.y = random(height)
      // this.prevY = this.y;
    if (this.count > 10){
      this.x = random(width)
      this.y = random(height)
      this.count = 0;
    }
    // }

    // strokeWeight(this.thickness);
    // stroke(this.col);

    strokeWeight(this.thickness);

    // for(let t =0; t <=1; t+= 0.0025){
    //   x = lerp(this.x, this.prevX, t);
    //   y = lerp(this.y, this.prevY, t)
    //   stroke(img.get(x,y))
    //   point(x,y)
    // }
   let st = img.get(this.x,this.y) 
  //  console.log(st)
   stroke(st)
   let h = random(5) 
   fill(st)
   ellipse(this.x, this.y,h)
    
    
    // line(this.x, this.y, this.prevX, this.prevY);
    // this.prevX = this.x
    // this.prevY = this.y
    this.prevX = random(width)
    this.prevY = random(height)
    this.count++
  }
}



function preload() {
  // img = loadImage('b2.jpg');
  // img = loadImage('bae_small.jpg');
  img = loadImage('duck2.jpg');

}

function setup() {
  createCanvas(img.width, img.height);
  background(255);
  smooth(5);
  pos1 = createVector(100,100);
  pos2 = createVector(300,400);

  for(let i=0; i < num_chasers; i++){
    let c = new Seeker(color(random(255),random(255),random(255)),1);
    chasers.push(c)
  }

}

function draw(){
  for(let i=0; i < num_chasers; i++){
    chasers[i].render()
  }
}


function odraw() {
  pos1.x = random(width);
  pos1.y = random(height);
  pos2.x = random(width);
  pos2.y = random(height);
  strokeWeight(0.5);

  for(t =0; t <=1; t+= 0.01){
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