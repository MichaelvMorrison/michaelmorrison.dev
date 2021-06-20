class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y >= this.y - this.h &&
      point.y <= this.y + this.h
    );
  }

  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    if (this.ne.insert(point)) return true;
    if (this.nw.insert(point)) return true;
    if (this.sw.insert(point)) return true;
    if (this.se.insert(point)) return true;
    consoe.log("1");
    return false;
  }

  subdivide() {
    let { x, y, w, h } = this.boundary;
    let ne_bound = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    let nw_bound = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    let sw_bound = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    let se_bound = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);

    this.ne = new QuadTree(ne_bound, CAPACITY);
    this.nw = new QuadTree(nw_bound, CAPACITY);
    this.sw = new QuadTree(sw_bound, CAPACITY);
    this.se = new QuadTree(se_bound, CAPACITY);
    this.divided = true;
  }

  query(range, found = []) {
    if (!this.boundary.intersects(range)) {
      return found;
    }

    for (const p of this.points) {
      if (range.contains(p)) {
        found.push(p);
      }
    }

    if (this.divided) {
      this.nw.query(range, found);
      this.ne.query(range, found);
      this.se.query(range, found);
      this.sw.query(range, found);
    }

    return found;
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    let { x, y, w, h } = this.boundary;
    rect(x, y, w * 2, h * 2);
    if (this.divided) {
      this.nw.show();
      this.ne.show();
      this.se.show();
      this.sw.show();
    }

    for (const p of this.points) {
      strokeWeight(5);
      stroke(255);
      point(p.x, p.y);
    }
  }
}
