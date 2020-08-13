var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var no = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[no];
  gamePattern.push(randomChosenColour);
  level += 1;
  var content = "Level " + level;
  $("#level-title").text(content);
  var randomChosen = "#" + gamePattern[gamePattern.length - 1];
  $(randomChosen).animate({opacity: "0.2"}, 200).animate({opacity: "1"}, 200)
}

function StartOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    playAudio("wrong");
    $('body').addClass("game-over").delay(200).queue(function(next) {
      $(this).removeClass("game-over");
      next();
    });
    $("#level-title").text("Game Over, Press Any Key to Restart");
    StartOver();
  }
}

function playAudio(name) {
  var sound = "sounds/" + name + ".mp3"
  var x = new Audio(sound);
  x.play();
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//nextSequence();
// var randomChosen = "#" + gamePattern[gamePattern.length - 1];
// $(randomChosen).click(()=> {$(randomChosen).animate({opacity: "0.2"},100).animate({opacity: "1"},100)});
//$(randomChosen).click(()=> {playAudio(gamePattern[gamePattern.length - 1])});

$('.btn').on('click', (event) => {
  var userChosenColour = event.currentTarget.className;
  userChosenColour = userChosenColour.split(" ")[1];
  userClickedPattern.push(userChosenColour);
  var animatedClass = "#" + userChosenColour;
  console.log(animatedClass);
  $(animatedClass).addClass("pressed").delay(100).queue(function(next) {
    $(this).removeClass("pressed");
    next();
  });
  playAudio(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})
