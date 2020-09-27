export const CHIP_SIZE = 75;

export class Chip {
    constructor(imgPath, posX, posY, canvas) {
        this.imgPath = imgPath;
        this.posX = posX;
        this.posY = posY;
        this.canvas = canvas;
        this.context = canvas.getContext();
        this.loadImage();
        this.addEventListeners();
        this.canvas.addObjectToDraw(this);
    }

    pointInCircle = (x, y) =>  {
        const relativeX = this.posX + CHIP_SIZE / 2;
        const relativeY = this.posY + CHIP_SIZE / 2;
        const distanceSquared = (x - relativeX) * (x - relativeX) + (y - relativeY) * (y - relativeY);
        return distanceSquared <= CHIP_SIZE / 2 * CHIP_SIZE / 2;
    }
    
    handleMouseDown = (e) => {
        const x = this.canvas.getMousePosX(e);
        const y = this.canvas.getMousePosY(e);
        if(this.pointInCircle(x, y) && !this.canvas.isDraggingObject) {
            this.isDragging=true;
            this.canvas.isDraggingObject = true;
        }
    }

    handleMouseUp = (e) => {
        this.isDragging=false;
        this.canvas.isDraggingObject = false;
    }

    handleMouseOut = (e) => {
        this.isDragging=false;
        this.canvas.isDraggingObject = false;
    }

    handleMouseMove = (e) => {
        if(this.isDragging) {
            this.posX = this.canvas.getMousePosX(e) - CHIP_SIZE / 2;
            this.posY = this.canvas.getMousePosY(e) - CHIP_SIZE / 2;
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.context.drawImage(this.img, this.posX , this.posY, CHIP_SIZE, CHIP_SIZE);
            this.canvas.reDrawAllObjectsBut(this);
        }
    }
    
    loadImage = () => {
        this.img = new Image();
        this.img.onload = this.draw;
        this.img.src = this.imgPath;
    }

    draw = () => {
        if(!this.isDragging) {
            this.context.drawImage(this.img, this.posX, this.posY, CHIP_SIZE, CHIP_SIZE);
        }
    }

    addEventListeners = () =>  {
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("mouseup", this.handleMouseUp);
        this.canvas.addEventListener("mouseout", this.handleMouseOut);
    }
}