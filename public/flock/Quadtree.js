const CAPACITY = 10;

class Item {
  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(item) {
    return (
      item.x >= this.x - this.w &&
      item.x <= this.x + this.w &&
      item.y >= this.y - this.h &&
      item.y <= this.y + this.h
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

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = r * r;
  }

  contains(item) {
    let d = Math.pow(item.x - this.x, 2) + Math.pow(item.y - this.y, 2);
    return d <= this.rSquared;
  }

  intersects(range) {
    var xDist = Math.abs(range.x - this.x);
    var yDist = Math.abs(range.y - this.y);

    var r = this.r;
    var w = range.w;
    var h = range.h;

    var edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}

class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.items = [];
    this.divided = false;
  }

  insert(item) {
    if (!this.boundary.contains(item)) {
      return false;
    }

    if (this.items.length < this.capacity) {
      this.items.push(item);
      return true;
    }
    if (!this.divided) {
      this.subdivide();
    }
    if (this.ne.insert(item)) return true;
    if (this.nw.insert(item)) return true;
    if (this.sw.insert(item)) return true;
    if (this.se.insert(item)) return true;
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
    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (const item of this.items) {
      if (range.contains(item)) {
        found.push(item);
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

    for (const item of this.items) {
      strokeWeight(1);
      stroke(255);
      point(item.x, item.y);
    }
  }
}
