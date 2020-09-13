import {DrawTool} from "./drawTool.js";
import {Canvas} from "./canvas.js";

let toolElement = null;

export class Paint {
    constructor(canvasId) {
        this.canvas = new Canvas(canvasId);
        this.contextTools = [];
        this.addEventsToCanvas();
        this.currentTool = null;
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
            this.currentTool.draw(e, this.canvas);
        }
    }

    addEventsToCanvas() {
        this.canvas.addEventListener('mousemove', this.draw);
        this.canvas.addEventListener('mousedown', this.canvas.setPosition);
        this.canvas.addEventListener('mouseenter', this.canvas.setPosition);
    }

}