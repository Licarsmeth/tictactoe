const gameboard = (function () {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 5, 7],
    [2, 6, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return { winCondition };
})();

const Players = function (name, state = []) {
  return { name, state };
};

const OPlayer = Players("O");
const XPlayer = Players("X");
let curr = "X";

//selecting the elements
const cells = document.querySelectorAll("main div");
const restart = document.querySelector("button");
const turn = document.querySelector(".turn");
const congrats = document.querySelector(".congo");

const res = () => {
  for (let cell of cells) {
    cell.textContent = "";
    OPlayer.state = [];
    XPlayer.state = [];
  }
};

//restart click event
restart.addEventListener("click", res);

const playGame = () => {
  //first turn is of X
  //set the current player variable as curr
  for (let cell of cells) {
    cell.addEventListener("click", (e) => {
      if (e.target.textContent == "") {
        e.target.textContent = curr;
        updateState(e);
        winCheck();
        changePlayer();
      }
    });
  }
};

const updateState = (e) => {
  //if x turn change x state, else change o state
  curr == "X"
    ? XPlayer.state.push(e.target.dataset.cell)
    : OPlayer.state.push(e.target.dataset.cell);
};

const changePlayer = () => {
  //if x then o else x
  curr = curr == "X" ? "O" : "X";
  turn.textContent = `${curr}'s Turn!`;
};

const winCheck = () => {
  //check state against winning condition
  //like see if s[1,2,4,6,7] contains wc[1,4,7]
  let isWinningCondition;
  if (curr == "X") {
    isWinningCondition = gameboard.winCondition.some((subarray) =>
      subarray.every((value) => XPlayer.state.includes(value))
    );
  } else {
    isWinningCondition = gameboard.winCondition.some((subarray) =>
      subarray.every((value) => OPlayer.state.includes(value))
    );
  }

  console.log(isWinningCondition);

  if (isWinningCondition) {
    congrats.textContent = `Congratulations! ${curr} is the winner 🥳`;
    res();
  }
};
playGame();
