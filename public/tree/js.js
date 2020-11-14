let a;

function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){
  a = (1 - mouseX/windowWidth) * TWO_PI;
  b = (1 - mouseY/windowHeight) * windowHeight/2;
  background("white");
  stroke("black");
  strokeWeight(b/100);
  translate(windowWidth/2, height)
  branch(b)
}

function branch(len){
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len > 5) {
    push();
    rotate(a);
    branch(len*0.67);
    pop();
    push();
    rotate(-a);
    branch(len * 0.67);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}