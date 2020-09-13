import { getContext } from "../../entregable1/js/utils";

export function rectangularRegionContext() {
    let ctx = getContext();
    ctx.fillStyle = "#000000";
    ctx.fillRect(150,150,500,500)
    ctx.beginPath();
}

// for (let x = 0; x < width; x++) {
//     let r,g,b;
//     if(x <= width / 2) {
//         let coeficiente = 255 / (width / 2) ;
//         r = coeficiente * x;
//         g = coeficiente * x;
//         b = 0;
//     }
// }
rectangularRegionContext()