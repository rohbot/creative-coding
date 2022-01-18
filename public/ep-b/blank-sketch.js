let ready = false;


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
    

  }
 
}

function mouseMoved(){
 
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

