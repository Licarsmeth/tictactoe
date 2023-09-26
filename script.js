const gameboard = function(){
    const gameArray = [];
    return{gameArray};
}();

const Players = function(name, state=""){
    return {name, state};
}

const oPlayer = Players('Player O', 'O');
const xPlayer = Players('Player X', 'X');
console.log(oPlayer);
