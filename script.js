'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// Starting conditions

// Function of initial game logic
const init = function () {
  // Storing player scores in Array for easy future access
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Manipulating DOM
  diceEl.classList.add('hidden'); // Hide dice image at the start of the game
  player0El.classList.remove('player--winner'); // Remove classes incase previous game eneded
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // Set player 1 as active and remove active status for player 2
  player1El.classList.remove('player--active');
};
init();

//Switch player function
const switchPlayer = function () {
  // Reseting current score display for the active playerr
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Toggling active player (whos playing?)
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Player active will toggle and update the UI
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); // Logging value only for debugging issues
    //2. Display dice iamge with corresponding number
    diceEl.classList.remove('hidden');
    diceEl.src = `dices/dice-${dice}.png`; // Setting the dice image
    
    //3. Check for rolled 1: if true, switch to next player

    if (dice !== 1) {
      //Add to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

// Event Listener for the "Hold" button
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // Update total score display for the active player
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false; // Set game to inactive
      diceEl.classList.add('hidden'); // Hide the Dice
      // Add the winner class to the active player's section
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // Remove the active player class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player

      switchPlayer();
    }
  }
});
// Event Listener to start a New Game again.
btnNew.addEventListener('click', init);
