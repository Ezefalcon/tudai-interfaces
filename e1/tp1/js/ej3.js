import { getContext, setPixel } from "../../entregable1/js/utils";
import {Canvas} from "../../entregable1/js/canvas";

const canvas = new Canvas("#canvas");
let context = canvas.getContext();

function rectangularRegionWithImageData() {
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    let imageData = context.createImageData(50, 50);

    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            setPixel(imageData, x, y, 120, 21, 255, 255);
        }
    }
    console.log(imageData)
    context.putImageData(imageData, 0,0);
}

rectangularRegionWithImageData();