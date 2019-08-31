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

function checkGameEnd(div, numRounds, playerScore, computerScore) {
    if (playerScore >= 5 || computerScore >= 5) {
        gameButtons.style.display = "none";
        return showEndGame (div, numRounds, playerScore, computerScore);
    }
}

function showEndGame (div, numRounds, playerScore, computerScore) {
    if (playerScore >= 5) {
        div.textContent = "Congratulations! You have won by " + (playerScore - computerScore) + " points!";
        return numRounds;
    } else if (computerScore >= 5) {
        div.textContent = "You lost the game by " + (computerScore - playerScore) + " points.\nBetter luck next time.";
        return numRounds;
    } else {
        numRounds++;
        div.textContent = "ROUND: " + numRounds;
        return numRounds;
    }
}


// DOM
const gameButtons = document.querySelector("#gameButtons");
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const score = document.querySelector("#score");
const update = document.querySelector("#update");
const running = document.querySelector("#running");
const resetBtn = document.querySelector("#reset");

// Required variables
let player = {score: 0};
let computer = {score: 0};
let players = [player, computer];
let numRounds = 0;
let roundResult;

// Need to refactor due to DRY
rock.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "rock";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    numRounds = checkGameEnd(running, numRounds, players[0].score, players[1].score);
    
});
paper.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "paper";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    numRounds = checkGameEnd(running, numRounds, players[0].score, players[1].score);

});
scissors.addEventListener("click", (e) => {
    let computerSelection = computerPlay();
    let playerSelection = "scissors";
    roundResult = playRound(playerSelection, computerSelection);

    countScore(update, roundResult, players);
    showScore(score, players[0].score, players[1].score);
    numRounds = checkGameEnd(running, numRounds, players[0].score, players[1].score);
    
});

resetBtn.addEventListener("click", (e) => {
    numRounds = 0;
    players[0].score = 0;
    players[1].score = 0;
    running.textContent = "ROUND: 0";
    score.textContent = "";
    update.textContent = "";
    gameButtons.style.display = "block";
});