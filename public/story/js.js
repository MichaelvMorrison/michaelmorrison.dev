let delay = 50;
let paragraph = 0;
let letter = 0;
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
    author = data.author;
    readText();
  })
}

function readText(){
  for(i in text){
    $("body").append("<p id='p"+i+"'></p>");
  }
  $("body").append("<p id='author'></p>");
  readParagraph();
}

function readAuthor(){
  if(letter < author.length){
    $("#author").append(author.charAt(letter));
    letter++;
    setTimeout(readAuthor, delay);
  }
}

function readParagraph(){
  if (letter < text[paragraph].length) {
    $("#p" + paragraph).append(text[paragraph].charAt(letter));
    letter++;
    setTimeout(readParagraph, delay);
  }else if(letter == text[paragraph].length) {
    letter = 0;
    paragraph++;
    if(paragraph == text.length){
      $("#author").append("- ");
      readAuthor();
    }
    else{
      readParagraph(); 
    }
  }
}



$(window).on('load', function(){
  $("body").trigger("click");
  getStory();
  sound.play();
});