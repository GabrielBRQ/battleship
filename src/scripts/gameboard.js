class Gameboard {
    constructor() {
        this.grid = this.createEmptyGrid();
        this.ships = [];
    }

    createEmptyGrid() {
        // Create an empty board
        const grid = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 10; j++) {
                row.push(null);
            }
            grid.push(row);
        }
        return grid;
    }

    placeShip(ship, row, col, isVertical) {
        // Put a ship on the board
        if (isVertical) {
            for (let i = 0; i < ship.size; i++) {
                if (!this.grid[row + i]) {
                    this.grid[row + i] = [];
                    console.log(`Ship added in ${this.grid[row + i]}`)
                }
                if (!this.grid[row + i][col]) {
                    this.grid[row + i][col] = ship;
                    console.log(`Ship added in ${this.grid[row + i][col]}`)
                } else {
                    // Handle the case where a cell is already occupied
                    console.error('Error: Cell already occupied!');
                    return;
                }
            }
        } else {
            for (let i = 0; i < ship.size; i++) {
                if (!this.grid[row]) {
                    this.grid[row] = [];
                }
                if (!this.grid[row][col + i]) {
                    this.grid[row][col + i] = ship;
                } else {
                    // Handle the case where a cell is already occupied
                    console.error('Error: Cell already occupied!');
                    return;
                }
            }
        }
        this.ships.push(ship);
    }
    receiveAttack(row, col) {
        // Receive an attack at specific coordinates
        const target = this.grid[row][col];
        if (target === null) {
            // None parts was hit
            return false;
        } else {
            // Part of the ship was hit
            target.hit();
            return true;
        }
    }

    allShipsSunk() {
        // Verify if all ships are sunk
        return this.ships.every(ship => ship.isShipSunk);
    }
}

export {
    Gameboard
};
