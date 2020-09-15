export class Filters {
    static negative(imageObj, context){

        // Redraw image
        context.drawImage(imageObj, 0, 0);

        let imageData = context.getImageData(0, 0, imageObj.width, imageObj.height);

        // Get all the pixels
        let pixels = imageData.data;

        // Loop through the pixels knowing that r-0, g-1, b-2, a-3
        for (var i = 0; i < pixels.length; i += 4) {
            pixels[i]   = 255 - pixels[i];   // red
            pixels[i+1] = 255 - pixels[i+1]; // green
            pixels[i+2] = 255 - pixels[i+2]; // blue
        }

        // Overwrite
        context.putImageData(imageData, 0, 0);
    }

    static brightness = (imageObj, canvas, val)  => {

        canvas.context.drawImage(imageObj, 0,0);
        let imageData = canvas.getImageData();
        let pixels = imageData.data;

        // IMPORTANT: the value comes of type string
        const brightVal = parseInt(val);

        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i]   = pixels[i] + brightVal;   // red
            pixels[i+1] = pixels[i+1] + brightVal; // green
            pixels[i+2] = pixels[i+2] + brightVal; // blue
        }

        canvas.context.putImageData(imageData, 0, 0);
    }

    static sepia = (imageObj, canvas, val)  => {

        canvas.context.drawImage(imageObj, 0,0);
        let imageData = canvas.getImageData();
        let pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i+1];
            const blue = pixels[i+2];
            const outputRed = (red * .393) + (green *.769) + (blue * .189)
            const outputGreen = (red * .349) + (green *.686) + (blue * .168)
            const outputBlue = (red * .272) + (green *.534) + (blue * .131)
            pixels[i]   = Filters.setTo255IfIsGreaterThanIt(outputRed);   // red
            pixels[i+1] = Filters.setTo255IfIsGreaterThanIt(outputGreen); // green
            pixels[i+2] = Filters.setTo255IfIsGreaterThanIt(outputBlue); // blue
        }

        canvas.context.putImageData(imageData, 0, 0);
    }

    static binarization = (imageObj, canvas, val)  => {

        canvas.context.drawImage(imageObj, 0,0);
        let imageData = canvas.getImageData();
        let pixels = imageData.data;

        for (let i = 0; i < pixels.length; i += 4) {
            const red = pixels[i];
            const green = pixels[i+1];
            const blue = pixels[i+2];
            const v = (red + green + blue >= 300) ? 280 : 0;
            pixels[i] = pixels[i+1] = pixels[i+2] = v;
        }

        canvas.context.putImageData(imageData, 0, 0);
    }

    static setTo255IfIsGreaterThanIt(val) {
        return val > 255 ? 255 : val;
    }

    static setPixel(imageData, x, y, r, g, b, a) {
        const index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        // imageData.data[index+3] = a;
    }
}