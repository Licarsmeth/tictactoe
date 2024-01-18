const gameboard = (function () {
  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
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
let curr = "X"; //to set the current player
let count = 0; //if count == 9 and no one won, it's draw

//selecting the elements
const cells = document.querySelectorAll("main div");
const restart = document.querySelector("button");
const turn = document.querySelector(".turn");
const congrats = document.querySelector(".congo");

const res = () => {
  for (let cell of cells) {
    cell.textContent = "";
  }
  count = 0;
  congrats.textContent = "";
  OPlayer.state = [];
  XPlayer.state = [];
  playGame();
};

//restart click event
restart.addEventListener("click", res);

//freeze the game after it ends
const freezeBoard = () => {
  //   XPlayer.state = [];
  //   OPlayer.state = [];
  for (let cell of cells) {
    cell.removeEventListener("click", play);
  }
};

const play = (e) => {
  //first turn is of X
  //set the current player variable as curr
  if (e.target.textContent == "") {
    e.target.textContent = curr;
    updateState(e);
    count += 1;
    winCheck();
    changePlayer();
  }
};

const playGame = () => {
  for (let cell of cells) {
    cell.addEventListener("click", play);
  }
};

const updateState = (e) => {
  //if x turn change x state, else change o state
  curr == "X"
    ? XPlayer.state.push(Number(e.target.dataset.cell))
    : OPlayer.state.push(Number(e.target.dataset.cell));
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
  //draw
  if (count == 9 && !isWinningCondition) {
    count == 0;
    congrats.textContent = "GG! It's a draw 🤝 ";
    freezeBoard();
  }
  //win
  else if (isWinningCondition) {
    count == 0;
    congrats.textContent = `Congrats! ${curr} won 🥳`;
    freezeBoard();
  }
};
playGame();
