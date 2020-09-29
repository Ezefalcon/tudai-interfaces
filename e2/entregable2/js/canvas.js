export class Canvas {
    constructor(canvasId) {
        const canvas = document.querySelector(canvasId);
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.objectsToDraw = [];
    }

    setWidth(width) {
        this.canvas.width = width;
        this.width = this.canvas.width;
    }

    setHeight(height) {
        this.canvas.height = height;
        this.height = this.canvas.height;
    }

    getContext() {
        return this.context;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    addEventListener(action, func) {
        this.canvas.addEventListener(action, func);
    }

    clearContext() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    getImageData() {
        return this.context.getImageData(0, 0, this.width, this.height);
    }


    getMousePositionOnCanvas = (e) => {
        let bound = this.canvas.getBoundingClientRect();
        let x = e.clientX - bound.left - this.canvas.clientLeft;
        let y = e.clientY - bound.top - this.canvas.clientTop;
        return {x, y};
    }

    getMousePosX = (e) => {
        return this.getMousePositionOnCanvas(e).x;
    }

    getMousePosY = (e) => {
        return this.getMousePositionOnCanvas(e).y;
    }

    /** All objects added should have an implemented method draw(). */
    addObjectToDraw = (object) => {
        this.objectsToDraw.push(object)
    }

    drawEmAll = () => {
        this.objectsToDraw.forEach(obj => {
            obj.draw();
        });
    }

    reDrawAllObjectsBut = (objectThatShouldNotBeReDraw) => {
        this.objectsToDraw.forEach(obj => {
            if(objectThatShouldNotBeReDraw !== obj) {
                obj.draw();
            }
        });
    }

    drawRect = (x, y, width, height) => {
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.stroke();
    }

    drawImage = (img, posX, posY, width, height) => {
        this.context.drawImage(img, posX, posY, width, height);
    }
}
