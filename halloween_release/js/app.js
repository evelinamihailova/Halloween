var mood = '';
var bg = $('.bg');
var moodSwitch = $('#moodSwitch');

var setMood = function (mood) {
  switch(mood) {
    case 'evil':
        bg.attr('class', 'bg evil');
      break;
    case 'happy':
      
        bg.attr('class', 'bg happy');
      break;
    case 'naughty':
      
        bg.attr('class', 'bg naughty');
      break;
    default: bg.attr('class', 'bg depressed');
  }
};
      
$(document).ready(function() {
  setMood();
});
$(moodSwitch).click(function(e) {
  debugger;
  setMood();
});