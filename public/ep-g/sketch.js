let boxSize;
let headerSize = 0;
let launchpad;
let ball;
let ball_size = 10;
let path = [];
let xoff = 0.0;
let keys = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

let ready = false;
let masterVolume = -9;
let balls = []

let MAX_BALLS = 50;

let STROKE = 255;

let scale;

let mixer;

let synth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  if (windowHeight - headerSize > windowWidth) {
    boxSize = windowWidth / 8;
  } else {
    boxSize = (windowHeight - headerSize) / 8;
  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

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

  synth = new Tone.Synth().toDestination()

}


function startAudio() {
  if (!ready) {
    initializeAudio();
    ready = true;
    background(255);
  }

}


function onMIDISuccess(midiAccess) {
  launchpad = autoDetectLaunchpad(midiAccess);

  // Clear initial launchpad state
  launchpad.clear();

  launchpad.onPadPress((pad) => padPressed(pad));
  launchpad.onPadRelease((pad) => padReleased(pad));

  launchpad.onControlPadPress((pad) => console.log(pad));
}

function onMIDIFailure(msg) {
  console.log("Failed to get MIDI access - " + msg);
}

function drawGrid() {
  clear();
  fill(0);

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      if (keys[j][i]) {
        fill(0, 255, 0);
        rect(i * boxSize, j * boxSize + headerSize, boxSize, boxSize);
      } else {
        fill(255);
      }


    }
  }
}



function padPressed(pad) {
  let row = pad.row - 1;
  let col = pad.column - 1;
  if (col > 7) {
    clear();
    launchpad.clear();
    keys = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    return
  }
  // ball.x = (col * boxSize) +  boxSize / 2 ;
  // ball.y = row * boxSize +  boxSize / 2 ;
  // path.push({ x: ball.x, y: ball.y });
  // console.log(row, col)
  // if (keys[row][col]) {
  //   keys[row][col] = 0;
  //   launchpad.ledOff(pad);
  // } else {
  keys[row][col] = 1;
  launchpad.ledOn(pad, new Color(3, 0));
  console.log(row)
  let note = scale[col];
  synth.triggerAttackRelease(note, "8n");

  //}
  // moveBall();
}

function padReleased(pad) {
  let row = pad.row - 1;
  let col = pad.column - 1;
  launchpad.ledOff(pad)
}

function draw() {
  if (!ready) {
    background(52);
    fill(255);
    textAlign(CENTER);
    text("Press TO START", width / 2, height / 2);
  } else {
    mainDraw()
  }
}

function mainDraw() {
  drawGrid();
  stroke(STROKE)
  background(52);
  for (let i = 0; i < touches.length; i++) {
    let touch = touches[i]

  }

}

function mouseClicked() {
  if (!ready) {
    startAudio()
    return;
  }
  let col = Math.floor(mouseX / boxSize);
  let row = Math.floor(mouseY / boxSize);
  // ball.x = (col * boxSize) + boxSize / 2;
  // ball.y = row * boxSize + boxSize / 2;
  // path.push({ x: ball.x, y: ball.y });
  if (col >= 0 && col < 8 && row >= 0 && row < 8) {
    //console.log(col, row);
    let pad = new Pad(row + 1, col + 1);
    if (keys[row][col]) {
      keys[row][col] = 0;
      launchpad.ledOff(pad);
    } else {
      // keys[row][col] = 1;
      launchpad.ledOn(pad, new Color(3, 0));
    }
  }
}
