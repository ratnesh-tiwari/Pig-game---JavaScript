"use strict";

// Selecting element
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting condition
// const scores = [0, 0];
// let currScore = 0;
// let activePlayer = 0;
// let playing = true;
let scores, currScore, activePlayer, playing;
//  inialization
const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
};

init();

// Switch player fun
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice functanality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generatiing a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true,
    if (dice !== 1) {
      // Add dice to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
      // current0El.textContent = currScore; //change later
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // console.log("Hold buttom");
    // 1. Add current score of active player's score
    scores[activePlayer] += currScore;
    // console.log(scores[activePlayer]);
    // scores[1] = scores[1] + currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is 100 >=
    if (scores[activePlayer] >= 100) {
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      playing = false;
      diceEl.classList.add("hidden");
    }
    //  Switch to next player
    switchPlayer();
  }
});

// implementing new game buttom  init
/*
btnNew.addEventListener("click", function () {
  // scores = [0, 0];
  // currScore = 0;
  // activePlayer = 0;
  // playing = true;
  // score0El.textContent = 0;
  // score1El.textContent = 0;
  // diceEl.classList.add("hidden");
  // player0El.classList.remove("player--winner");
  // player1El.classList.remove("player--winner");
  // player1El.classList.remove("player--active");
  // player0El.classList.add("player--active");
  init();
});
**/
btnNew.addEventListener("click", init);
