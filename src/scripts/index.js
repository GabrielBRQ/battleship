import _ from "lodash";
import "../style.css";
import { createGrid, startGame } from "./DOM-controler";
import { Gameboard } from "./gameboard";
import { listenPlayerAttack } from "./player";

createGrid("playerOneGrid");
createGrid("playerTwoGrid");
const playerOne = new Gameboard();
const playerTwo = new Gameboard();
startGame(playerOne, playerTwo);
listenPlayerAttack();

export {
    playerOne,
    playerTwo,
}