let cWidth;
let cHeight;

const RESOLUTION_SCALE = 25;
const NOISE_SCALE = 0.1;
const TIME_SCALE = 0.005;
let FIELD_MAGNITUDE = 0.1;
const MOUSE_RADIUS = 50;

let cols, rows;
let time = 0;

let x, y, angle

let field = [];
let particles = [];

let mp = false;

function IX(x, y){
  return (x + y * cols);
}

function calculateField(){
  for (y = 0; y < rows; y++){
    for (x = 0; x < cols; x++){
      if(mp){
        v = createVector(mouseX - (x * RESOLUTION_SCALE), mouseY - (y * RESOLUTION_SCALE));
      }
      else{
        angle = noise(x * NOISE_SCALE, y * NOISE_SCALE, time * TIME_SCALE) * TWO_PI * 2;
        v = p5.Vector.fromAngle(angle);
      }
      v.setMag(FIELD_MAGNITUDE);
      field[IX(x,y)] = v;
      // drawField();
    }
  }
}

function drawField(){
  stroke(0);
  strokeWeight(1);
  push();
  translate(x * RESOLUTION_SCALE, y * RESOLUTION_SCALE);
  rotate(v.heading());
  line(0, 0, RESOLUTION_SCALE, 0);
  pop();
}

function drawParticles(){
  for(let i = 0; i < particles.length; i++){
    particles[i].follow(field);
    particles[i].show();
    particles[i].update();
  }
}

function setup(){
  cWidth = window.innerWidth;
  cHeight = window.innerHeight; 
  createCanvas(cWidth, cHeight);
  cols = ceil(width / RESOLUTION_SCALE);
  rows = ceil(height / RESOLUTION_SCALE);

  for (let i = 0; i < 2500; i++){
    particles[i] = new Particle();
  }

  field = new Array(cols * rows);
}

function draw(){
  // background(255);
  calculateField();

  drawParticles();
  
  time++;
  $('.fr').html(floor(frameRate()));
}

function mouseDragged(){
  mp = true;
}

function mouseReleased(){
  mp = false;
}

function windowResized(){
  cWidth = window.innerWidth;
  cHeight = window.innerHeight; 
  resizeCanvas(cWidth, cHeight);

  cols = ceil(width / RESOLUTION_SCALE);
  rows = ceil(height / RESOLUTION_SCALE);
}