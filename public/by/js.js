$(document).ready(function(){
  console.log('works');

  $('#submit').on('click',function(){
    if($('#howmany').val()){
      var howmany = parseInt($('#howmany').val());
      $('#all').html('');
      for (var i = 0; i < howmany; i++){
        $('#all').append('bless you <br />');
      }
    }
  });
});
