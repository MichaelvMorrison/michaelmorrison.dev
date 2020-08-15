var backgroundColor = ['#292929','#fff'];
var textColor = ['#fff','#292929'];
var onOff = ['on','off'];
var planetColor = ['AliceBlue','Yellow'];
var lights = true;

$(document).ready(function(){
  $('.lights').on('click',function(){
    $('.lights').html(onOff[+ lights]);
    lights = !lights;
    $('.circle').css('background-color',planetColor[+ lights]);
    $('body').css('color',textColor[+ lights]);
    $('body').css('background-color',backgroundColor[+ lights]);
  });
});
