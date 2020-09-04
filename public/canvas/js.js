function randomScroll(){
  var width = window.innerWidth;
  var height = window.innerHeight;

  var cwidth = $('#can').width();
  var cheight = $('#can').height();

  var maxx = cwidth - width;
  var maxy = cheight - height;

  var left = Math.floor(Math.random() * maxx);
  var top = Math.floor(Math.random() * maxy);
 
  $('html').scrollTop(top);
  $('html').scrollLeft(left);
}

$(document).ready(function(){
  randomScroll();
})

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    $('html,body').css('cursor','grab');
  }
});

window.addEventListener('keyup', function(e){
  if(e.keyCode == 32){
    $('html,body').css('cursor','default');
  } 
})