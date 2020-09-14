export class DrawTool {

    constructor(element, color) {
        this.lineWidth = 5;
        this.lineCap = 'round';
        this.element = element;
        this.color = color;
        this.posX = 0;
        this.posY = 0;
    }

    draw(e, context) {
        // mouse left button must be pressed
        if (e.buttons !== 1) return;
        let posX = this.posX;
        let posY = this.posY;

        context.beginPath();

        this.setDrawTools(context);
        context.moveTo(posX, posY); // from
        this.setPosition(e);
        context.lineTo(posX, posY); // to

        context.stroke(); // draw it!
    }

    setDrawTools(context) {
        context.lineWidth = this.lineWidth;
        context.lineCap = this.lineCap;
        context.strokeStyle = this.color;
    }

    setPosition(e) {
        this.posX = e.offsetX;
        this.posY = e.offsetY;
    }
}