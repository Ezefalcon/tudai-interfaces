export class Canvas {
    constructor(canvasId) {
        const canvas = document.querySelector(canvasId);
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
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
}
