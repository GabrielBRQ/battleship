import _ from "lodash";
import "../style.css";
import { changeStyle, createGrid, startGame } from "./DOM-controler";
import { Gameboard } from "./gameboard";
import { listenPlayerAttack } from "./player";

changeStyle();
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