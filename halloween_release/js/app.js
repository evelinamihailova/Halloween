$(document).foundation();

var bg = $('.bg');
var sadAudio = new Audio('../sounds/Hl.mp3');
var happyAudio = new Audio('../sounds/Maniacal Witches Laugh.mp3');
var evilAudio = new Audio('../sounds/Demon_Your_Soul_is_mine.mp3');
var customAudio = new Audio('../sounds/Pain.mp3');
var hideFaces = function(){
  $('#customFace').hide();
  $('#happyFace').hide();
  $('#evilFace').hide();
  $('#sadFace').hide();
};
var audio = false;

$(document).ready(function() { 
  $('#trickOrTreat').foundation('open');
  
  $('#showTrick').click(function(){ setMood('evil'); });
  $('#showTreat').click(function(){ setMood('happy'); });
  $('#showCustom').click(function(){ setMood('custom'); });
  
  $('#moodSwitch').click(function(e) {
    var mood, elm = $(e.target);

    if(elm.is('li') ){
      mood = elm.data('mood');
    } else if (elm.is('span')){
      mood = elm.parent().data('mood');
    }
    if(mood) setMood(mood);
  });
  
  var matrix = $('#ledMatrix').data('matrix');
  ledMatrix(matrix);
  
  $('#colorPicker').submit(function(e) {
    e.preventDefault();
    var color = $(this).find('input[type="color"]').val();
//    $.ajax({
//           type: "POST",
//           url: url,
//           data: $("#idForm").serialize(), // serializes the form's elements.
//           success: function(data){}
//         });

  });
  $('.lens-container svg').click(function() {
    //take picture
    
  });
  
  toScrollOrNotToScroll($('#ledMatrix p'));
  
  $('#ledMatrix p').click(function() {
    var text = $(this).html();
    $(this).replaceWith('<input value="'+text+'" type=text>');
    console.log(this);
    $(this).focus();
  });

  $('#ledMatrix input').keypress(function(e) {
    var
    var text = $(this).val();
    if(e.which == 13) {
      $(this).blur();
      $(this).replaceWith('<p>'+text+'</p>');
      toScrollOrNotToScroll('#ledMatrix p');
    }
  });
});

function toScrollOrNotToScroll(elm) {    
  if($(elm).html().length > 3){
    $(elm).addClass('scrolling');
  } else {
    $(elm).removeClass('scrolling');
  }
}

function setMood(mood) {
  $('.main').removeClass('hide');
  switchPumpkin(mood);
  bg.attr('class', 'bg' + ' ' + mood);
  $('#moodSwitch').attr('class', 'multistate-switch' + ' ' + mood);
}

function switchPumpkin(mood) {
  hideFaces();
  $('#' + mood + 'Face').show();
  if(audio){
    switch(mood){
      case "sad":
        sadAudio.play();
      break;
      case "evil":
        evilAudio.play();
      break;
      case "happy":
        happyAudio.play();
      break;
      case "custom":
        customAudio.play();
      break;
    }
  }
}

// MATRIX

function ledMatrix(amount) {
  var matrix = amount;
  var rows = 7;
  var columns = 7;
  var html='', lines='';
  for(i=0;i<rows;i++){
    lines += '<li>';
    for(j=0;j<columns;j++){
      lines += '<div class="led"></div>'
    }
    lines += '</li>';
  }
  var frame = '<ul>' + lines + '</ul>';
  for(i=0;i<matrix;i++){
    html+=frame;
  }
  html+='<div class="text"><p>Booo</p>';
  $('#ledMatrix').html(html); 
}