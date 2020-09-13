import { Paint } from "./paint.js";

const paint = new Paint("#canvas");

let eraser = document.querySelector("#eraser");
let pencil = document.querySelector("#pencil");

paint.addContextTool(pencil, '#000000');
paint.addContextTool(eraser, '#ffffff');

window.addEventListener('load',function(){
    eraser.addEventListener('click', switchToEraser);
    pencil.addEventListener('click', switchToPencil);
    document.querySelector("#cleanCanvas").addEventListener('click', clearContext);
});



function switchToPencil() {
    paint.setCurrentTool(pencil)
}

function switchToEraser() {
    paint.setCurrentTool(eraser);
}

function clearContext() {
    paint.canvas.clearContext();
}


// function draw(e) {
//     // mouse left button must be pressed
//     if (e.buttons !== 1) return;
//
//     ctx.beginPath(); // begin
//
//     paint.setDrawTools(ctx);
//
//     ctx.moveTo(pos.x, pos.y); // from
//     setPosition(e);
//     ctx.lineTo(pos.x, pos.y); // to
//
//     ctx.stroke(); // draw it!
// }
//
// function setPosition(e) {
//     pos.x = e.offsetX;
//     pos.y = e.offsetY;
// }