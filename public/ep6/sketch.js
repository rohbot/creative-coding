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

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);

  if (windowHeight - headerSize > windowWidth) {
    boxSize = windowWidth / 8;
  } else {
    boxSize = (windowHeight - headerSize) / 8;
  }

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  ball = createVector(random(boxSize * 8), random(boxSize * 8));
}

function onMIDISuccess(midiAccess) {
  launchpad = autoDetectLaunchpad(midiAccess);

  // Clear initial launchpad state
  launchpad.clear();

  launchpad.onPadPress((pad) => padPressed(pad));

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
  if (col > 7){
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
  ball.x = (col * boxSize) +  boxSize / 2 ;
  ball.y = row * boxSize +  boxSize / 2 ;
  path.push({ x: ball.x, y: ball.y });
  // console.log(row, col)
  if (keys[row][col]) {
    keys[row][col] = 0;
    launchpad.ledOff(pad);
  } else {
    keys[row][col] = 1;
    launchpad.ledOn(pad, new Color(3, 0));
  }
  // moveBall();
}

function drawBall() {
  for (let i = 1; i < path.length; i++) {
    let b = path[i];
    let c = path[i-1]
    line(b.x, b.y, c.x, c.y);
  }
  ellipse(ball.x, ball.y, ball_size);
}

function moveBall() {
  xoff = xoff + map(mouseX, 0, boxSize*8, 0.001, 0.05);
  ball.x = noise(xoff) * boxSize * 8;
  ball.y = noise(xoff + 1000) * boxSize * 8;
  path.push({ x: ball.x, y: ball.y });
  if(path.length > 100){
    path.shift()
  }
}

function draw() {
  moveBall();
  drawGrid();
  drawBall();
}

function mouseClicked() {
  let col = Math.floor(mouseX / boxSize);
  let row = Math.floor(mouseY / boxSize);
  ball.x = (col * boxSize) +  boxSize / 2 ;
  ball.y = row * boxSize +  boxSize / 2 ;
  path.push({ x: ball.x, y: ball.y });
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
