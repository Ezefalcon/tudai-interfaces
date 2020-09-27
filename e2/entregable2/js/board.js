import { CHIP_SIZE } from "./chip.js";

export class Board {
    constructor(player1, player2, rows, columns, canvas) {
        this.player1 = player1;
        this.player2 = player2;
        this.rows = rows;
        this.columns = columns;
        this.canvas = canvas;
        this.canvas.addObjectToDraw(this);
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
        let totalChips = (this.columns + this.rows) / 2;
        for(let i = 0; i < totalChips; i++) {
            const posX = random(placeOfChips.x, placeOfChips.width + placeOfChips.x - CHIP_SIZE);
            const posY = random(placeOfChips.y, placeOfChips.height + placeOfChips.y - CHIP_SIZE);
            const posXP2 = random(placeOfChips2.x, placeOfChips2.width + placeOfChips2.x - CHIP_SIZE);
            const posYP2 = random(placeOfChips2.y, placeOfChips2.height + placeOfChips2.y - CHIP_SIZE);
            this.player1.addChip(posX, posY);
            this.player2.addChip(posXP2, posYP2);
        }
    }

    draw = () => {
        this.player1.draw();
    }
}

const random = (min, max) => {
    return min + Math.random() * (max - min);
}