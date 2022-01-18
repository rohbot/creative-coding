class Ball {
  constructor(x, y, vel, scale, w) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, vel);
    this.position = createVector(x, y);
    this.r = 3.0;
    this.maxspeed = 20; // Maximum speed
    this.maxforce = 0.5; // Maximum steering force
    this.path = [];
    this.dist = 0;

    // let freq = map(height, 0, height, 1.7, 2.1)

    // this.lfo = new Tone.LFO(this.freq);
    // this.lfo.start(1); // creating a delayed start time by 1
    // this.meter = new Tone.Meter();
    // this.meter.normalRange = true; // 0-1
    // this.lfo.connect(this.meter);

    let pos = floor(map(x, 0, w, 0, scale.length))
    this.note = scale[pos];
    console.log(this.note, pos)
    this.synth = new Tone.Synth().toDestination();
    

  }

  run() {
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
    // this.path.push({ x: this.position.x, y: this.position.y });
    if (this.path.length > 100) {
      // this.path.shift();
    }
  }
  // Wraparound
  borders() {
    let wrapped = false
    if (this.position.x < -this.r || this.position.x > width + this.r) {
      this.velocity.x = -this.velocity.x;
      wrapped = true
    }
    if (this.position.y < -this.r || this.position.y > height + this.r) {
      this.velocity.y = - this.velocity.y;
      this.synth.triggerAttackRelease(this.note, "8n");
      wrapped = true
    }
    if (this.position.y > height + this.r){
      
    }
    if(wrapped){
      this.path = []
    }
  }
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer)
    
    this.dist = this.position.dist(target)

    if(this.dist < 20){
     
      return true
    }
    return false
  }

  randomise(){
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(random(width), random(height));
    this.path = []
  }

  render() {
    // for (let i = 1; i < this.path.length; i++) {
    //   let b = this.path[i];
    //   let c = this.path[i - 1];
    //   line(b.x, b.y, c.x, c.y);
    // }
    // stroke(map(this.dist, 255, 0, 0, width/2))
    ellipse(this.position.x, this.position.y, 10);
  }
}
