import { playerAttack, AIAttack, createBoard } from "../scripts/player";
import { Gameboard } from "../scripts/gameboard";
import { Ship } from "../scripts/ships";

let originalMathRandom;

beforeEach(() => {
  originalMathRandom = Math.random; // Salvar a função original
  const mockMathRandom = jest.fn();
  global.Math.random = mockMathRandom;
  mockMathRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.3);
});

afterEach(() => {
  global.Math.random = originalMathRandom; // Restaurar a função original após cada teste
});


test('player attack works', () => {
    let playerBoard = createBoard();
    const ship = new Ship(3);

    playerBoard.placeShip(ship, 1, 2, true);


    playerAttack(1,2, playerBoard);
    expect(ship.hits).toBe(1);
});

test('AIAttack generate random coordinates and calls receiveAttack', () => {
  const mockMathRandom = jest.fn();
  global.Math.random = mockMathRandom;
  mockMathRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.3);

  const ship = new Ship(3);

  let playerBoard = createBoard();
  playerBoard.placeShip(ship, 5, 3, true);
  AIAttack(playerBoard);

  //Verificar se Math.random foi chamado corretamente
  expect(mockMathRandom).toHaveBeenCalledTimes(2);

  expect(ship.hits).toBe(1);
});