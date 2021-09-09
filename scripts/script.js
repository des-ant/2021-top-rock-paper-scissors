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