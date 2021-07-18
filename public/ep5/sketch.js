let boxSize;
let headerSize = 0
let launchpad;
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


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  
  if ((windowHeight - headerSize) > windowWidth) {
    boxSize = (windowWidth ) / 8;
  } else {
    boxSize = (windowHeight - headerSize) / 8;
  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
}

function drawGrid() {

  clear();
  fill(0)

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 8; i++) {
      if (keys[j][i]) {
        fill(0, 255, 0);
      } else {
        fill(255);
      }

      rect(i * boxSize, (j * boxSize) + headerSize, boxSize, boxSize);
    }
  }
}  

function padPressed(pad){
  
  let row = pad.row -1;
  let col = pad.column - 1
  // console.log(row, col)
  if (keys[row][col]){
    keys[row][col] = 0
    launchpad.ledOff(pad) 
  }else{
    keys[row][col] = 1
    launchpad.ledOn(pad, new Color(3, 0))  
  }
 
}

function draw() {
  drawGrid();
  // moveBalls()
  
}

function mouseClicked() {
  let col = Math.floor(mouseX / boxSize);
  let row = Math.floor(mouseY / boxSize);
  if (col >= 0 && col < 8 && row >= 0 && row < 8) {
    console.log(col, row);
    let pad = new Pad(row + 1, col + 1);
    if(keys[row][col]){
      keys[row][col] = 0
      launchpad.ledOff(pad)
    }else{
      keys[row][col] = 1
      launchpad.ledOn(pad, new Color(3, 0)) 
    }

  }

}

function onMIDISuccess(midiAccess) {
  launchpad = autoDetectLaunchpad(midiAccess);

  // Clear initial launchpad state
  launchpad.clear();

  launchpad.onPadPress(pad => padPressed(pad));

  launchpad.onControlPadPress(pad => console.log(pad));
}

function onMIDIFailure(msg) {
  console.log('Failed to get MIDI access - ' + msg);
}
