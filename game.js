var randomNumber;
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var randomChosenColour;
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).keypress(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  level++;
  $('#level-title').html('Level ' + level);
  randomNumber = Math.floor(Math.random() * 3);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playButtonSound(randomChosenColour);
  $('#' + randomChosenColour).fadeOut(35).fadeIn(35);
}

function playButtonSound(buttonColor) {

  var audio;
  switch (buttonColor) {
    case 'blue':
      audio = new Audio('sounds/' + buttonColor + '.mp3');
      break;
    case 'green':
      audio = new Audio('sounds/' + buttonColor + '.mp3');
      break;
    case 'red':
      audio = new Audio('sounds/' + buttonColor + '.mp3');
      break;
    case 'yellow':
      audio = new Audio('sounds/' + buttonColor + '.mp3');
      break;
  }
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

function sequenceCheck(currentLevel) {
  userClickedButton = userClickedPattern[currentLevel];
  gamePatternButton = gamePattern[currentLevel];

  if (userClickedButton !== gamePatternButton) {
    (new Audio('sounds/wrong.mp3')).play();
    startOver();

  } else if (userClickedPattern.length === gamePattern.length) {
    userClickedPattern = [];
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $('#level-title').html('Game Over, Press Any Key to Restart');
  $('body').addClass('game-over');

  setTimeout(function(){
    $('body').removeClass('game-over');
  },200)
}





$('.btn').on('click', function() {
  userChosenColor = $(this).attr('id');
  playButtonSound(userChosenColor);
  animatePress(userChosenColor);
  userClickedPattern.push(userChosenColor);
  sequenceCheck(userClickedPattern.indexOf(userChosenColor));
});
