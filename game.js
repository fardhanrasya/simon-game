var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false
var level = 0

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success")
        if (gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else{
        if(started==true)
            gameOver()
            startOver()
            console.log("fail")
    }
}

function nextSequence(){
    userClickedPattern = []
    level++
    $("#level-title").text("level "+level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    
    $("#"+randomChosenColours).fadeOut(100).fadeIn(100);

    playSound(randomChosenColours);

}

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    
    playSound(userChosenColour);
    pressedAnimate(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

function playSound(name){
    let Sound = new Audio("./sounds/" + name + ".mp3")
    Sound.play()
}

function pressedAnimate(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

$(document).keypress(function(e){
    checkKeyA = e.key
    if (checkKeyA === "a" && started==false){
        $("#level-title").text("level "+level)
        nextSequence()
        started=true
    }
});

function gameOver(){
    $("body").addClass("game-over");
    let Sound = new Audio("./sounds/wrong.mp3")
    Sound.play()
    $("#level-title").text("Game Over, Press A to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)

}

function startOver(){
    level = 0
    started = false
    gamePattern = []
    userClickedPattern = []
}