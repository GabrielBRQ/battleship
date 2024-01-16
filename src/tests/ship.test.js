import { Ship } from "../scripts/ships";

test('hit increment hits', () => {
    const myShip = new Ship(3);
    myShip.hit();
    expect(myShip.hits).toBe(1);
});

test('hit and is not sunk', () => {
    const myShip = new Ship(3);
    myShip.hit();
    expect(myShip.isShipSunk).toBe(false);
});

test('hit and sunk', () => {
    const myShip = new Ship(1);
    myShip.hit();
    expect(myShip.isShipSunk).toBe(true);
});