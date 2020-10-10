import { CHIP_SIZE, ChipColor } from "./chip.js";
import {BoardSquare} from "./board-square.js";
const TOP_SPACING = 25;

export class Board {
  constructor(player1, player2, rows, columns, canvas, onPlayerOneWin, onPlayerTwoWin) {
    this.player1 = player1;
    this.player2 = player2;
    this.rows = rows;
    this.columns = columns;
    this.canvas = canvas;
    this.arrows = [];
    this.canvas.addObjectToDraw(this);
    this.canvas.addEventListener("mouseup", this.checkForArrowsDrop);
    this.height = this.rows * CHIP_SIZE ;
    this.initializeChipsOnTable();
    this.isPlayerOneTurn = true;
    this.loadImages();
    this.onPlayerOneWin = onPlayerOneWin;
    this.onPlayerTwoWin = onPlayerTwoWin;
  }

  initializeChipsOnTable = () => {
    this.chipsOnTable = [];
    for(let i = 0; i < this.columns; i++) {
      this.chipsOnTable[i] = [];
      for(let j = 0; j < this.rows; j++) {
        this.chipsOnTable[i][j] = null;
      }
    }
  }

  getPlayer1ChipsPlace = () => {
    const width = this.canvas.getWidth();
    const height = this.canvas.getHeight();
    return {
      x: 20,
      width: width / 6,
      y: 25 + CHIP_SIZE + 10,
      height: this.height
    }
  }

  getPlayer2ChipsPlace = () => {
    const width = this.canvas.getWidth();
    const height = this.canvas.getHeight();
    const placeWidth = width / 6;
    return {
      x: width - placeWidth - 20,
      width: placeWidth,
      y: 25 + CHIP_SIZE + 10,
      height: this.height
    }
  }

  drawPlayersChips = () => {
    let context = this.canvas.getContext();
    let place = this.getPlayer1ChipsPlace();
    let place2 = this.getPlayer2ChipsPlace();
    context.beginPath();
    // context.rect(place.x, place.y, place.width, place.height);
    // context.rect(place2.x, place2.y, place2.width, place2.height);
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
    this.canvas.drawImage(this.backgroundImage, 0, 0, this.canvas.getWidth(), this.canvas.getHeight());
    if(!this.tablePositions) {
      this.drawPlayersChips();
    }

    let player1ChipsPlace = this.getPlayer1ChipsPlace();
    // this.canvas.drawRect(player1ChipsPlace.x, player1ChipsPlace.y, player1ChipsPlace.width, player1ChipsPlace.height);
    // this.canvas.drawRect(player2ChipsPlace.x, player2ChipsPlace.y, player2ChipsPlace.width, player2ChipsPlace.height);
    const START_OF_BOARD = player1ChipsPlace.x + player1ChipsPlace.width + 10;
    let start = START_OF_BOARD; // LEFT
    const SQUARE_SIZE = CHIP_SIZE + 10;
    let top = TOP_SPACING;

    this.arrows = [];
    for(let i = 0; i < this.columns; i++) {
      this.canvas.drawImage(this.arrowImage, start, top, SQUARE_SIZE, SQUARE_SIZE);
      this.arrows.push({x: start, y: top, width: SQUARE_SIZE, height: SQUARE_SIZE});
      start += SQUARE_SIZE;
    }

    start = START_OF_BOARD;
    top = TOP_SPACING + SQUARE_SIZE;

    if(!this.tablePositions) {
      // Initialize everything
      this.tablePositions = [];
      for(let i = 1; i <= this.rows; i++) {
        this.tablePositions[i-1] = [];
        for(let j = 1; j <= this.columns; j++) {
          let boardSquare = new BoardSquare(start, top, SQUARE_SIZE, SQUARE_SIZE);
          this.tablePositions[i-1].push(boardSquare)
          this.canvas.drawImage(this.boardCircle, start, top, SQUARE_SIZE, SQUARE_SIZE);
          // this.canvas.drawRect(start, top, SQUARE_SIZE, SQUARE_SIZE);
          start += SQUARE_SIZE
        }
        start = START_OF_BOARD;
        top += SQUARE_SIZE;
      }
      this.player2.blockChips();
    } else {
      for(let i = 1; i <= this.rows; i++) {
        for(let j = 1; j <= this.columns; j++) {
          // this.canvas.drawRect(start, top, SQUARE_SIZE, SQUARE_SIZE);
          this.canvas.drawImage(this.boardCircle, start, top, SQUARE_SIZE, SQUARE_SIZE);
          start += SQUARE_SIZE
        }
        start = START_OF_BOARD;
        top += SQUARE_SIZE;
      }
    }
    this.chipsOnTable.forEach(x => x.forEach(y => {
      if(y) y.draw()
    }));
  }

  loadImages = () => {
    this.arrowImage = new Image();
    this.arrowImage.onload = this.joinOnLoad;
    this.arrowImage.src = './assets/down-arrow.png';

    this.boardCircle = new Image();
    this.boardCircle.onload = this.joinOnLoad;
    this.boardCircle.src = './assets/board-circle-black.png';

    this.backgroundImage = new Image();
    this.backgroundImage.onload = this.joinOnLoad;
    this.backgroundImage.src = './assets/wood-background.jpg';
  }

  joinOnLoad = () => {
    if(this.arrowImage.complete && this.boardCircle.complete && this.backgroundImage.complete) {
      this.draw()
    }
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
          this.player1.blockChips();
          this.player2.releaseChips();
          this.isPlayerOneTurn = false;
        } else {
          this.addChipOnBoardAndDeleteChipFromPlayer(this.player2, column, mousePosX, mousePosY);
          this.player1.releaseChips();
          this.player2.blockChips();
          this.isPlayerOneTurn = true;
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
        this.chipsOnTable[column][i] = chip;
        chip.posX = lastAvailableRow.x + 5;
        chip.posY = lastAvailableRow.y + 5;
        chip.drawAndBlock();
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
        if(this.chipsOnTable[column][row]) {
          if (this.chipsOnTable[column][row].color === ChipColor.BLACK) {
            consecutiveBlackChips++;
            consecutiveRedChips = 0;
          } else {
            consecutiveBlackChips = 0;
            consecutiveRedChips++;
          }
          this.alertWinner(consecutiveBlackChips, consecutiveRedChips)
        } else {
          consecutiveRedChips = 0;
          consecutiveBlackChips = 0;
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
          this.alertWinner(consecutiveBlackChips, consecutiveRedChips);
        } else {
          consecutiveRedChips = 0;
          consecutiveBlackChips = 0;
        }
      }
      row++;
    }
    this.checkDiagonals()
    this.checkDiagonalsReversed()

  }

  alertWinner(consecutiveBlackChips, consecutiveRedChips) {
    if (consecutiveBlackChips == 4) {
      this.onPlayerOneWin();
    } else if (consecutiveRedChips == 4) {
      this.onPlayerTwoWin();
    }
  }

  checkDiagonals() {
    console.log(this.chipsOnTable)
    for (let row = 0; row < this.chipsOnTable.length - 3; row++) {
      for (let col = 3; col < this.chipsOnTable[row].length; col++) {
        let chip1 = this.chipsOnTable[row][col];
        let chip2 = this.chipsOnTable[row + 1][col - 1];
        let chip3 = this.chipsOnTable[row + 2][col - 2];
        let chip4 = this.chipsOnTable[row + 3][col - 3];
        const chips = [chip1, chip2, chip3, chip4];
        if (chip1 && chip2 && chip3 && chip4) {
          if(this.areAllChipsSameColor(chips, ChipColor.BLACK)) {
            this.onPlayerOneWin();
          } else if(this.areAllChipsSameColor(chips, ChipColor.RED)) {
            this.onPlayerTwoWin();
          }
        }
      }
    }
  }

  checkDiagonalsReversed() {
    for (let row = 0; row < this.chipsOnTable.length - 3; row++) {
      for (let col = 0; col < this.chipsOnTable[row].length - 3; col++) {
        let chip1 = this.chipsOnTable[row][col];
        let chip2 = this.chipsOnTable[row + 1][col + 1];
        let chip3 = this.chipsOnTable[row + 2][col + 2];
        let chip4 = this.chipsOnTable[row + 3][col + 3];
        const chips = [chip1, chip2, chip3, chip4];
        if (chip1 && chip2 && chip3 && chip4) {
          if(this.areAllChipsSameColor(chips, ChipColor.BLACK)) {
            this.onPlayerOneWin();
          } else if(this.areAllChipsSameColor(chips, ChipColor.RED)) {
            this.onPlayerTwoWin();
          }
        }
      }
    }
  }

  areAllChipsSameColor(chips, color) {
    return !chips.some(x => x.color !== color)
  }
}

const random = (min, max) => {
  return min + Math.random() * (max - min);
}
