let canvas, lines;
let json;

class Line {
  constructor(r, g, b, a, shape) {
    this.diameter = 50;
    this.x = random(0+this.diameter/2,width-this.diameter/2);
    this.y = random(0+this.diameter/2,height-this.diameter/2);
    if (shape == "triangle"){
      this.x = random(0, width-this.diameter);
      this.y = random(0+this.diameter*.87,height);
    }
    this.v_x = random(1,2) * getSign();
    this.v_y = random(1,2) * getSign();
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.shape = shape;
    this.history = [];
  }

  update() {
    let point = createVector(this.x,this.y);
    if (this.history.length > 200){
      this.history.splice(0,1);
    }
    this.history.push(point);

    this.x = this.x + this.v_x;
    this.y = this.y + this.v_y;

    let left = false, right = false, up = false, down = false;

    if (this.shape == 'rect'){
      if (this.x-this.diameter*.79/2 < 0){
        left = true;
      }
      if (this.x + this.diameter*.79/2 > width){
        right = true;
      }
      if (this.y - this.diameter*.79/2 < 0){
        up = true;
      }
      if (this.y + this.diameter*.79/2 > height){
        down = true
      }
    }else if (this.shape == 'triangle'){
      if (this.x < 0){
        left = true;
      }
      if (this.x + this.diameter > width){
        right = true;
      }
      if (this.y - this.diameter*.87 < 0){
        up = true;
      }
      if(this.y > height){
        down = true;
      }
    }else{
      if (this.x - this.diameter/2 < 0){
        left = true;
      }
      if (this.x + this.diameter/2 > width){
        right = true;
      }
      if (this.y - this.diameter/2 < 0){
        up = true;
      }
      if (this.y + this.diameter/2 > height){
        down = true;
      }
    }
    if (left || right){
      this.v_x = -this.v_x;
    }
    if(up || down){
      this.v_y = -this.v_y;
    }
    if (left && up || left && down || right && up || right && down){
      console.log(this.shape +  " hit");
    }
  }

  draw() {
    stroke(0);
    let index;

    if (this.shape == 'rect'){
      let scale = this.diameter * .79;
      for (index = 0; index < this.history.length;  index++){
        fill('rgba('+this.r+','+this.g+','+this.b+','+this.a*((index+1)/this.history.length)*.2+')');
        rect(this.history[index].x, this.history[index].y, scale);
      }
      fill('rgba('+this.r+','+this.g+','+this.b+','+this.a+')');
      rect(this.x, this.y, scale);
    }else if (this.shape == 'triangle'){
      let scale = this.diameter;
      for (let index in this.history){
        fill('rgba('+this.r+','+this.g+','+this.b+','+this.a*((index+1)/this.history.length)*.2+')');
        triangle(this.history[index].x, this.history[index].y, this.history[index].x + scale, this.history[index].y, this.history[index].x + scale/2, this.history[index].y - .87*scale);
      }
      fill('rgba('+this.r+','+this.g+','+this.b+','+this.a+')');
      triangle(this.x, this.y, this.x + scale, this.y, this.x + scale/2, this.y - .87*scale);
    }else{
      for (let index in this.history){
        fill('rgba('+this.r+','+this.g+','+this.b+','+this.a*((index+1)/this.history.length)*.2+')');
        ellipse(this.history[index].x, this.history[index].y, this.diameter)
      }
      fill('rgba('+this.r+','+this.g+','+this.b+','+this.a+')');
      ellipse(this.x, this.y, this.diameter);
    }
  }

  clicked(){
    let d;
    if (this.shape == "triangle"){
      d = dist(mouseX, mouseY, this.x + this.diameter/2, this.y - this.diameter*.87/2);
    }else{
      d = dist(mouseX, mouseY, this.x, this.y)
    }
    if (d < this.diameter/2){
      this.v_x = random(1,2) * getSign();
      this.v_y = random(1,2) * getSign();
    }
  }
}

function shuffleArr(arr) {
  var currentIndex = arr.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}

function getSign(){
  var bool = Math.random() >= 0.5;
  if (bool == 0){
    return -1;
  }
  return 1;
}

function mousePressed(){
  let i;
  for (i = 0; i < lines.length; i++){
    lines[i].clicked();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('opacity','0.7');
  lines = [
  r_line = new Line(255,0,0,1,'ellipse'),
  b_line = new Line(0,0,255,1,'rect'),
  y_line = new Line(255,255,0,1,'triangle'),
  ];
  lines = shuffleArr(lines);
}

function draw() {
  background(255);

  ellipseMode(CENTER);
  rectMode(CENTER);
  for (let index in lines){
    lines[index].update();
    lines[index].draw();
  }
}

function getRandomImg(){
  let random = Math.floor(Math.random() * Math.floor(Object.keys(json).length - 1) + 1);
  return 'img/' + random + '.jpg';
}

function checkSize(){
  if (window.innerWidth < 992){
    $('#leftImg').removeClass('middle');
    $('#contentRow').removeClass('middle');
  }else{
    $('#leftImg').addClass('middle');
    $('#contentRow').addClass('middle');
  }
};

$(document).ready(async function(){
  checkSize();
  
  await $.ajax({
    mimeType: "application/json",
    url: "json/cinema.json",
    async: false,
    dataType: 'json',
    success: function(result) {
      $.each(result,function(){
        json = this;
      });
    }
  });

  var updateImg = setInterval(function(){
    $('#leftImg').attr('src', getRandomImg());
  }, 2000)
});

$(window).resize(function(){
  checkSize();
});
