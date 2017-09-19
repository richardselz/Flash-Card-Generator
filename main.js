var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");
var basicData = require("./basic.json");
var clozeData = require("./cloze.json");
var fs = require("fs");

var inquirer = require("inquirer");

var count = answersRight = answersWrong = 0;
var basic = cloze = false;
var correctAnswer = basicFront = "";

function playAgain() {
    console.log("Answered Right: ",answersRight);
    console.log("Answered Wrong: ",answersWrong);
    inquirer.prompt([
        {
            type: "list",
            message: "Play again?",
            choices: ["Yes","No"],
            name: "playAgain"
        }
    ]).then(function(val) {
        if(val.playAgain === "Yes") {
            console.log(count);
            readyToPlay();
        }
        else console.log("Thanks for playing!");
    })
}

function playGame(countIn){
    count = countIn;
    console.log("In GAME");
    if(count < 5){
        console.log("Count: ",count);
        correctAnswer = basicFront = "";
        inquirer.prompt([
            {
                message: function() {
                    if(basic) {
                        console.log("Basic Game!");
                        fs.readFile("./basic.json", "utf8", function(err, data) {
                            if(err) throw err;
                            var obj = JSON.parse(data);
                            console.log("Front: ",obj[count].front," Back: ",obj[count].back);
                            correctAnswer = obj[count].back;
                            basicFront = obj[count].front;
                            return obj[count].front;
                        });
                    } else {
                        console.log("Cloze Game!");
                        fs.readFile("./cloze.json", "utf8", function(err, data) {
                            if(err) throw err;
                            var obj = JSON.parse(data);
                            var clozeCard = new ClozeCard(obj[count].fullText, obj[count].cloze);
                            console.log("Partial Text: ",clozeCard.partial," Cloze: ",clozeCard.cloze," Full Text: ",clozeCard.fullText);
                            correctAnswer = clozeCard.cloze;
                        });
                        return "Hello from the Cloze Game!";
                    }
                },
                name: "answer"
            }
        ]).then(function(val) {
            if(val.answer === correctAnswer) {
                console.log("You got it correct!");
                answersRight++;
            }else {
                console.log("You got the answer wrong.");
                answersWrong++;
            }
            count++;
            playGame(count);
        });
    }else {
        playAgain();
    }
}

function readyToPlay() {
    basic = false;
    inquirer.prompt([
        {
            type: "list",
            message: "Basic or Cloze?",
            choices: ["Basic", "Cloze"],
            name: "gameType"
        }])
        .then(function(val){
            if(val.gameType === "Basic"){
                basic = true;
                answersRight = answersWrong = 0;
                playGame(0);
            }else {
                console.log("In else");
                answersRight = answersWrong = 0;
                playGame(0);
            }
    });
}

readyToPlay();