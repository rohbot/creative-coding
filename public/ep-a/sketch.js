let ready = false;

let SHADE = 255;
let DIR = 1;

let x_rate = 0.001;
let y_rate = 0.001;
let xoff = 0;
let yoff = 1000;

let JITTER = 25;

//-------------------------------------------------------
// Create a new canvas to match the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);


}

//-------------------------------------------------------
function initializeAudio() {
  Tone.Master.volume.value = -9; // turn it down a bit

  Tone.Transport.bpm.value = 60; // default 120
  Tone.Transport.start();
}

//-------------------------------------------------------
// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//-------------------------------------------------------
// Main render loop
function draw() {
  if (!ready) {
    background(52);
    fill(255);
    textAlign(CENTER);
    text("CLICK TO START", width / 2, height / 2);
  } else {
    // background(0, 255);
    stroke(SHADE);
    let x = map(noise(xoff), 0, 1, 0, width);
    let y = map(noise(yoff), 0, 1, 0, height);
    let x2 = map(noise(xoff+1000), 0, 1, 0, width);
    let y2 = map(noise(yoff+1000), 0, 1, 0, height);
    let JITTER = map(noise(xoff+1500), 0, 1, 0, 100);

    let jitX = (random() * JITTER) - JITTER/2;
    let jitY = (random() * JITTER) - JITTER/2;
    
    for(let i = 0; i < 100; i++){
      line(x, y, x2 + jitX, y2+ jitY); 
    }

    xoff += x_rate;
    yoff += y_rate;


  }
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

function mouseMoved(){
  x_rate = map(mouseX,0, width, 0.0005, 0.001)
  // y_rate = map(mouseY,0, height, 0.0005, 0.001)

  // JITTER = map(mouseY,0, height, 0, 100)

}


//-------------------------------------------------------
function mousePressed() {
  if (!ready) {
    initializeAudio();
    ready = true;
    background(52);
  }
  // } else {
  //   // click again to start/stop...
  //   if (Tone.Transport.state == "paused") Tone.Transport.start();
  //   else if (Tone.Transport.state == "started") Tone.Transport.pause();
  // }
}

