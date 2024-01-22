import { Gameboard } from "./gameboard";
import { game, changeTurn } from "./game";
import { Ship } from "./ships";
import { playerOne, playerTwo } from "./index";
import { updateUIAfterAttack } from "./DOM-controler";

function createBoard() {
  return new Gameboard();
}

function listenPlayerAttack() {
  // Function to make player click and call attack
  const assignmentTable = document.getElementById("playerTwoGrid");
  const cells = assignmentTable.getElementsByTagName("td");

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", attack);
  }
}

function attack(event) {
  if(game.rounds % 2 !== 0){
    // Function to place attack
    const selectedCell = event.target;
    // Get row and col
    const rowIndex = selectedCell.parentNode.rowIndex;
    const cellIndex = selectedCell.cellIndex;
  
    console.log(playerOne.grid);
    console.log(playerTwo.grid);
  
    if (!isCellAlreadyAttacked(rowIndex, cellIndex)) {
      changeTurn();
      console.log(`Atacando em ${rowIndex}, ${cellIndex}`);
      // Attack playerTwo
      const attackResult = playerTwo.receiveAttack(
        parseInt(rowIndex),
        parseInt(cellIndex)
      );
  
      // Atualizar a interface com base no resultado do ataque, se necessário
      updateUIAfterAttack(selectedCell, attackResult);
      setTimeout(() => {
        AIAttack(playerOne);
      }, 2000);
    } else {
      // Return if this cell is already attacked
      return;
    }
  }
}

function isCellAlreadyAttacked(row, col) {
  var elemento = playerTwo.grid[row][col];
  if (elemento === null || typeof elemento === "object") {
    return false;
  } else {
    return true;
  }
}

function AIAttack(board) {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  while (game.AIAttacks.includes(`${num1}-${num2}`)) {
    // Generate new coordinates
    num1 = Math.floor(Math.random() * 10);
    num2 = Math.floor(Math.random() * 10);
  }
  board.receiveAttack(num1, num2);
  game.AIAttacks.push(`${num1}-${num2}`);

  game.AIPlayed = true;
  changeTurn();
}

function placeAIShips(AIBoard) {
  let shipSizes = [5, 4, 3, 3, 2];
  for (let i = 0; i < 5; i++) {
    let ship = new Ship(shipSizes.shift());
    let num1, num2, vertical;

    // Check that the boat will not exceed the board limit
    do {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      vertical = Math.floor(Math.random() * 10) % 2 === 0;
    } while (!isValidPlacement(AIBoard, ship, num1, num2, vertical));

    console.log(`O que foi passado: ${num1}, ${num2}, ${vertical}`);
    AIBoard.placeShip(ship, num1, num2, vertical);
  }
}

// Function to check if the location is valid to place the boat
function isValidPlacement(board, ship, row, col, isVertical) {
  if (isVertical) {
    if (row + ship.size > 10) {
      // Check if the boat exceeds the lower limit
      return false;
    }
    for (let i = 0; i < ship.size; i++) {
      if (board.grid[row + i] && board.grid[row + i][col]) {
        // Check if there is an existing boat on site
        return false;
      }
    }
  } else {
    if (col + ship.size > 10) {
      // Check if the boat exceeds the right limit
      return false;
    }
    for (let i = 0; i < ship.size; i++) {
      if (board.grid[row] && board.grid[row][col + i]) {
        // Check if there is an existing boat on cell
        return false;
      }
    }
  }
  return true;
}

export { listenPlayerAttack, AIAttack, createBoard, placeAIShips, attack };
