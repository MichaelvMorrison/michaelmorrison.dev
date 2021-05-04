let cWidth;
let cHeight;

const RESOLUTION_SCALE = 50;
const NOISE_SCALE = 0.1;
const TIME_SCALE = 0.005;
const FIELD_MAGNITUDE = 0.1;
let NUM_PARTICLES;
let MAX_SPEED;

let cols, rows;
let time = 0;

let x, y, angle

let field = [];
let particles = [];

let inspire = false;
let daunt = false;
let erase = false;

function IX(x, y){
  return (x + y * cols);
}

function calculateField(){
  for (y = 0; y < rows; y++){
    for (x = 0; x < cols; x++){
      if(inspire){
        v = createVector(mouseX - (x * RESOLUTION_SCALE), mouseY - (y * RESOLUTION_SCALE));
      }
      else if(daunt){
        v = createVector(-(mouseX - (x * RESOLUTION_SCALE)), -(mouseY - (y * RESOLUTION_SCALE)));
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
  if (daunt){
    daunt = false;
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

function keyPressed(){
  if(keyCode === 32){
    erase = true;
  }
}

function mouseDragged(){
  if (keyIsDown(CONTROL)){
    daunt = true;
  }else{
    inspire = true;
  }
}

function mouseReleased(){
  daunt = false;
  inspire = false;
}

function setup(){
  cWidth = window.innerWidth;
  cHeight = window.innerHeight; 
  NUM_PARTICLES = floor(cWidth * cHeight * 0.00120563);
  MAX_SPEED = ceil(cWidth * cHeight * 0.00000193);
  createCanvas(cWidth, cHeight);
  cols = ceil(width / RESOLUTION_SCALE);
  rows = ceil(height / RESOLUTION_SCALE);

  for (let i = 0; i < NUM_PARTICLES; i++){
    particles[i] = new Particle();
  }

  field = new Array(cols * rows);
}

function draw(){
  if (erase){
    background(255);
    erase = false;
  }
  calculateField();

  drawParticles();
  
  time++;
  $('.fr').html(floor(frameRate()));
}

function windowResized(){
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;
  NUM_PARTICLES = floor(cWidth * cHeight * 0.00120563);
  MAX_SPEED = ceil(cWidth * cHeight * 0.00000193);
  resizeCanvas(cWidth, cHeight);

  cols = ceil(width / RESOLUTION_SCALE);
  rows = ceil(height / RESOLUTION_SCALE);

  for (let i = 0; i < NUM_PARTICLES; i++){
    particles[i] = new Particle();
  }

  field = new Array(cols * rows);
}

$(window).on("load", function(){
  function animateTips(){
    $('#tips').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 1000, 'swing');
  }

  function animateTipsOut(){
    $('#tips').animate({
      height: 'toggle',
      opacity: 'toggle'
    }, 1000, 'swing');

    $('#help').animate({
      opacity: 'toggle'
    }, 1000, 'swing');
  }

  setTimeout(animateTips, 200);
  setTimeout(animateTipsOut, 5200);

  $('#help').on('click', function(){
    animateTips();
  })
  
});
