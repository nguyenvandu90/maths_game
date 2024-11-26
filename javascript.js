var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload();//reload page
    }else{
        //if we are not playing
        //change model to playing
        playing = true;

        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        //show countdown box
        show("timeremaining");
        timeremaining = 60;

        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        //show count box
        document.getElementById("startreset").innerHTML = "Reset Game"
        //start count down
        startCountdow();

        //generate a new Q&A
        generateQA();
    }
}

//click an answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        // checkif we are playing
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                // correct answer
                score++;
                document.getElementById("scorevalue").innerHTML = score;
    
                // hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
    
                //Ganerate new Q&A
                generateQA();
            }else{
                // wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}


//if we click on anwer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1sec
                //generate new Q&A
            //no
                //show try again box for 1sec


//functions
//start counter
function startCountdow (){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
            if(timeremaining == 0){
                //game over
                clearInterval(action);
                stopCountdown();
                show("gameOver");
                document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is "+ score +"</p>";
                hide("timeremaining");
                hide("correct");
                hide("wrong");
                playing = false;

                document.getElementById("startreset").innerHTML = "Start Game";
            }
    }, 1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide an element
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show a element
function show(Id){
    document.getElementById(Id).style.display = "block";
}

//generate question and multiple anwers
function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; // fill one box with correct answer
    
    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for(i=1; i<5; i++){
        if(i != correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer) > -1)
            //fill wrong answer
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}