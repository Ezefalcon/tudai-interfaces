import { Paint } from "./paint.js";

const paint = new Paint("#canvas");

let eraser = document.querySelector("#eraser");
let pencil = document.querySelector("#pencil");
let commonFilter = document.querySelector("#commonFilter");
let brightnessSlider = document.querySelector("#brightnessSlider");
let downloadImage = document.querySelector("#downloadImage");

paint.addContextTool(pencil, '#000000');
paint.addContextTool(eraser, '#ffffff');

window.addEventListener('load',function(){
    eraser.addEventListener('click', () => paint.setCurrentTool(eraser));
    pencil.addEventListener('click', () => paint.setCurrentTool(pencil));
    commonFilter.addEventListener('change', paint.applyFilterToImage)
    brightnessSlider.addEventListener('change', paint.applyBrightnessFilter)
    downloadImage.addEventListener('click', (e) => paint.downloadImage(e, downloadImage))
    document.querySelector("#cleanCanvas").addEventListener('click', paint.clearContext);
});

let input = document.getElementById('fileInput');
input.addEventListener('change', paint.handleFiles);

