let cWidth;
let cHeight;

const RESOLUTION_SCALE = 50;
const NOISE_SCALE = 0.1;
const TIME_SCALE = 0.005;
const FIELD_MAGNITUDE = 0.1;
let NUM_PARTICLES;
let MAX_SPEED;

let particle_color;

let cols, rows;
let time = 0;

let x, y, angle

let field = [];
let particles = [];

let inspire = false;
let daunt = false;
let erase = false;
let path = true;
let reset_path = false;
let opacity = 5;

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
    particles[i].show(particle_color);
    particles[i].update();
  }
}

function keyPressed(){
  if(keyCode === 8){ // Backspace
    erase = true;
  }else if(keyCode === 32){ //space
    if (path){
      particle_color.setAlpha(opacity * 5);
    }else{
      particle_color.setAlpha(opacity);
      reset_path = true;
    }
    path = !path;
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
  particle_color = color(random(0,255), random(0,255), random(0,255), opacity);
}

function draw(){
  if (erase || !path){
    background(255);
    erase = false;
  }
  calculateField();

  drawParticles();

  if(reset_path){
    background(255);
    reset_path = false;
  }
  
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

  function handleTips(){
    function handleSlider(){
      $( "#alpha" ).slider({
      value: 5,
      min: 0,
      max: 25,
      });

      $("#alpha").on("slide", function(event, ui) {
        opacity = ui.value;
        particle_color.setAlpha(opacity);
      });
    }

    function animateTips(){
    $('#tips-container').animate({
    height: 'toggle',
    opacity: 'toggle'
    }, 1000, 'swing');
    }

    function animateTipsOut(){
    $('#tips-container').animate({
    height: 'toggle',
    opacity: 'toggle'
    }, 1000, 'swing');

    if($('#help').css("display") == "none"){
    $('#help').animate({
      opacity: 'toggle'
    }, 1000, 'swing');
    }

    }

    $('#help').on('click', function(){
    animateTips();
    });

    $('#x').on('click', function(){
    animateTipsOut();
    })

    setTimeout(animateTips, 200);

    ColorPicker($('#cp')[0],function(hex, hsv, rgb) {
      particle_color = color('rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity/255 + ')');
    });

    handleSlider();
  }

  handleTips();
});
