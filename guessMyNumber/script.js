"use strict";
const numGenerator = () => {
  const num = Math.floor(Math.random() * 20 + 1);
  console.log("psssst..." + num);
  return num;
};
const modifyContent = (dom, msg) =>
  (document.querySelector(dom).textContent = msg);
let randomNo = numGenerator();
let score = 5;

document.querySelector(".again").addEventListener("click", function() {
  score = 5;
  randomNo = numGenerator();
  modifyContent(".guess", "");
  modifyContent(".message", "Start Guessing again, Twat...");
  document.querySelector("body").style.backgroundColor = "#222";
  modifyContent(".number", "?");
});

document.querySelector(".check").addEventListener("click", function() {
  const guess = Number(document.querySelector(".guess").value);
  if (score > 0 && guess !== randomNo) {
    modifyContent(
      ".message",
      !guess
        ? "Stop Fucking Around"
        : guess > randomNo
          ? "Too fucking Much"
          : "Too fucking Little"
    );
    score--;
    modifyContent(".score", score);
  } else {
    document.querySelector("body").style.backgroundColor =
      score === 0 ? "red" : "green";
    modifyContent(
      ".message",
      score === 0 ? "Better luck next time retard" : "Bin-fuckin-go"
    );
    modifyContent(".number", randomNo);
    if (score > Number(document.querySelector(".highscore").textContent))
      modifyContent(".highscore", score);
    if (score === 0) modifyContent(".score", 0);
  }
});
