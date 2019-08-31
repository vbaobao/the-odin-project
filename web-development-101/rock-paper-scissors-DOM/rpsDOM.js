function computerPlay() {
    // Computer randomly chooses either rock, paper, or scissors.
    let compChoice = ["rock", "paper", "scissors"];
    let randInt = Math.floor(Math.random() * 2);
    return compChoice[randInt];
}

function playRound(playerSelection, computerSelection) {
    // Plays a round of the game.
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
    // Shows the current score.
    div.textContent = "Player Score: " + playerScore + "\nComputer Score: " + computerScore;
}

function countScore(div, roundResult, players) {
    // Assigns points for the winner of the rounds.
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
    // Checks if a player has won 5 rounds
    // If not, then counter of the rounds increases by 1
    // If game is over game buttons are hidden and end game text shows. 
    if (playerScore >= 5 || computerScore >= 5) {
        gameButtons.style.display = "none";
        return showEndGame (div, numRounds, playerScore, computerScore);
    } else {
        numRounds++;
        div.textContent = "ROUND: " + numRounds;
        return numRounds;
    }
}

function showEndGame (div, numRounds, playerScore, computerScore) {
    // Shows end game text.
    if (playerScore >= 5) {
        div.textContent = "Congratulations! You have won by " + (playerScore - computerScore) + " points!";
        return numRounds;
    } else if (computerScore >= 5) {
        div.textContent = "You lost the game by " + (computerScore - playerScore) + " points.\nBetter luck next time.";
        return numRounds;
    }
}


// DOM
const gameButtons = document.querySelector("#gameButtons");
const game = document.querySelectorAll("#gameButtons button");
const score = document.querySelector("#score");
const update = document.querySelector("#update");
const running = document.querySelector("#running");
const resetBtn = document.querySelector("#reset");

// Game variables
let player = {score: 0};
let computer = {score: 0};
let players = [player, computer];
let numRounds = 0;
let roundResult;
let playerSelection;

// Click listeners to play a round of the game.
for (let i = 0 ; i < game.length ; i++ ) {
    game[i].addEventListener("click", (e) => {
        if (i == 0) { playerSelection = "rock"; }
        else if (i == 1) { playerSelection = "paper"; }
        else if (i == 2) { playerSelection = "scissors"; }

        let computerSelection = computerPlay();
        roundResult = playRound(playerSelection, computerSelection);
    
        countScore(update, roundResult, players);
        showScore(score, players[0].score, players[1].score);
        numRounds = checkGameEnd(running, numRounds, players[0].score, players[1].score);
       
    });
}

// Resets game to initial values and unhides game buttons.
resetBtn.addEventListener("click", (e) => {
    numRounds = 0;
    players[0].score = 0;
    players[1].score = 0;
    running.textContent = "ROUND: 0";
    score.textContent = "";
    update.textContent = "";
    gameButtons.style.display = "block";
});