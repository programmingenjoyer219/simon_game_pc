var bulbColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScoreArray = [0];
var started = false;
const gameStartedAudio = new Audio("./sounds/game-started.mp3");

// button animation function
function buttonAnimation(buttonColour){
    $("#"+buttonColour+">img").attr("src", "./assets/"+buttonColour+"-on.svg");
    $("#"+buttonColour).addClass("pressed");
    setTimeout(function(){
        $("#"+buttonColour+">img").attr("src", "./assets/"+buttonColour+"-off.svg");
        $("#"+buttonColour).removeClass("pressed");
    }, 500);
}

// button audio function
function playAudio(buttonColour){
    var buttonAudio = new Audio("./sounds/"+buttonColour+".mp3");
    buttonAudio.play();
}

// creates a new sequence
function nextSequence(){
    level++;
    userClickedPattern.length = 0;
    $("h1").text("Level "+level+" | "+"High Score "+highScoreArray[highScoreArray.length-1]);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = bulbColour[randomNumber];
    gamePattern.push(randomChosenColour);
    buttonAnimation(randomChosenColour);
    playAudio(randomChosenColour);
}

// detection for keypress
$("body").keypress(function (e) { 
    if (started === false){
        gameStartedAudio.play();
        setTimeout(nextSequence, 2000);
        started = true;
    }
});

// button click detection
$(".btn").click(function(){
    if (started === true){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        buttonAnimation(userChosenColour);
        playAudio(userChosenColour);
        console.log(userClickedPattern);
        checkAnswer(userClickedPattern.length - 1);
    }
});

// game over effects
function gameOver(){
    $("*").addClass("game-over");
    setTimeout(function(){
        $("*").removeClass("game-over");
    },300);
    $("h1").text("Game Over. Press Any Key to Restart");
}

// restarts the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// check answer function
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("right");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }else {
        console.log("wrong");
        playAudio("wrong");
        gameOver();
        if (level >= highScoreArray[highScoreArray.length-1]){
            highScoreArray.push(level);
        }
        startOver();
    }
}