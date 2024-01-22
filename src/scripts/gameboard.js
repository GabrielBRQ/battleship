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
        // Verificar se a linha ou coluna existe
        for (let i = 0; i < ship.size; i++) {
            // Atribuir o navio à célula
            if (isVertical) {
                this.grid[row + i][col] = ship;
            } else {
                this.grid[row][col + i] = ship;
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
