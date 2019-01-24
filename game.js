var randomNumber;
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var randomChosenColour;
var gamePattern = [];
var userChosenColor;
var userClickedPattern = [];
var indexOfClickedPattern = 0;
var started = false;
var clickAllowed = false;
var level = 0;



$(document).keypress(function() {
  if (!started) {
    started = true;
    $('p').remove();
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
  clickAllowed = true;
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

function sequenceCheck(index) {
  userClickedButton = userClickedPattern[index];
  gamePatternButton = gamePattern[index];

  if (userClickedButton !== gamePatternButton) {
    (new Audio('sounds/wrong.mp3')).play();
    startOver();

  } else if (userClickedPattern.length === gamePattern.length) {
    clickAllowed = false;
    userClickedPattern = [];
    indexOfClickedPattern = 0;
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
  indexOfClickedPattern = 0;
  $('#level-title').html('Game Over, Press Any Key to Restart');
  $('.container').append('<p style="color:white">You suk Cibai kia!!!. Hehe Joke lah. 为什么这么笨？<p>')
  $('body').addClass('game-over');

  setTimeout(function(){
    $('body').removeClass('game-over');
  },200)
}





$('.btn').on('click', function() {
  if(started && clickAllowed){
    userChosenColor = $(this).attr('id');
    playButtonSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    sequenceCheck(indexOfClickedPattern++);
  }
});
