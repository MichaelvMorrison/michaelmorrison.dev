class Flock {
  constructor() {
    this.boids = [];
  }

  addBoid(boid) {
    this.boids.push(boid);
  }

  fillQuadTree() {
    for (const boid of this.boids) {
      qt.insert(new Item(boid.pos.x, boid.pos.y, boid));
    }
  }

  iterate() {
    for (const boid of this.boids) {
      boid.update();
      boid.flock();
      boid.edges();
      boid.show();
    }
  }
}
