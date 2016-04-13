$(function(){
 "use strict"


    var molesClick= [];
    var $popUp = $(".popUp")
    var score = 0;
    var detonationTimer = 0;
    new Audio("/sounds/kill.mp3").play();
    var highScore = 0;

    // THIS IS THE START BUTTON
    $("#start").click (function(){
        detonationTimer = 10;
        startGame();
        score = 0;
        $(this).attr("disabled", true);
    });


    // This resets the timer if it equals 0 and runs 
    // the random and play function
    function startGame() {
        if (score > highScore) {
            $('#high_score').html(score);
            highScore ++;
        } else  {
            $('#high_score').html(highScore);
        };
        if (detonationTimer > 0){
            molesClick = [];
            randomNumber();
            play();   
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


 })();