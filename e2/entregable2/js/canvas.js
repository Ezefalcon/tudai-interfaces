export class Canvas {
    constructor(canvasId) {
        const canvas = document.querySelector(canvasId);
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
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
}
