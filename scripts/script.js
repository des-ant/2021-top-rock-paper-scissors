// Keep track of game state
const score = {
  player: 0,
  computer: 0,
  round: 1,
  result: ""
};

/**
 * Initialises game
 */
function initGame(score) {
  // Select all player buttons and add click events to trigger game
  const btnPlayer = Array.from(document.querySelectorAll('.btn-play'));
  btnPlayer.forEach(btn => btn.disabled = false);
  // Reset scores
  resetScore(score)
  // Display initial scores
  displayScore(score);
  // Clear winner message
  displayWinner(score);
}

/**
 * Initialises event listeners
 */
function initEvents(score) {
  const btnPlayer = Array.from(document.querySelectorAll('.btn-play'));
  btnPlayer.forEach(btn => btn.addEventListener('click', (e) => playBtn(e, score)));
  const btnReset = document.querySelector('#btn-reset');
  btnReset.addEventListener('click', () => initGame(score));
}

// Initialise game
initGame(score);
// Initliase event listeners
initEvents(score);

/**
 * Initialise scores to reset game
 * @param  {object} score Object storing game state
 */
function resetScore(score) {
  score["player"] = 0;
  score["computer"] = 0;
  score["round"] = 1;
  score["result"] = "";
}

/**
 * Randomly return either 'Rock', 'Paper', or 'Scissors'
 * @return {string}      [Rock, Paper, or Scissors]
 */
function computerPlay() {
  // Store all possible choices
  const choices = ['Rock', 'Paper', 'Scissors'];

  // Randomise choice by randomising index
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = choices[randomIndex];

  return randomChoice;
}

/**
 * Plays a single round of Rock Paper Scissors
 * @param  {string} playerSelection The player's selection
 * @param  {string} computerSelection The computer's selection
 * @return {object}      Returns winner of the round as score and message
 */
function playSingleRound(playerSelection, computerSelection) {
  // Make choices case insensitive
  const playerChoice = playerSelection.toUpperCase();
  const computerChoice = computerSelection.toUpperCase();

  // Construct message for result of round
  // Keep score
  let roundScore = {
    player: 0,
    computer: 0,
    message: ""
  };

  // Calculate all possible outcomes
  if (playerChoice === 'ROCK') {
    if (computerChoice === 'ROCK') {
      roundScore["message"] += "Draw";
    } else if (computerChoice === 'PAPER') {
      roundScore["message"] += "You Lost! Paper beats Rock";
      roundScore["computer"] += 1;
    } else {
      roundScore["message"] += "You Won! Rock beats Scissors";
      roundScore["player"] += 1;
    }
  } else if (playerChoice === 'PAPER') {
    if (computerChoice === 'ROCK') {
      roundScore["message"] += "You Won! Paper beats Rock";
      roundScore["player"] += 1;
    } else if (computerChoice === 'PAPER') {
      roundScore["message"] += "Draw";
    } else {
      roundScore["message"] += "You Lost! Scissors beats Paper";
      roundScore["computer"] += 1;
    }
  } else {
    if (computerChoice === 'ROCK') {
      roundScore["message"] += "You Lost! Rock beats Scissors";
      roundScore["computer"] += 1;
    } else if (computerChoice === 'PAPER') {
      roundScore["message"] += "You Won! Scissors beats Paper";
      roundScore["player"] += 1;
    } else {
      roundScore["message"] += "Draw";
    }
  }

  return roundScore;
}


/**
 * Plays a 5 round game of Rock Paper Scissors \
 * Keeps score and reports winner or loser at the end
 */
function game() {
  // Keep score
  let score = {
    player: 0,
    computer: 0,
    round: 1,
    result: ""
  };

  // Play 5 rounds
  for (let i = 0; i < 5; i++) {
    // Show score and round
    console.log(`Round ${score["round"]}\nPlayer: ${score["player"]}, Computer: ${score["computer"]}`)

    // Get computer input
    const computerChoice = computerPlay();
    // Get player input
    let playerChoice = prompt("Type Rock, Paper or Scissors");
    // Check for valid input
    while (!(checkValidInput(playerChoice))) {
      playerChoice = prompt("Invalid input, please enter Rock, Paper, or Scissors");
    }

    // Play a round
    const result = playSingleRound(playerChoice, computerChoice);

    // Update score and round
    score["player"] += result["player"];
    score["computer"] += result["computer"];
    score["round"] += 1;

    // Show result of round
    console.log(result["message"]);
  }

  // Determine winner of game
  if (score["player"] > score["computer"]) {
    score["result"] = "You win";
  } else if (score["player"] < score["computer"]) {
    score["result"] = "You lose";
  } else {
    score["result"] = "Draw";
  }

  // Show result
  console.log(score["result"]);
}

/**
 * Plays a single round of Rock Paper Scissors
 * @param  {string} playerSelection The player's selection
 * @return {boolean}      Returns true if input is valid
 */
function checkValidInput(playerSelection) {
  // Check for valid string input
  if (!(typeof (playerSelection) === 'string')) {
    return false;
  }

  // Make playerSelection paramater case-insensitive
  const playerChoice = playerSelection.toUpperCase();

  // Check for valid choice
  const playerChoices = ['ROCK', 'PAPER', 'SCISSORS'];
  if (!playerChoices.includes(playerChoice)) {
    return false;
  }

  return true;
}

/**
 * Plays game of Rock Paper Scissors using button input
 * @param  {event} e Click event
 * @param  {object} score Object storing game state
 */
function playBtn(e, score) {
  // Get player selection from button clicked
  const playerChoice = e.target.value;
  // Get computer input
  const computerChoice = computerPlay();
  // Play a single round and save results
  const result = playSingleRound(playerChoice, computerChoice);

  // Display result of round to DOM
  displayRound(result);

  // Update global score using result of single round
  score["player"] += result["player"];
  score["computer"] += result["computer"];
  score["round"] += 1;

  // Display global score to DOM
  displayScore(score);

  // Check if game has ended and update DOM if game has ended
  let winningMessage = determineWinner(5, score["player"], score["computer"]);
  if (winningMessage !== "") {
    score["result"] = winningMessage;
    endGame(score);
  }
}

/**
 * Check if game has ended and return result of game
 * @param  {number} pointsToWin Number of points needed win
 * @param  {number} playerScore Number of points won by player
 * @param  {number} computerScore Number of points won by computer
 * @return {string}      Returns message if game has ended otherwise returns empty string
 */
function determineWinner(pointsToWin, playerScore, computerScore) {
  if (playerScore >= pointsToWin) {
    return "You win";
  } else if (computerScore >= pointsToWin) {
    return "You lose";
  }
  return "";
}

// Display single round results to DOM
function displayRound(result) {
  const textRound = document.querySelector('#round');
  textRound.textContent = result["message"];
}

// Display score to DOM
function displayScore(score) {
  const textScore = document.querySelector('#score');
  textScore.textContent = `Round ${score["round"]}\nPlayer: ${score["player"]}, Computer: ${score["computer"]}`;
}

// Display winner to DOM
function displayWinner(score) {
  const textWinner = document.querySelector('#winner');
  textWinner.textContent = `${score["result"]}`;
}

// Update DOM to reflect end of game
function endGame(score) {
  // Display winner to DOM
  displayWinner(score);

  // Disable player buttons when game ends
  const btnPlayer = Array.from(document.querySelectorAll('.btn-play'));
  btnPlayer.forEach(btn => btn.disabled = true);
}