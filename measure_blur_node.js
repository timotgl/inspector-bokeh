const { createCanvas, loadImage } = require('canvas')
const measureBlur = require('./measure_blur.js')
let image;

function createImage(imageData) {
    image = imageData;
    drawImageOnCanvas();
}

function drawImageOnCanvas() {
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    showBlurScore(context.getImageData(0, 0, canvas.width, canvas.height))
}

function showBlurScore(imageData) {
    const stats = measureBlur(imageData);
    console.log('Blur score:', Number((stats.avg_edge_width_perc).toFixed(2)));
    console.log(stats);
}
if (process.argv.length >= 3) {
    loadImage(process.argv[2]).then(createImage);
} else {
    console.info('Usage: node measure_blur.js path/to/image/file.jpg');
}
