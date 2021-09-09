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
  if !(typeof(playerSelection) === 'string' && typeof(computerSelection) === 'string') {
    return "Invalid input"
  }

  // Make playerSelection paramater case-insensitive
  const upperPlayerSelection = playerSelection.toUpperCase();
  const upperComputerSelection = computerSelection.toUpperCase();

  // Calculate all possible outcomes

  // Return message
  let message = "You Lost! Paper beats Rock";
}

/**
 * [someFunction description]
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {[type]}      [description]
 */