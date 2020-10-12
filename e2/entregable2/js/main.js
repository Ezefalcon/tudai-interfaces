import { Canvas } from "./canvas.js";
import { Board } from "./board.js";
import { Player } from "./player.js";

let canvas;
let player1;
let player2;
let board;

const startGame = () => {
  if(canvas) {
    canvas.removeAllEventListeners();
  }
  canvas = new Canvas('#canvas');
  let player2Name = $("#player2Name").val();
  let player1Name = $("#player1Name").val();
  player1 = new Player(player1Name ? player1Name : 'Jugador 1', canvas, './assets/black-chip.png');
  player2 = new Player(player2Name ? player2Name : 'Jugador 2', canvas, './assets/red-chip.png');

  board = new Board(player1, player2, 6, 10, canvas, onPlayerOneWon, onPlayerTwoWon);
}

const onPlayerOneWon = () => {
  $("#winModal").modal();
  $("#playerNameWon").html(player1.name)
}

const onPlayerTwoWon = () => {
  $("#winModal").modal();
  $("#playerNameWon").html(player2.name)
}

$('#playersModal').on('hidden.bs.modal', function (e) {
  if(!canvas) {
    startGame();
  }
})

$("#playersModal").modal();
$("#restartGame").on({click: startGame});
$(".onGameStart").on({click: startGame})
