$(function(){
 "use strict"

    var molesClick= [];
    var $popUp = $(".popUp")
    var detonationTimer = 0;
    var highScore = 0;
    var score = 0;
    new Audio("/sounds/kill.mp3").play();

    // THIS IS THE START BUTTON
    $("#start").click (function(){
        detonationTimer = 30;
        startGame();
        score = 0;
        $(this).attr("disabled", true);
    });

    // This resets the timer if it equals 0 and runs 
    // the random, highScorCount, and play function.
    function startGame() {
        highScoreCount ();
        if (detonationTimer > 0){
            molesClick = [];
            randomNumber();
            play();   
        };
    };
    
    function highScoreCount ()  {   
        if (score > highScore) {
            $('#high_score').html(score);
            ++ highScore;
        } else  {
            $('#high_score').html(highScore);
        };
    };

    // This updates the timer on screen and renables the start
    // button if it reaches 0.
    function updateTimer(){
        $('#timer').text(detonationTimer);
        if (detonationTimer === 0) {
            $("#start").attr("disabled", false); 
            alert('GAME OVER');
            clearInterval();
        };
        detonationTimer--;
    };

    function randomNumber() {
        var random = Math.floor(Math.random() * $(".square").length);
        var molePop = $popUp[random];
        var id = molePop.id;
        molesClick.push(id);
    };

    function play () {
        $("#score").text(score);
        var intervalId = setInterval(myTimer, 1000);
        var timer = setTimeout(updateTimer, 1000);
        function myTimer(){
            moleShow($("#" + molesClick));
            clearInterval(intervalId);
            startGame();
        }; 
    };

    // This function shows if it had the an img and display block enabled
    // it then turns the display none and adds to score.
    $(".popUp").click(function() {
        $(this).css("display", "none");
        new Audio("/sounds/laugh.mp3").play();
        score++;
    });
       
    // this is what is runned when the moles are showing   
    function moleShow (square) {
        square.css("display", "block");
        setTimeout(function () {
            square.css("display", "none");
        }, 1000);
    };
 });