import { Chip } from "./chip.js";
import {ChipColor} from "./chip.js";

export class Player {
    constructor(name, canvas, chipImgPath) {
        this.name = name;
        this.canvas = canvas;
        this.chipImgPath = chipImgPath;
        this.chips = [];
    }

    addChip = (posX, posY, chipColor) => {
        let chip = new Chip(this.chipImgPath, posX,posY,this.canvas, chipColor);
        this.chips.push(chip);
    }

    blockChips = () => {
        this.chips.forEach(x => x.isBlocked = true)
    }

    releaseChips = () => {
        this.chips.forEach(x => x.isBlocked = false)
    }

    draw = () => {
        this.chips.forEach(x => x.draw())
    }
}