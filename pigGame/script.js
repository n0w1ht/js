"use strict";
let dice,
  playerOne = 0,
  playerTwo = 0,
  currentPlayer = "playerOne",
  playerOneScore = 0,
  playerTwoScore = 0;

const changeCurrentScore = function (player, score) {
  if (player === "playerOne") {
    score === 0 ? (playerOne = score) : (playerOne += score);
    document.getElementById("current--0").textContent = playerOne;
  } else {
    score === 0 ? (playerTwo = score) : (playerTwo += score);
    document.getElementById("current--1").textContent = playerTwo;
  }
};

const changeScore = function (player, score) {
  if (player === "playerOne") {
    score === 0 ? (playerOneScore = 0) : (playerOneScore += score);
    document.getElementById("score--0").textContent = playerOneScore;
    playerOne = 0;
  } else {
    score === 0 ? (playerTwoScore = 0) : (playerTwoScore += score);
    document.getElementById("score--1").textContent = playerTwoScore;
    playerTwo = 0;
  }
};

const changeFocus = function (player) {
  if (player === "playerOne") {
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
  } else {
    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");
  }
};

const diceRoll = function (player) {
  dice = Math.floor(Math.random() * 6 + 1);
  document.querySelector(".dice").src = `dice-${dice}.png`;
  if (dice === 1) {
    player === "playerOne"
      ? changeCurrentScore("playerOne", 0)
      : changeCurrentScore("playerTwo", 0);
    changeFocus();
    player === "playerOne"
      ? (currentPlayer = "playerTwo")
      : (currentPlayer = "playerOne");
  } else {
    player === "playerOne"
      ? changeCurrentScore("playerOne", dice)
      : changeCurrentScore("playerTwo", dice);
  }
};

document.querySelector(".btn--roll").addEventListener("click", function () {
  diceRoll(currentPlayer);
});

document.querySelector(".btn--hold").addEventListener("click", function () {
  if (currentPlayer === "playerOne") {
    changeScore("playerOne", playerOne);
    currentPlayer = "playerTwo";
    changeFocus();
  } else {
    changeScore("playerTwo", playerTwo);
    currentPlayer = "playerOne";
    changeFocus();
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
  changeCurrentScore("playerOne", 0);
  changeCurrentScore("playerTwo", 0);
  changeScore("playerOne", 0);
  changeScore("playerTwo", 0);
  currentPlayer = "playerOne";
  changeFocus("playerOne");
});
