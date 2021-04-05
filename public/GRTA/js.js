let framerate = 10;
let grta, panel;

function resizeGRTA(){
  grta = {
    xoffeset: windowWidth*.1,
    yoffset: windowHeight*.1
  }
  
  panel = {
    width: windowWidth*.32,
    height: windowHeight*.2375
  }
}

function createFrame(w, h){
  fill('#F364BE');
  stroke('#541F30');
  rect(windowWidth/2, windowHeight/2, panel.width, panel.height, 4);
}

function setup(){
  resizeGRTA();
  rectMode(CENTER);
  frameRate(framerate);
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background('#F364BE');
  createFrame();
  // let x = windowWidth/68;
  // let y = windowHeight/50;
  // for (let i = 0; i < windowWidth; i+=x*2){
  //   for (let j = 0; j < windowHeight; j+=y*2){
  //     button(i, j, x, 5, Math.round(Math.random()));
  //   }
  // }
} 

function button(x, y, s, r, on){
  fill('black');
  square(x, y, s, r);
  if (on){
    fill('darkgrey');
    square(x, y, s-(.1*s), r);
    fill('white');
    square(x, y, s-(.15*s), r);
  }
  else{
    fill('#541F30');
    square(x, y, s-(.1*s), r);
    fill('#A74583');
    square(x, y, s-(.15*s), r);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resizeGRTA();
}