let ready = false;
let masterVolume = -9; 
let balls = []

let MAX_BALLS = 50;

let STROKE = 255;

let scale;

let mixer;

// let synth = new Tone.FMSynth({
//   "modulationIndex": 12.22,
//   "envelope": {
//     "attack": 0.01,
//     "decay": 0.2
//   },
//   "modulation": {
//     "type": "square"
//   },
//   "modulationEnvelope": {
//     "attack": 0.2,
//     "decay": 0.01
//   }
// }).toDestination();

//-------------------------------------------------------
// Create a new canvas to match the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);


}

//-------------------------------------------------------
function initializeAudio() {
  Tone.Master.volume.value = masterVolume;

  mixer = new Tone.Gain();

  // let reverb = new Tone.Reverb({
  //   wet: 0.5, // half dry, half wet mix
  //   decay: 30 // decay time in seconds
  // });

  // setup the audio chain:
  // mixer -> reverb -> Tone.Master
  // note that the synth object inside each pendulum get
  // connected to the mixer, so our final chain will look like:
  // synth(s) -> mixer -> reverb -> Tone.Master
  // mixer.connect(reverb);
  // reverb.toDestination();

  // quick way to get more notes: just glue 3 scales together
  // other 'flavours' to try:
  // major
  // minor
  // major pentatonic
  // the modes (eg: dorian, phrygian, etc..)
  // look at Tonal.ScaleType.names() to see a list of all supported
  // names

  let flavour = "minor pentatonic";
  // scale = Tonal.Scale.get("C3 " + flavour).notes;
  // scale = scale.concat(Tonal.Scale.get("C4 " + flavour).notes);
  scale = Tonal.Scale.get("C4 " + flavour).notes;



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
    text("Press TO START", width / 2, height / 2);
  } else {
    stroke(STROKE)
    background(52);
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i]

    }

    for (b of balls) {
      b.update();
      b.borders();
      b.render();
    }

  }

}



function keyPressed() {
  if (key == ' ') {
    balls = [];
  }
}

function startAudio() {
  if (!ready) {
    initializeAudio();
    ready = true;
    background(52);
  }

}

function touchStarted() {
  startAudio()
  let vel = map(mouseY, 0, height, 10, 1)
  let b = new Ball(mouseX, mouseY, vel, scale, width);
  if (balls.length > MAX_BALLS) {
    balls.shift()
  }
  balls.push(b)
  return false
}


function mouseMoved() {

}


//-------------------------------------------------------
function mousePressed() {
  // } else {
  //   // click again to start/stop...
  //   if (Tone.Transport.state == "paused") Tone.Transport.start();
  //   else if (Tone.Transport.state == "started") Tone.Transport.pause();
  // }
}

