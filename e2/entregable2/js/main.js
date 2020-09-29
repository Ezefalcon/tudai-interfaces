import { Canvas } from "./canvas.js";
import { Board } from "./board.js";
import { Player } from "./player.js";

let canvas = new Canvas('#canvas');
let context = canvas.getContext();

let player1 = new Player('Zeque', canvas, './assets/black-chip.png');
let player2 = new Player('Zeque2', canvas, './assets/red-chip.png');

let board = new Board(player1, player2, 6, 10, canvas);
board.drawPlayersChips();
