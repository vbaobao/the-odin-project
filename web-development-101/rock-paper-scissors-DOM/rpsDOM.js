function computerPlay() {
    let compChoice = ["rock", "paper", "scissors"];
    let randInt = Math.floor(Math.random() * 2);
    return compChoice[randInt];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        return "tie";
    } else if (
            (playerSelection == "paper" && computerSelection == "rock") ||
            (playerSelection == "rock" && computerSelection == "scissors") ||
            (playerSelection == "scissors" && computerSelection == "paper")) {
        return "win";
    } else if (
            (playerSelection == "paper" && computerSelection == "scissors") ||
            (playerSelection == "rock" && computerSelection == "paper") ||
            (playerSelection == "scissors" && computerSelection == "rock")) {
        return "lose";
    }
}

function showScore(div, playerScore, computerScore) {
    div.textContent = "Player Score: " + playerScore + "\nComputer Score: " + computerScore;
}

function countScore(div, roundResult, players) {
    if (roundResult == "win") {
        div.textContent = "Player wins this round!";
        return players[0].score += 1;
    } else if (roundResult == "lose") {
        div.textContent = "Computer wins this round!";
        return players[1].score += 1;
    } else if (roundResult == "tie") {
        div.textContent = "It's a tie!";
        return;
    }
}

function endScore(playerScore, computerScore) {
    if (playerScore == computerScore) {
        return "tie";
    } else if (playerScore > computerScore) {
        return "win";
    } else if (playerScore < computerScore) {
        return "lose";
    }
}

function showEndGame (playerScore, computerScore) {
    console.log("------------------------\n");
    console.log("The game is now over!");
    console.log("------------------------\n");
    let results = endScore(playerScore, computerScore);
    if (results == "win") {
        console.log("Congratulations! You have won by " + (playerScore - computerScore) + " points!");
    } else if (results == "lose") {
        console.log("You lost the game by " + (computerScore - playerScore) + " points.");
        console.log("Better luck next time.");
    } else if (results == "tie") {
        console.log("It's a tie! You both have " + playerScore + " points!");
    }
}

const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const score = document.querySelector("#score");
const update = document.querySelector("#update");
const numRounds = document.querySelector("#numRounds");

let player = {score: 0};
let computer = {score: 0};
let players = [player, computer];
let rounds = 0;
let roundResult;

rock.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "rock";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    rounds++;
    numRounds.textContent = rounds;
    
});
paper.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "paper";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    rounds++;
    numRounds.textContent = rounds;

});
scissors.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "scissors";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    rounds++;
    numRounds.textContent = rounds;
    
});