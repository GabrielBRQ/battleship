import { Gameboard } from "./gameboard";
import { game, changeTurn } from "./game";

function createBoard() {
  return new Gameboard();
}

function playerAttack(num1, num2, board) {
  board.receiveAttack(num1, num2);
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
}


export {
  playerAttack,
  AIAttack,
  createBoard
}