let f;
let qt;
let globalSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(30);
  f = new Flock();
}

function draw() {
  background(0);

  qt = new QuadTree(new Rectangle(width / 2, height / 2, width, height));
  f.fillQuadTree();

  f.iterate();

  if (mouseIsPressed) {
    f.addBoid(new Boid(mouseX - width / 2, mouseY - height / 2));
  }

  // qt.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
