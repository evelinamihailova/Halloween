var bg = $('.bg');
var moodSwitch = $('#moodSwitch');
var depressedAudio = new Audio('../sounds/Hl.mp3');
var happyAudio = new Audio('../sounds/Maniacal Witches Laugh.mp3');
var evilAudio = new Audio('../sounds/Demon_Your_Soul_is_mine.mp3');
var customAudio = new Audio('../sounds/Pain.mp3');
var hideFaces = function(){
  $('#customFace').hide();
  $('#happyFace').hide();
  $('#evilFace').hide();
  $('#depressedFace').hide();
};
var setMood = function (mood) {
  switchPumpkin(mood);
  bg.attr('class', 'bg' + ' ' + mood);
  moodSwitch.attr('class', 'multistate-switch' + ' ' + mood);
};

var switchPumpkin = function (mood) {
  hideFaces();
  $('#' + mood + 'Face').show();
  switch(mood){
    case "depressed":
      depressedAudio.play();
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
};
moodSwitch.click(function(e) {
  var mood, elm = $(e.target);

  if(elm.is("li") ){
    mood = elm.data("mood");
  } else if (elm.is("span")){
    mood = elm.parentElement.data("mood");
  }
  if(mood) setMood(mood);
});

$(document).ready(function() {
  //show popup with question door
  
  setMood('depressed');
});