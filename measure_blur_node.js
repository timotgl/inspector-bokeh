var fs = require('fs');
var Canvas = require('canvas');
var measureBlur = require('./measure_blur.js')
var image;

function createImage(error, data) {
    if (error) {
        console.error('Unable to read image file!');
        throw error;
    }
    image = new Canvas.Image;
    image.onload = drawImageOnCanvas;
    image.src = data;
}

function drawImageOnCanvas() {
    var canvas = new Canvas(),
        context;

    canvas.width = image.width;
    canvas.height = image.height;
    context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    showBlurScore(context.getImageData(0, 0, canvas.width, canvas.height))
}

function showBlurScore(imageData) {
    var stats = measureBlur(imageData);
    console.log('Blur score:', Number((stats.avg_edge_width_perc).toFixed(2)));
    console.log(stats);
}
if (process.argv.length >= 3) {
    fs.readFile(process.argv[2], createImage);
} else {
    console.info('Usage: node measure_blur.js path/to/image/file.jpg');
}
