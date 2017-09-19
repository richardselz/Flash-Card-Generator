var basicCard = require("./BasicCard.js");
var clozeCard = require("./ClozeCard.js");

var inquirer = require("inquirer");
var count = 0;

function playAgain() {
    console.log("Play again?");
    count = 0;
}

inquirer.prompt([
    {
        type: "list",
        message: "Basic or Cloze?",
        choices: ["Basic", "Cloze"],
        name: "gameType"
    }])
    .then(function(val){
        if(val.gameType === "Basic"){
            function playGame(){
                console.log("In GAME");
            }
            if(count < 5){
                console.log("Count: ",count);
                count++;
                playGame();
                
            }else {
                playAgain();
            }
        }else {
            console.log("In else");
        }
    });