import { Gameboard } from "./gameboard";
import { Ship, createShip } from "./ships";
import { playerOne, playerTwo } from "./index";
import { placeAIShips } from "./player";

function createGrid(tableId) {
  var table = document.getElementById(tableId);

  for (var i = 0; i < 10; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < 10; j++) {
      var cell = row.insertCell(j);
    }
  }
}

function startGame() {
  const onePlayerButton = document.querySelector(".playerOne");
  const menu = document.querySelector(".menu");
  const shipScreen = document.querySelector(".ship-assignment");

  onePlayerButton.addEventListener("click", function () {
    menu.style.display = "none";
    shipScreen.style.display = "flex";
    createGrid("assignment");
    assignmentShips(playerOne);
  });
}

function assignmentShips(playerOne) {
  const assignmentDiv = document.querySelector(".ship-assignment");
  const assignmentTable = document.getElementById("assignment");
  const playerOneTable = document.getElementById("playerOneGrid");
  const cells = assignmentTable.getElementsByTagName("td");
  const rotateButton = document.querySelector(".rotate-button");
  let isHorizontal = true; // Flag to track the orientation
  let extraCells = 5; // Number of extra cells to highlight initially
  let shipSizes = [5, 4, 3, 3, 2]; // Sizes of the ships to be placed
  let currentShipIndex = 0; // Index of the current ship size being placed

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mouseover", highlightCells);
    cells[i].addEventListener("mouseout", removeHighlights);
    cells[i].addEventListener("click", selectCell);
  }

  rotateButton.addEventListener("click", rotateGrid);

  function highlightCells(event) {
    const cellIndex = event.target.cellIndex;
    const rowIndex = event.target.parentNode.rowIndex;

    if (isHorizontal && cellIndex + extraCells - 1 <= 9) {
      // Highlight the current cell and the next 'extraCells' cells horizontally
      for (let i = 0; i < extraCells; i++) {
        const cell = assignmentTable.rows[rowIndex].cells[cellIndex + i];
        if (cell) {
          cell.classList.add("highlight");
        }
      }
    } else if (!isHorizontal && rowIndex + extraCells - 1 <= 9) {
      // Highlight the current cell and the next 'extraCells' cells vertically
      for (let i = 0; i < extraCells; i++) {
        const cell =
          assignmentTable.rows[rowIndex + i] &&
          assignmentTable.rows[rowIndex + i].cells[cellIndex];
        if (cell) {
          cell.classList.add("highlight");
        }
      }
    }
  }

  function removeHighlights() {
    const highlightedCells = assignmentTable.querySelectorAll(".highlight");
    highlightedCells.forEach((cell) => {
      cell.classList.remove("highlight");
    });
  }

  function selectCell(event) {
    const selectedCell = event.target;

    // Check if the cell or the next 'extraCells' cells are already selected
    for (let i = 0; i < extraCells; i++) {
      const rowIndex = isHorizontal
        ? selectedCell.parentNode.rowIndex
        : selectedCell.parentNode.rowIndex + i;

      const cellIndex = isHorizontal
        ? selectedCell.cellIndex + i
        : selectedCell.cellIndex;

      if (rowIndex > 9 || cellIndex > 9) {
        return; // Return early if any part of the ship is outside the grid
      }

      const cell = assignmentTable.rows[rowIndex].cells[cellIndex];
      const playerCell = playerOneTable.rows[rowIndex].cells[cellIndex];

      if (cell && cell.classList.contains("selected")) {
        return; // Return early if any of the cells are already selected
      }

      if (cell) {
        cell.classList.add("selected");
        playerCell.classList.add("selected");
      }

      if (i === extraCells - 1) {
        placePlayerShip(rowIndex, selectedCell.cellIndex);
      }
    }

    function placePlayerShip(rowIndex, col) {
      // Create a new ship with the specified size
      const newShip = createShip(shipSizes[currentShipIndex]);

      

      // Call placeShip to position the ship on the gameboard
      if(!isHorizontal){
        playerOne.placeShip(newShip, rowIndex - (shipSizes[currentShipIndex] - 1), col, !isHorizontal);
      }else {
        playerOne.placeShip(newShip, rowIndex, col, !isHorizontal);

      }
    }

    // Move to the next ship size
    currentShipIndex++;

    // If all ships are placed, reset the game or take further actions
    if (currentShipIndex >= shipSizes.length) {
      assignmentDiv.style.display = "none";
      placeAIShips(playerTwo);
    } else {
      // Update the number of extra cells for the next ship
      extraCells = shipSizes[currentShipIndex];
      changeText(currentShipIndex);
    }
  }

  function changeText(extraCells) {
    var menuTitleElement = document.querySelector(
      ".ship-assignment .menu-title"
    );
    switch (extraCells) {
      case 0:
        menuTitleElement.textContent = "Place your Carrier";
        break;
      case 1:
        menuTitleElement.textContent = "Place your Battleship";
        break;
      case 2:
        menuTitleElement.textContent = "Place your Destroyer";
        break;
      case 3:
        menuTitleElement.textContent = "Place your Submarine";
        break;
      case 4:
        menuTitleElement.textContent = "Place your Patrol Boat";
        break;
    }
  }

  function rotateGrid() {
    isHorizontal = !isHorizontal; // Toggle the orientation
  }
}

// Função para atualizar a interface após o ataque
function updateUIAfterAttack(selectedCell, attackResult) {
  if(attackResult){
    selectedCell.classList.add("hit");
  } else {
    selectedCell.classList.add("miss");
  }
}

export { createGrid, startGame, updateUIAfterAttack };
