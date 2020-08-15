var json;

// Fisher-Yates Shuffle
function shuffle(arr) {
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

function addShots(){
  var numShots = Object.keys(json).length;
  var arr = []
  var i;
  for (i = 1; i <= numShots; i++){
    arr.push(i);
  }
  shuffle(arr);
  var arrLength = 5;
  arr.length = arrLength;
  for (i = 0; i < arrLength; i++){
    console.log(i);
    var str = '';
    str += '<section id="'+arr[i]+'" class="shot">';
    str += '  <div class="shot-text">';
    str += '    <h1 class="shot-number">'+arr[i]+'/'+numShots+'</h1>';
    str += '    <h1 class="shot-date">'+json[arr[i]].date+'</h1>';
    str += '  </div>'
    str += '</section>';
    $('.shots').append(str);
    $('#'+arr[i]).vide({
      mp4: 'vid/' +arr[i]+'.mp4',
      poster: 'img/'+arr[i]+'.jpg'
    },{
      posterType : 'jpg'
    });
  }
};

$(document).ready(async function(){

  await $.ajax({
    mimeType: "application/json",
    url: "json/index.json",
    async: false,
    dataType: 'json',
    success: function(result) {
      $.each(result,function(){
        json = this;
      });
    }
  });

  console.log(json[1]);

  addShots();
});
