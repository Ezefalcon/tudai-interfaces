export function getContext() {
    return document.querySelector("#canvas").getContext("2d");
}

export function setPixel(imageData, x, y, r, g, b, a) {
    const index = (x + y * imageData.width) * 4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
}