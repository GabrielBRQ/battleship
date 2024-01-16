import { Gameboard } from "../scripts/gameboard";
import { Ship } from "../scripts/ships";

test('placeShip should place a ship on the board', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 3, true);

    // Check that the ship has been placed correctly on the board positions
    expect(gameboard.grid[2][3]).toBe(ship);
    expect(gameboard.grid[3][3]).toBe(ship);
    expect(gameboard.grid[4][3]).toBe(ship);
});

test('receiveAttack should hit the ship if there is one', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);

    gameboard.placeShip(ship, 2, 3, true);

    // Attack a position where the ship is
    const result = gameboard.receiveAttack(3, 3);

    // Check if the ship has been hit
    expect(result).toBe(true);
    expect(ship.hits).toBe(1);
});

test('receiveAttack should return false if no ship is present', () => {
    const gameboard = new Gameboard();

    // Attack an empty position
    const result = gameboard.receiveAttack(3, 3);

    // Check that no ships were hit
    expect(result).toBe(false);
});