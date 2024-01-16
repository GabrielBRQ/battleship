import _ from "lodash";
import "../style.css";
import { createGrid, startGame } from "./DOM-controler";

createGrid("playerOneGrid");
createGrid("playerTwoGrid");
startGame();