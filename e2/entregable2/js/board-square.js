export class BoardSquare {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    setIsChipped = (isChipped) => {
        this.isChipped = isChipped;
    }
}