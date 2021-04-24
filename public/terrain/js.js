const SCALE = 50;
let cols, rows;
let w = window.innerWidth;
let h = window.innerHeight;

let x_offset = 1500;
let y_offset = 500;

let x_noise, y_noise;

let y_loc = 0;

let heights;

function IX(x, y){
  return x + y * w;
}


function setup(){
  createCanvas(w, h, WEBGL);

  cols = (w + x_offset) / SCALE;
  rows = (h + y_offset) / SCALE;
  heights = new Array(w * h).fill(0);
}

function draw(){
  y_loc -= 0.1
  y_noise = y_loc;
  for (let y = 0; y < rows; y++){
    x_noise = 0;
    for (let x = 0; x < cols; x++){
      heights[IX(x, y)] = map(noise(x_noise,y_noise), 0, 1, -200, 200);
      x_noise += 0.2;
    }
    y_noise += 0.2;
  }


  background(0);
  stroke(255);
  noFill();

  rotateX(PI/3);

  translate((-w - x_offset)/2, (-h - y_offset)/2 - 200);
  for (let y = 0; y < rows-1; y++){
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++){
      vertex(x*SCALE, y*SCALE, heights[IX(x, y)]);
      vertex(x*SCALE, (y+1)*SCALE, heights[IX(x, y+1)]);
    }
    endShape();
  }
}

function windowResized(){
  w = window.innerWidth;
  h = window.innerHeight;

  cols = (w + x_offset) / SCALE;
  rows = (h + y_offset) / SCALE;
  heights = new Array(w * h).fill(0);

  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      heights[IX(x, y)] = random(-10, 10);
    }
  }

  resizeCanvas(w, h);
}