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
  // Clear round message
  displayRound({
    player: 0,
    computer: 0,
    message: ""
  }, null);
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
 * Plays game of Rock Paper Scissors using button input
 * @param  {event} e Click event
 * @param  {object} score Object storing game state
 */
function playBtn(e, score) {
  // Prevent page refresh
  e.preventDefault()
  // Get player selection from button clicked
  const playerChoice = e.currentTarget.value;
  // Get computer input
  const computerChoice = computerPlay();
  // Play a single round and save results
  const result = playSingleRound(playerChoice, computerChoice);

  // Display result of round to DOM
  displayRound(result, e.currentTarget);

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

/**
 * Display single round results to DOM by changing text and button color
 * @param  {object} result Object storing result of one round game
 * @param  {object} button Button DOM element storing player choice
 */
function displayRound(result, button) {
  const textRound = document.querySelector('#round');
  // Get results of round
  const roundResult = result["message"];
  textRound.textContent = roundResult;

  // Reset all button colors
  const btnPlayer = Array.from(document.querySelectorAll('.btn-play'));
  btnPlayer.forEach(btn => btn.classList.remove("btn-won", "btn-lost", "btn-draw"));
  // If no button is passed, exit function
  if (button === null) {
    return
  };
  // Change button color to show result of round
  if (roundResult.includes("Won")) {
    button.classList.add("btn-won");
  } else if (roundResult.includes("Lost")) {
    button.classList.add("btn-lost");
  } else if (roundResult.includes("Draw")) {
    button.classList.add("btn-draw");
  }
}

/**
 * Display round number and score to DOM
 * @param  {object} score Object storing game state
 */
function displayScore(score) {
  const roundNumber = document.querySelector('#round-number');
  roundNumber.textContent = `Round ${score["round"]}`;
  const playerScore = document.querySelector('#score-player');
  playerScore.textContent = `${score["player"]}`;
  const computerScore = document.querySelector('#score-computer');
  computerScore.textContent = `${score["computer"]}`;
}

/**
 * Display winner to DOM
 * @param  {object} score Object storing game state
 */
function displayWinner(score) {
  const textWinner = document.querySelector('#winner');
  textWinner.textContent = `${score["result"]}`;
}

/**
 * Update DOM to reflect end of game
 * @param  {object} score Object storing game state
 */
function endGame(score) {
  // Display winner to DOM
  displayWinner(score);

  // Disable player buttons when game ends
  const btnPlayer = Array.from(document.querySelectorAll('.btn-play'));
  btnPlayer.forEach(btn => btn.disabled = true);
}