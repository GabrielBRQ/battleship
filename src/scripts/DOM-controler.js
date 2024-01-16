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
    assignmentShips();
  });
}

function assignmentShips() {
  const assignmentTable = document.getElementById("assignment");
  const cells = assignmentTable.getElementsByTagName("td");
  const rotateButton = document.querySelector(".rotate-button");
  let isHorizontal = true;

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("mouseover", highlightCells);
    cells[i].addEventListener("mouseout", removeHighlights);
    cells[i].addEventListener('click', selectCell);
  }

  rotateButton.addEventListener("click", rotateGrid);

  function highlightCells(event) {
    const cellIndex = event.target.cellIndex;
    const rowIndex = event.target.parentNode.rowIndex;

    if (isHorizontal) {
      // Highlight the current cell and the next 4 cells horizontally
      for (let i = 0; i < 5; i++) {
        const cell = assignmentTable.rows[rowIndex].cells[cellIndex + i];
        if (cell) {
          cell.classList.add("highlight");
        }
      }
    } else {
      // Highlight the current cell and the next 4 cells vertically
      for (let i = 0; i < 5; i++) {
        const cell = assignmentTable.rows[rowIndex + i].cells[cellIndex];
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

    // Remove previous selections
    const selectedCells = assignmentTable.querySelectorAll('.selected');
    selectedCells.forEach(cell => {
      cell.classList.remove('selected');
    });

    // Mark the clicked cell and the next 4 cells
    for (let i = 0; i < 5; i++) {
      const cell = isHorizontal
        ? selectedCell.parentNode.cells[selectedCell.cellIndex + i]
        : assignmentTable.rows[selectedCell.parentNode.rowIndex + i].cells[selectedCell.cellIndex];

      if (cell) {
        cell.classList.add('selected');
      }
    }
  }

  function rotateGrid() {
    isHorizontal = !isHorizontal;
  }
}

export { createGrid, startGame };
