import { Chip } from "./chip.js";

export class Player {
    constructor(name, canvas, chipImgPath) {
        this.name = name;
        this.canvas = canvas;
        this.chipImgPath = chipImgPath;
        this.chips = [];
    }

    addChip = (posX, posY) => {
        let chip = new Chip(this.chipImgPath, posX,posY,this.canvas);
        this.chips.push(chip);
    }

    draw = () => {
        this.chips.forEach(x => x.draw())
    }

}