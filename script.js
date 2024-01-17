const gameboard = (function () {
  const gameArray = [];
  return { gameArray };
})();

const Players = function (name, state = "") {
  return { name, state };
};

const oPlayer = Players("O");
const xPlayer = Players("X");
// console.log(oPlayer);

//selecting the elements
const cells = document.querySelectorAll("main div");
const restart = document.querySelector("button");
const turn = document.querySelector(".turn");

restart.addEventListener("click", () => {
  for (let cell of cells) {
    cell.textContent = "";
  }
});

let curr = "X";
const playGame = () => {
  //first turn is of X
  //set the current player variable as curr
  for (let cell of cells) {
    cell.addEventListener("click", (e) => {
      if (e.target.textContent == "") {
        e.target.textContent = curr;
        changePlayer();
      }
    });
  }
};

const changePlayer = () => {
  //if x then o else x
  curr = curr == "X" ? "O" : "X";
  turn.textContent = `${curr}'s Turn!`;
};

const winCheck = () => {
  //put current state as 's' and check 's' patters
  //against the various array possibilities
};
playGame();
