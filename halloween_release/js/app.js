$(document).foundation();

var sadAudio = new Audio('../sounds/Hl.mp3');
var happyAudio = new Audio('../sounds/Maniacal Witches Laugh.mp3');
var evilAudio = new Audio('../sounds/Demon_Your_Soul_is_mine.mp3');
var customAudio = new Audio('../sounds/Pain.mp3');

var hideFaces = function () {
  $('#customFace').hide();
  $('#happyFace').hide();
  $('#evilFace').hide();
  $('#sadFace').hide();
};
var audio = false;

function switchOffPupkin() {
  //TODO: ?
}

function toScrollOrNotToScroll() {
  var elm = $('#ledMatrixText p'), width = elm.html().length * 54, speed = elm.html().length * 500;
  elm.removeClass('hide').width(width);
  if ($(elm).html().length > 3) {
    elm.css('animation', 'scroll-left ' + speed + 'ms linear infinite');
  } else {
    elm.css('animation', 'none');
  }
}

function switchPumpkin(mood) {
  hideFaces();
  $('#' + mood + 'Face, #ledMatrixText p').show();
  toScrollOrNotToScroll();
  switch (mood) {
  case "sad":
    if (audio) { sadAudio.play(); }
    $('#ledMatrixText p').hide();
    switchOffPupkin();
    break;
  case "evil":
    if (audio) { evilAudio.play(); }
    break;
  case "happy":
    if (audio) { happyAudio.play(); }
    break;
  case "custom":
    if (audio) { customAudio.play(); }
    break;
  }
}

function setMood(mood) {
  $('.main').removeClass('hide');
  switchPumpkin(mood);
  $('.bg').attr('class', 'bg' + ' ' + mood);
  $('#moodSwitch').attr('class', 'multistate-switch' + ' ' + mood);
}

function ledMatrix(amount) {
  var matrix = amount, rows = 7, columns = 7, html = '', lines = '', i, j, frame = '';
  for (i = 0; i < rows; i++) {
    lines += '<li>';
    for (j = 0; j < columns; j++) {
      lines += '<div class="led"></div>';
    }
    lines += '</li>';
  }
  frame = '<ul>' + lines + '</ul>';
  for (i = 0; i < matrix; i++) {
    html += frame;
  }
  $('#ledMatrix .text').prepend(html);
}
function hexToRGB(hex) {
  var r = hex >> 16;
  var g = hex >> 8 & 0xFF;
  var b = hex & 0xFF;
  return rgb = { 'r': r, 'g': g, 'b': b};
}
function setColor(color, pulsate) {
  var hex = color.replace('#', '0x'), prefixes = ["-webkit-", "-moz-", ""], css = "";
  var rgb = hexToRGB(hex);

  // TODO: save value and on success
  for (var i in prefixes){
    css += prefixes[i] + 'box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset rgb(' + rgb.r * 0.25 + ', ' + rgb.g * 0.5 + ', ' + rgb.b * 0.75 + ') 0 -1px 9px, rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.8) 0 2px 12px;\
             background-color: ' + color + ';';
  }

  $("#LEDs .led").attr('style', css);

  if(pulsate){
    $("#LEDs .led").addClass('pulsate');
  } else {
    $("#LEDs .led").removeClass('pulsate');
  }
}

$(document).ready(function() {
  var matrix = $('#ledMatrix').data('matrix');
  ledMatrix(matrix);

  $('#trickOrTreat').foundation('open');

  $('#showTrick').click(function(){setMood('evil');});
  $('#showTreat').click(function(){setMood('happy');});
  $('#showCustom').click(function(){setMood('custom');});
  $('#moodSwitch').click(function(e) {
    var mood, elm = $(e.target);

    if(elm.is('li') ){
      mood = elm.data('mood');
    } else if (elm.is('span')){
      mood = elm.parent().data('mood');
    }
    if(mood) setMood(mood);
  });

  $('#colorPicker').submit(function(e) {
    e.preventDefault();
    var color = $(this).find('input[name="color"]').val(), pulsate = false;
    if($(this).find('input[name="pulsate"]:checked').length !== 0) {
      pulsate = true;
    }
    setColor(color, pulsate);
  });

  $('.lens-container svg').click(function() {
    // TODO: take picture and on success {
      // TODO: add picture to gallery
      // TODO: update gallery icon
    // }
  });

  $('#ledMatrixText').click(function() {
    $('#ledMatrixText p').addClass('hide');
    $('#ledMatrixText input').removeClass('hide').focus();
  });

  $('#ledMatrixText input').blur(function() {
    toScrollOrNotToScroll();
    $('#ledMatrixText input').addClass('hide');
  });

  $('#ledMatrixText input').keypress(function(e) {
    if(e.which == 13) {
      // TODO: save value and on success {
        $('#ledMatrixText p').html($(this).val());
        $(this).blur();
      // }
    }
  });
});
