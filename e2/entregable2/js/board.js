import { CHIP_SIZE, ChipColor } from "./chip.js";
import {BoardSquare} from "./board-square.js";

export class Board {
  constructor(player1, player2, rows, columns, canvas) {
    this.player1 = player1;
    this.player2 = player2;
    this.rows = rows;
    this.columns = columns;
    this.canvas = canvas;
    this.arrows = [];
    this.canvas.addObjectToDraw(this);
    this.canvas.addEventListener("mouseup", this.checkForArrowsDrop);
    this.initializeChipsOnTable();
    this.isPlayerOneTurn = true;
    this.loadArrowImage();
  }

  initializeChipsOnTable = () => {
    this.chipsOnTable = [];
    for(let i = 0; i < this.columns; i++) {
      this.chipsOnTable[i] = [];
    }
  }

  getPlayer1ChipsPlace = () => {
    const width = this.canvas.getWidth();
    const height = this.canvas.getHeight();
    return {
      x: width / 14,
      width: width / 6,
      y: height / 1.4,
      height: height / 4
    }
  }

  getPlayer2ChipsPlace = () => {
    const width = this.canvas.getWidth();
    const height = this.canvas.getHeight();
    return {
      x: width / 1.35,
      width: width / 6,
      y: height / 1.4,
      height: height / 4
    }
  }

  drawPlayersChips = () => {
    let context = this.canvas.getContext();
    let place = this.getPlayer1ChipsPlace();
    let place2 = this.getPlayer2ChipsPlace();
    context.beginPath();
    context.rect(place.x, place.y, place.width, place.height);
    context.rect(place2.x, place2.y, place2.width, place2.height);
    context.stroke();
    this.addChipsToPlayers(place, place2);
    return place;
  }

  addChipsToPlayers = (placeOfChips, placeOfChips2) => {
    let totalChips = (this.columns * this.rows) / 2;
    for(let i = 0; i < totalChips; i++) {
      const posX = random(placeOfChips.x, placeOfChips.width + placeOfChips.x - CHIP_SIZE);
      const posY = random(placeOfChips.y, placeOfChips.height + placeOfChips.y - CHIP_SIZE);
      const posXP2 = random(placeOfChips2.x, placeOfChips2.width + placeOfChips2.x - CHIP_SIZE);
      const posYP2 = random(placeOfChips2.y, placeOfChips2.height + placeOfChips2.y - CHIP_SIZE);
      this.player1.addChip(posX, posY, ChipColor.BLACK);
      this.player2.addChip(posXP2, posYP2, ChipColor.RED);
    }
  }

  /** Method expensive AF. */
  draw = () => {
    let place = this.getPlayer1ChipsPlace();
    let place2 = this.getPlayer2ChipsPlace();
    this.canvas.drawRect(place.x, place.y, place.width, place.height);
    this.canvas.drawRect(place2.x, place2.y, place2.width, place2.height);
    let start = 25; // LEFT
    const endOfBoard = this.canvas.getWidth() - 25; // Right
    const bottom = this.canvas.getWidth() / 2;
    const squareSize = CHIP_SIZE + 10;
    let top = 25;

    this.arrows = [];
    for(let i = 0; i < this.columns; i++) {
      this.canvas.drawImage(this.arrowImage, start, top, squareSize, squareSize);
      this.arrows.push({x: start, y: top, width: squareSize, height: squareSize});
      start += squareSize;
    }

    start = 25;
    top = 25 + squareSize;

    if(!this.tablePositions) {
      this.tablePositions = [];
      for(let i = 1; i <= this.rows; i++) {
        this.tablePositions[i-1] = [];
        for(let j = 1; j <= this.columns; j++) {
          let boardSquare = new BoardSquare(start, top, squareSize, squareSize);
          this.tablePositions[i-1].push(boardSquare)
          this.canvas.drawRect(start, top, squareSize, squareSize);
          start += squareSize
        }
        start = 25
        top += squareSize;
      }
    } else {
      for(let i = 1; i <= this.rows; i++) {
        for(let j = 1; j <= this.columns; j++) {
          this.canvas.drawRect(start, top, squareSize, squareSize);
          start += squareSize
        }
        start = 25
        top += squareSize;
      }
    }

    this.chipsOnTable.forEach(x => x.forEach(y => y.draw()))
  }

  loadArrowImage = () => {
    this.arrowImage = new Image();
    this.arrowImage.onload = this.draw;
    this.arrowImage.src = './assets/down-arrow.png';
  }

  pointOnArrow = (arrow, mousePosX, mousePosY) =>  {
    return mousePosX >= arrow.x && mousePosX <= arrow.width + arrow.x
      && mousePosY >= arrow.y
      && mousePosY <= arrow.height + arrow.y;
  }

  checkForArrowsDrop = (e) => {
    let mousePosX = this.canvas.getMousePosX(e);
    let mousePosY = this.canvas.getMousePosY(e);
    this.arrows.forEach((arrow, column) => {
      if(this.pointOnArrow(arrow, mousePosX, mousePosY)) {
        if(this.isPlayerOneTurn) {
          this.addChipOnBoardAndDeleteChipFromPlayer(this.player1, column, mousePosX, mousePosY);
          this.isPlayerOneTurn = false;
          this.player1.blockChips();
          this.player2.releaseChips();
        } else {
          this.addChipOnBoardAndDeleteChipFromPlayer(this.player2, column, mousePosX, mousePosY);
          this.isPlayerOneTurn = true;
          this.player1.releaseChips();
          this.player2.blockChips();
        }
      }
    });
  }

  addChipOnBoardAndDeleteChipFromPlayer = (player, column, mousePosX, mousePosY) => {
    player.chips = player.chips
      .filter(chip => {
        const b = this.pointOnArrow({x: chip.posX, y: chip.posY, width: CHIP_SIZE, height: CHIP_SIZE}, mousePosX, mousePosY);
        if(b) {
          this.setChipPositionOnTable(column, chip);
        }
        return !b;
      });
    this.checkIfWins();
  }

  setChipPositionOnTable = (column, chip) => {
    for(let i = this.rows - 1; i >= 0; i--) {
      let lastAvailableRow = this.tablePositions[i][column];
      if(!lastAvailableRow.isChipped) {
        this.chipsOnTable[column].push(chip);
        chip.posX = lastAvailableRow.x;
        chip.posY = lastAvailableRow.y;
        chip.drawAndBlock()
        this.tablePositions[i][column].setIsChipped(true);
        return chip;
      }
    }
  }

  checkIfWins() {
    for (let column = 0; column < this.chipsOnTable.length; column++) {
      let consecutiveRedChips = 0;
      let consecutiveBlackChips = 0;
      for (let row = 0; row < this.chipsOnTable[column].length; row++) {
        // Check consecutive chips
        if (this.chipsOnTable[column][row].color === ChipColor.BLACK) {
          consecutiveBlackChips++;
          consecutiveRedChips = 0;
        } else {
          consecutiveBlackChips = 0;
          consecutiveRedChips++;
        }
        if (consecutiveBlackChips == 4) {
          alert("Gano el negro")
        } else if (consecutiveRedChips == 4) {
          alert("Gano el rojo")
        }
      }
    }
    let row = 0;
    while (row < this.rows) {
      let consecutiveRedChips = 0;
      let consecutiveBlackChips = 0;
      for (let i = 0; i < this.columns; i++) {
        let chip = this.chipsOnTable[i][row];
        if (chip) {
          if (chip.color === ChipColor.BLACK) {
            consecutiveBlackChips++;
            consecutiveRedChips = 0;
          } else {
            consecutiveBlackChips = 0;
            consecutiveRedChips++;
          }
        }
        this.alertWinner(consecutiveBlackChips, consecutiveRedChips);
      }
      row++;
    }
  }

  alertWinner(consecutiveBlackChips, consecutiveRedChips) {
    if (consecutiveBlackChips == 4) {
      alert("Gano el negro")
    } else if (consecutiveRedChips == 4) {
      alert("Gano el rojo")
    }
  }
}

const random = (min, max) => {
  return min + Math.random() * (max - min);
}