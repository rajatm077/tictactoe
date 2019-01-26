/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];  
const GRID_LENGTH = 3;
// let turn = 'X';

let movesPlayed = 0;
let gameConcluded = false;
let totalGames = 0;
let playerScore = 0;
let computerScore = 0;
let totalDraw = 0;

initializeGame();

function onBoxClick() {  
  let rowIdx = this.getAttribute("rowIdx");
  let colIdx = this.getAttribute("colIdx");

  // Grid already marked.
  if (grid[colIdx][rowIdx] !== 0) return;

  playPlayerMove(colIdx, rowIdx);

  if (gameConcluded) return initializeGame();
  else if (movesPlayed === GRID_LENGTH * GRID_LENGTH) {
    alert('Draw!');
    totalGames++;
    totalDraw++;
    return initializeGame();
  }

  // Computer will mark a random box
  playComputerMove(colIdx, rowIdx);  

  if (gameConcluded) return initializeGame();

  addClickHandlers();
}

function initializeGame() {
  
  grid.length = 0;
  movesPlayed = 0;
  gameConcluded = false;

  // Setting score values.
  document.getElementById('totalGames').innerHTML = 'Total games played: ' + totalGames;
  document.getElementById('playerScore').innerHTML = 'Player score: ' + playerScore;
  document.getElementById('computerScore').innerHTML = 'Computer score: ' + computerScore;
  document.getElementById('totalDraw').innerHTML = 'Draw: ' + totalDraw;
  
  initializeGrid();
  renderMainGrid();
  addClickHandlers();
  
}

function initializeGrid() {
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    const tempArray = [];
    for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
      tempArray.push(0);
    }
    grid.push(tempArray);
  }
}

function renderMainGrid() {
  const parent = document.getElementById("grid");
  const columnDivs = getColumns();
  parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function addClickHandlers() {
  var boxes = document.getElementsByClassName("box");
  for (var idx = 0; idx < boxes.length; idx++) {
    boxes[idx].addEventListener('click', onBoxClick, false);
  }
  let resetButton = document.getElementById('reset');
  resetButton.addEventListener('click', initializeGame, false);
}

function getRowBoxes(colIdx) {
  let rowDivs = '';

  for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
    let additionalClass = 'darkBackground';
    let content = '';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      additionalClass = 'lightBackground'
    }
    const gridValue = grid[colIdx][rowIdx];
    if (gridValue === 1) {
      content = '<span class="cross">X</span>';
    }
    else if (gridValue === 2) {
      content = '<span class="cross">O</span>';
    }
    rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
      additionalClass + '">' + content + '</div>';
  }
  return rowDivs;
}

function getColumns() {
  let columnDivs = '';
  for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
    let coldiv = getRowBoxes(colIdx);
    coldiv = '<div class="rowStyle">' + coldiv + '</div>';
    columnDivs = columnDivs + coldiv;
  }
  return columnDivs;
}

// Game logic

function checkRows(currentPlayer) {
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[i][0] === grid[i][1] && grid[i][1] === grid[i][2] &&
      grid[i][0] === currentPlayer) return true;
  }

  return false;
}

function checkColumns(currentPlayer) {
  for (let i = 0; i < GRID_LENGTH; i++) {
    if (grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]
      && grid[0][i] === currentPlayer) return true;
  }

  return false;
}

function checkDiagonals(currentPlayer) {
  if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]
    && grid[0][0] === currentPlayer) return true;

  if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0] &&
    grid[0][2] === currentPlayer) return true;

  return false;
} 

function checkWinner(currentPlayer) {
  currentPlayer = (currentPlayer === 'X') ? 1 : 2;

  return checkColumns(currentPlayer) || checkRows(currentPlayer) || 
  checkDiagonals(currentPlayer);
}

function playComputerMove(colIdx, rowIdx) {
  
  if (movesPlayed === 1) {
    if (grid[1][1] === 0) grid[1][1] = 2;
    else grid[2][2] = 2;    
  } 

  else {
    let played = false;

    //Checks all rows if Player is winning.
    top: for (let i = 0; i < grid.length; i++) {
      let total = 0;
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 1) total++;
        if (grid[i][j] === 2) total--;          
      }
      if (total === 2) {
        for (let j = 0; j < grid[i].length; j++) {
          if (grid[i][j] === 0) {
            grid[i][j] = 2;
            played = true;
            break top;
          }
        }
      }
    }

    //Checks all columns if Player is winning.
    top: for (let j = 0; j < !played && grid[j].length; j++) {
      let total = 0;
      for (let i = 0; i < grid.length; i++) {
        if (grid[i][j] === 1) total++;
        if (grid[i][j] === 2) total--;          
      }
      if (total === 2) {
        for (let i = 0; i < grid[i].length; i++) {
          if (grid[i][j] === 0) {
            grid[i][j] = 2;
            played = true;
            break top;
          }
        }
      }      
    }

      //Checks diagonals
    if (grid[1][1] !== 2) {
      let c1 = grid[0][0] === grid[1][1] && grid[0][0] === 1;
      let c2 = grid[1][1] === grid[2][2] && grid[1][1] === 1;
      if (!played && ( c1 || c2 )) {
        for (let i = 0; i < grid.length; i++) {
          if (grid[i][i] === 0) {
            grid[i][i] = 2;
            played = true; 
          }
        }
      } 

      c1 = grid[0][2] === grid[1][1] && grid[1][1] === 1;
      c2 = grid[1][1] === grid[2][0] && grid[2][0] === 1;
      if (!played && ( c1 || c2 )) {
        for (let i = 0; i < grid.length ; i++) {
          if (grid[i][2 - i] === 0) {
            grid[i][2 - i] = 2;
            played = true;
            break; 
          }
        }
      }
    }

    if (!played) {
      // play on the first available box.
      top: for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) { 
          if (grid[i][j] === 0) {
            grid[i][j] = 2;
            break top;
          }
        }
      }
    }
  }

  renderMainGrid();

  movesPlayed++;
  if (movesPlayed > 4 && checkWinner('O')){
    alert('Computer won the game!');
    gameConcluded = true;
    totalGames++;
    computerScore++;
  }
}

function playPlayerMove(colIdx, rowIdx) {
  grid[colIdx][rowIdx] = 1;
  renderMainGrid();
  
  movesPlayed++;
  if (movesPlayed > 4 && checkWinner('X'))  {
    alert('Player won the game!');
    gameConcluded = true;
    totalGames++;
    playerScore++;  
  }
}
