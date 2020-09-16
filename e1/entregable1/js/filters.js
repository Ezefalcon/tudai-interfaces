export class Filters {
    static negative(imageObj, context){

        // Redraw image
        context.drawImage(imageObj, 0, 0);

        let imageData = context.getImageData(0, 0, imageObj.width, imageObj.height);

        // Get all the pixels
        let pixels = imageData.data;

        // Loop through the pixels knowing that r-0, g-1, b-2, a-3
        for (let i = 0; i < pixels.length; i += 4) {
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
    
    static saturation = (imageObj, canvas) => {
        let saturation = 2;

        let redLuminance = 0.3086; // constant to determine luminance of red. Similarly, for green and blue
        let greenLuminance = 0.6094;
        let blueLuminance = 0.0820;

        let az = (1 - saturation) * redLuminance + saturation;
        let bz = (1 - saturation) * greenLuminance;
        let cz = (1 - saturation) * blueLuminance;
        let dz = (1 - saturation) * redLuminance;
        let ez = (1 - saturation) * greenLuminance + saturation;
        let fz = (1 - saturation) * blueLuminance;
        let gz = (1 - saturation)*redLuminance;
        let hz = (1 - saturation)*greenLuminance;
        let iz = (1 - saturation)*blueLuminance + saturation;


        canvas.context.drawImage(imageObj, 0,0);
        let imageData = canvas.getImageData();
        let pixels = imageData.data;

        for(let i = 0; i < pixels.length; i += 4) {
            let red = pixels[i]; // Extract original red color [0 to 255]. Similarly for green and blue below
            let green = pixels[i + 1];
            let blue = pixels[i + 2];

            let saturatedRed = (az*red + bz*green + cz*blue);
            let saturatedGreen = (dz*red + ez*green + fz*blue);
            let saturateddBlue = (gz*red + hz*green + iz*blue);

            pixels[i] = saturatedRed;
            pixels[i + 1] = saturatedGreen;
            pixels[i + 2] = saturateddBlue;
        }

        canvas.context.putImageData(imageData, 0, 0);
    }

    static blur = (imageObj, canvas)  => {

        canvas.context.drawImage(imageObj, 0,0);
        let imageData = canvas.getImageData();
        let pixels = imageData.data;

        let w = imageObj.width;
        let h = imageObj.height;

        let kernel = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]];
        
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                let upperLeft = ((x-1+w)%w + w*((y-1+h)%h))*4;
                let upperCenter = ((x-0+w)%w + w*((y-1+h)%h))*4;
                let upperRight = ((x+1+w)%w + w*((y-1+h)%h))*4;
                let left = ((x-1+w)%w + w*((y+0+h)%h))*4;
                let center = ((x-0+w)%w + w*((y+0+h)%h))*4;
                let right = ((x+1+w)%w + w*((y+0+h)%h))*4;
                let lowerLeft = ((x-1+w)%w + w*((y+1+h)%h))*4;
                let lowerCenter = ((x-0+w)%w + w*((y+1+h)%h))*4;
                let lowerRight = ((x+1+w)%w + w*((y+1+h)%h))*4;

                let red = this.getSumOfSurroundingPixels(pixels, 0, upperLeft, upperCenter, upperRight, left, center, right, lowerLeft, lowerCenter, lowerRight, kernel);

                let green = this.getSumOfSurroundingPixels(pixels, 1, upperLeft, upperCenter, upperRight, left, center, right, lowerLeft, lowerCenter, lowerRight, kernel);

                let blue = this.getSumOfSurroundingPixels(pixels, 2, upperLeft, upperCenter, upperRight, left, center, right, lowerLeft, lowerCenter, lowerRight, kernel);

                pixels[center] = red;
                pixels[center+1] = green;
                pixels[center+2] = blue;
                pixels[center+3] = pixels[lowerCenter+3];
            }
        }

        canvas.context.putImageData(imageData, 0, 0);
    }

    static getSumOfSurroundingPixels(pixels, colorIndex, upperLeft, upperCenter, upperRight, left, center, right, lowerLeft, lowerCenter, lowerRight, kernel) {
        let p0, p1, p2, p3, p4, p5, p6, p7, p8;
        p0 = pixels[upperLeft+colorIndex] * kernel[0][0]; // upper left
        p1 = pixels[upperCenter+colorIndex] * kernel[0][1]; // upper mid
        p2 = pixels[upperRight+colorIndex] * kernel[0][2]; // upper right
        p3 = pixels[left+colorIndex] * kernel[1][0]; // left
        p4 = pixels[center+colorIndex] * kernel[1][1]; // center pixel
        p5 = pixels[right+colorIndex] * kernel[1][2]; // right
        p6 = pixels[lowerLeft+colorIndex] * kernel[2][0]; // lower left
        p7 = pixels[lowerCenter+colorIndex] * kernel[2][1]; // lower mid
        p8 = pixels[lowerRight+colorIndex] * kernel[2][2]; // lower right
        return (p0+p1+p2+p3+p4+p5+p6+p7+p8)/9;
    }

    static setTo255IfIsGreaterThanIt(val) {
        return val > 255 ? 255 : val;
    }
}