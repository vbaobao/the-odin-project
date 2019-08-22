function computerPlay() {
    let compChoice = ["rock", "paper", "scissors"];
    let randInt = Math.floor(Math.random() * 2);
    return compChoice[randInt];
}

function showScore(round, playerScore, computerScore) {
    console.log("R O U N D _ " + round);
    console.log("------------------------\n------------------------");
    console.log("Player Score: " + playerScore);
    console.log("Computer Score: " + computerScore);
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
    console.log("------------------------\n------------------------");
    console.log("The game is now over!");
    console.log("------------------------\n------------------------");
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

function game () {
    let playerScore = 0;
    let computerScore = 0;
    let round = 1;
    let gameLen = 5;
    let roundResult;

    //This is the start of the game loop, runs for 5 rounds.
    for (round; round < gameLen + 1 ; round++) {
        console.log("Round " + round);

        //Choose rock, paper, or scissors.
        let computerSelection = computerPlay();
        let playerSelection = prompt("Rock, Paper, or Scissors?");
        playerSelection = playerSelection.toLowerCase();
        
        //Checking if user entered correct data.
        while (playerSelection != "rock" && playerSelection != "paper" && playerSelection != "scissors") {
            playerSelection = prompt("Your entry was not 'rock', 'paper' or 'scissors'. Please try again.");
            playerSelection = playerSelection.toLowerCase();
        }

        console.log("You chose: " + playerSelection);
        console.log("Computer chose: " + computerSelection);
        roundResult = playRound(playerSelection, computerSelection);
        
        if (roundResult == "win") {
            playerScore += 1;
            console.log("You win this round!");
        } else if (roundResult == "lose") {
            computerScore += 1;
            console.log("You lost this round.");
        } else if (roundResult == "tie") {
            console.log("It's a tie this round!");
        }

        showScore(round, playerScore, computerScore);
    }
    //After all rounds run, the end of game prints results.
    showEndGame(playerScore, computerScore)
}