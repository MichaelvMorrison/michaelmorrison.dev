let speed = 50;
let i = 0;
let text;
let author;

var sound = new Howl({
  src: ['ambience.mp3'],
  onplayerror: function() {
    sound.once('unlock', function() {
      sound.play();
    });
  }
});



function getStory(){
  $.get("/getStory",function(data, status){
    text = data.text;
    author = data.author
    readText();
  })
}

function readAuthor(){
  if(i < author.length){
    $("#author").append(author.charAt(i));
    i++;
    setTimeout(readAuthor, speed);
  }
}

function readText(){
  if (i < text.length) {
    $("#text").append(text.charAt(i));
    i++;
    setTimeout(readText, speed);
  }else if(i == text.length) {
    i = 0;
    readAuthor();
  }
}



$(window).on('load', function(){
  $("body").trigger("click");
  getStory();
  sound.play();
});