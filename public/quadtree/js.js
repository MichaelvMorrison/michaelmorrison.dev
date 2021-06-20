const CAPACITY = 4;

let boundary;
let qt;

let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2);
  qt = new QuadTree(boundary, CAPACITY);
}

function draw() {
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qt.insert(m);
  }

  background(0);
  qt.show();

  stroke(255, 0, 0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 107, 75);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  points = qt.query(range);
  for (let p of points) {
    strokeWeight(10);
    point(p.x, p.y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  boundary = new Rectangle(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2,
    windowHeight / 2
  );
  qt = new QuadTree(boundary, CAPACITY);
}
