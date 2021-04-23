const SCALE = 10;
const ITER = 4;

let N = Math.ceil(window.innerWidth / SCALE);
let M = Math.ceil(window.innerHeight / SCALE);

let t = 0;
let hue_offset;

let cx_prev = 0;
let cy_prev = 0;

let cx = 0;
let cy = 0;

let diff = 0.0000001;

let fluid;

function setup() {
  hue_offset = random(0,360);
  background(0);
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(60);
  if (window.innerWidth < 1000){
    diff = 0.000004;
  }
  fluid = new Fluid(0.5, diff, 0);


}

function draw() {
  background(0);

  cx_prev = cx;
  cy_prev = cy;

  cx = int(mouseX / SCALE);
  cy = int(mouseY / SCALE);
  fluid.addDensity(cx, cy, 600);

  t += 0.01;
  fluid.addVelocity(cx, cy, cx-cx_prev, cy-cy_prev);

  fluid.step();
  fluid.renderDensity();
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  N = Math.ceil(window.innerWidth / SCALE);
  M = Math.ceil(window.innerHeight / SCALE);
}
