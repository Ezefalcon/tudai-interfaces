const CHIP_SIZE = 50;

export class Chip {
    constructor(imgPath, posX, posY, canvas) {
        this.imgPath = imgPath;
        this.posX = posX;
        this.posY = posY;
        this.canvas = canvas;
        this.context = canvas.getContext();
        this.loadImage();
        this.addEventListeners();
    }

    pointInCircle = (x, y) =>  {
        const distanceSquared = (x - this.posX) * (x - this.posX) + (y - this.posY) * (y - this.posY);
        return distanceSquared <= CHIP_SIZE / 2 * CHIP_SIZE / 2;
    }
    
    handleMouseDown = (e) => {
        const x = this.canvas.getMousePosX(e);
        const y = this.canvas.getMousePosY(e);
        if(this.pointInCircle(x, y)) {
            this.isDragging=true;
        }
    }

    handleMouseUp = (e) => {
        this.isDragging=false;
    }

    handleMouseOut = (e) => {
        this.isDragging=false;
    }

    handleMouseMove = (e) => {
        if(this.isDragging) {
            this.posX = this.canvas.getMousePosX(e);
            this.posY = this.canvas.getMousePosY(e);
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.context.drawImage(this.img, this.posX - CHIP_SIZE / 2, this.posY - CHIP_SIZE / 2, CHIP_SIZE, CHIP_SIZE);
        }
    }
    
    loadImage = () => {
        this.img = new Image();
        this.img.onload = this.draw;
        this.img.src = this.imgPath;
    }

    draw = () => {
        this.context.drawImage(this.img, this.posX, this.posY, CHIP_SIZE, CHIP_SIZE);
        // Set center of chip
        this.posX = this.posX + CHIP_SIZE / 2;
        this.posY = this.posY + CHIP_SIZE / 2;
    }

    addEventListeners = () =>  {
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
        this.canvas.addEventListener("mouseout", this.handleMouseOut);
    }
}