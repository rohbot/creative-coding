class Ball {
  constructor(x, y) {
    this.acceleration = createVector(0, 0.1);
    this.velocity = createVector(random(-1,1), 0);
    this.position = createVector(x, y);
    this.r = 0.0;
    this.maxspeed = 20; // Maximum speed
    this.maxforce = 0.5; // Maximum steering force
    this.path = [];
    this.dist = 0;
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
    this.velocity.add(this.acceleration);
    // Limit speed
    // this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    // this.acceleration.mult(0);
    // this.path.push({ x: this.position.x, y: this.position.y });
    // if (this.path.length > 100) {
    //   // this.path.shift();
    // }
  }
  // Wraparound
  borders() {
    if (this.position.mag() >= 100) {
      // this.velocity.mult(0.95)
      // this.velocity.setHeading(-this.position.heading())
      this.velocity.mult(-1)
    }
    if(this.position.y > 102){
      this.position.y = 0
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      
    }
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
    ellipse(this.position.x, this.position.y,10);
    // console.log(this.position, this.position.mag())
  }
}
