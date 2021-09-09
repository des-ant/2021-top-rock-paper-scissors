/**
 * Randomly return either 'Rock', 'Paper', or 'Scissors'
 * @return {string}      [Rock, Paper, or Scissors]
 */
function computerPlay() {
  // Store all possible choices
  const choices = ['Rock', 'Paper', 'Scissors'];

  // Randomise choice by randomising index
  const randomIndex = Math.floor(Math.random() * choices.length);
  const randomChoice = array[randomIndex];

  return randomChoice;
}

/**
 * Plays a single round of Rock Paper Scissors
 * @param  {string} playerSelection The player's selection
 * @param  {string} computerSelection The computer's selection
 * @return {string}      Returns winner of the round
 */
function playSingleRound(playerSelection, computerSelection) {
  // Check for valid string input
  if (!(typeof(playerSelection) === 'string' && typeof(computerSelection) === 'string')) {
    return "Invalid input, please enter a string (rock, paper, scissors)";
  }

  // Make playerSelection paramater case-insensitive
  const playerChoice = playerSelection.toUpperCase();
  const computerChoice = computerSelection.toUpperCase();

  // Check for valid choice
  const playerChoices = ['ROCK', 'PAPER', 'SCISSORS'];
  if (!playerChoices.includes(playerChoice)) {
    return "Invalid choice, please enter a valid choice (rock, paper, scissors)";
  }

  // Construct message for result of round
  let message = "";

  // Calculate all possible outcomes
  if (playerChoice === 'ROCK') {
    if (computerChoice === 'ROCK') {
      message += "Draw";
    } else if (computerChoice === 'PAPER') {
      message += "You Lost! Paper beats Rock";
    } else {
      message += "You Won! Rock beats Scissors";
    }
  } else if (playerChoice === 'PAPER') {
    if (computerChoice === 'ROCK') {
      message += "You Won! Paper beats Rock";
    } else if (computerChoice === 'PAPER') {
      message += "Draw";
    } else {
      message += "You Lost! Scisoors beats Paper";
    }
  } else {
    if (computerChoice === 'ROCK') {
      message += "You Lost! Rock beats Scissors";
    } else if (computerChoice === 'PAPER') {
      message += "You Won! Scissors beats Paper";
    } else {
      message += "Draw";
    }
  }

  return message;
}

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */