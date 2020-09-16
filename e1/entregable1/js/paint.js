import {DrawTool} from "./drawTool.js";
import {Canvas} from "./canvas.js";
import {Filters} from "./filters.js";

export class Paint {

    constructor(canvasId) {
        this.canvas = new Canvas(canvasId);
        this.contextTools = [];
        this.addEventsToCanvas();
        this.currentTool = null;
        this.img = null;
    }

    addContextTool(element, color) {
        this.contextTools.push(new DrawTool(element, color));
    }

    setCurrentTool(element) {
        this.contextTools.forEach(tool => {
            let toolElement = tool.element;
            if(toolElement != element) {
                toolElement.style.borderBottom = 'none';
            } else {
                this.currentTool = tool;
                toolElement.style.borderBottom = 'solid';
            }
        });
    }

    draw = (e) => {
        if(this.currentTool) {
            this.currentTool.draw(e, this.canvas.context);
        }
    }

    addEventsToCanvas() {
        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('mousedown', this.canvas.setPosition);
        this.canvas.addEventListener('mouseenter', this.canvas.setPosition);
    }

    handleFiles = (e) =>  {
        this.img = new Image();
        this.img.src = URL.createObjectURL(e.target.files[0]);
        this.img.onload = () => {
            this.canvas.setHeight(this.img.height);
            this.canvas.setWidth(this.img.width);
            this.canvas.context.drawImage(this.img, 0,0);
        }
    }

    applyFilterToImage = (e) => {
        let value = e.target.value;
        if(value === 'negative') {
            Filters.negative(this.img, this.canvas.context);
        } else if(value === 'sepia') {
            Filters.sepia(this.img, this.canvas)
        } else if(value === 'binarization') {
            Filters.binarization(this.img, this.canvas);
        } else if(value === 'blur') {
            Filters.blur(this.img, this.canvas);
        }
    }

    applyBrightnessFilter = (e) => {
        console.log(e.target.value)
        Filters.brightness(this.img, this.canvas, e.target.value);
    }


    clearContext = () => {
        this.canvas.clearContext();
        this.img = null;
        // FIXME
        document.getElementById('fileInput').value = null;
    }

    downloadImage = (e, downloadElement) => {
        let dataUrl = this.canvas.saveImage();
        downloadElement.href = dataUrl;
    }

}