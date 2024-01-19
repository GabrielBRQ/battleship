import _ from "lodash";
import "../style.css";
import { createGrid, startGame } from "./DOM-controler";
import { Gameboard } from "./gameboard";

createGrid("playerOneGrid");
createGrid("playerTwoGrid");
const playerOne = new Gameboard();
const playerTwo = new Gameboard();
startGame(playerOne, playerTwo);

export {
    playerOne,
    playerTwo,
}