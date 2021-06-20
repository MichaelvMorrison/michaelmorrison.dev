const PERCEPTION_RADIUS = 20;
const MAX_FORCE = 0.2;
const MAX_SPEED = 4;

const SEPARATION_CONSTANT = 0.5;
const COHESION_CONSTANT = 0;
const ALIGNMENT_CONSTANT = 2;

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(0, MAX_SPEED));
    this.acc = createVector();
    this.perc = PERCEPTION_RADIUS;
    this.maxForce = MAX_FORCE;
    this.maxSpeed = MAX_SPEED;
  }

  edges() {
    if (this.pos.x > width / 2) this.pos.x = -width / 2;
    if (this.pos.x < -width / 2) this.pos.x = width / 2;
    if (this.pos.y > height / 2) this.pos.y = -height / 2;
    if (this.pos.y < -height / 2) this.pos.y = height / 2;
  }

  flock() {
    let separate = createVector();
    let cohere = createVector();
    let align = createVector();

    let avg_diff = createVector();
    let avg_pos = createVector();
    let avg_vel = createVector();

    let count = 0;
    for (const item of qt.query(
      new Circle(this.pos.x, this.pos.y, PERCEPTION_RADIUS)
    )) {
      let boid = item.data;
      let dist = this.pos.dist(boid.pos);
      if (dist > 0 && dist <= this.perc) {
        let diff = p5.Vector.sub(this.pos, boid.pos);
        dist == 0 ? diff.setMag(0) : diff.div(dist);
        avg_diff.add(diff);
        avg_pos.add(boid.pos);
        avg_vel.add(boid.vel);
        count++;
      }
    }

    if (count > 0) {
      avg_diff.div(count);
      avg_pos.div(count);
      avg_vel.div(count);

      separate = avg_diff.setMag(this.maxSpeed);
      separate.sub(this.vel);
      separate.limit(this.maxForce);

      cohere = avg_pos.sub(this.pos);
      cohere.setMag(this.maxSpeed);
      cohere.sub(this.vel);
      cohere.limit(this.maxForce);

      align = avg_vel.setMag(this.maxSpeed);
      align.sub(this.vel);
      align.limit(this.maxForce);
    }

    this.acc.add(separate.mult(SEPARATION_CONSTANT));
    this.acc.add(cohere.mult(COHESION_CONSTANT));
    this.acc.add(align.mult(ALIGNMENT_CONSTANT));
  }

  show() {
    strokeWeight(1);
    stroke(255);
    point(this.pos.x, this.pos.y);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.set(0, 0);
  }
}
