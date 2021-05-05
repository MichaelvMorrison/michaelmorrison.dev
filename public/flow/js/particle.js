class Particle {
  constructor(){
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.vMax = MAX_SPEED;
    this.prevPos = this.pos.copy();
  }

  update(){
    this.vel.add(this.acc);
    this.vel.limit(this.vMax);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.wrapEdges();
  }

  applyForce(f){
    this.acc.add(f);
  }

  show(color){
    stroke(color);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrevious();
  }

  updatePrevious(){
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
  
  wrapEdges(){
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrevious();
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrevious();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrevious();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrevious();
    }
  }

  follow(field){
    let x = floor(this.pos.x / RESOLUTION_SCALE);
    let y = floor(this.pos.y / RESOLUTION_SCALE);
    let force = field[IX(x, y)];
    this.applyForce(force);
  }
}