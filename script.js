const colorCard = ["red", "green", "blue", "yellow"]
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

function randomNumberGenrator() {
    let number = Math.floor(Math.random() * 4);
    return number;
}

$(document).on("keypress", function () {
    if (!started) {
        $(`#level-title`).text(`Level ${level}`);
        started = true;
        nextSequence();
    }
})


$('.btn').click(function () {
    let userClickedButton = $(this).attr('id');
    userClickedPattern.push(userClickedButton);

    playSound(userClickedButton);
    animate(userClickedButton);
    checkResult(userClickedPattern.length - 1);
})


function checkResult(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound('wrong');
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $(`#level-title`).text(`Level ${level}`);
    let randomNumber = randomNumberGenrator();
    let randomColor = colorCard[randomNumber];
    gamePattern.push(colorCard[randomNumber]);

    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animate(name) {
    $(`#${name}`).addClass('pressed');
    setTimeout(function () {
        $(`#${name}`).removeClass('pressed');
    }, 100);
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}