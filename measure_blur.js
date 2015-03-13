var fs = require('fs'),
    Canvas = require('canvas'),
    Filters = require('canvasfilters').Filters,
    image;

function detectEdges(imageData) {
    var greyscaled, sobelKernel;

    if (imageData.width >= 360) {
        greyscaled = Filters.luminance(Filters.gaussianBlur(imageData, 5.0));
    } else {
        greyscaled = Filters.luminance(imageData);
    }
    sobelKernel = Filters.getFloat32Array(
        [1, 0, -1,
            2, 0, -2,
            1, 0, -1]);
    return Filters.convolve(greyscaled, sobelKernel, true);
}

// Reduce imageData from RGBA to only one channel (Y/luminance after conversion to greyscale)
// since RGB all have the same values and Alpha was ignored.
function reducedPixels(imageData) {
    var i, x, y, row,
        pixels = imageData.data,
        rowLen = imageData.width * 4,
        rows = [];

    for (y = 0; y < pixels.length; y += rowLen) {
        row = new Uint8ClampedArray(imageData.width);
        x = 0;
        for (i = y; i < y + rowLen; i += 4) {
            row[x] = pixels[i];
            x += 1;
        }
        rows.push(row);
    }
    return rows;
}

// pixels = Array of Uint8ClampedArrays (row in original image)
function detectBlur(pixels) {
    var x, y, value, oldValue, edgeStart, edgeWidth, bm, percWidth,
        width = pixels[0].length,
        height = pixels.length,
        numEdges = 0,
        sumEdgeWidths = 0,
        edgeIntensThresh = 20;

    for (y = 0; y < height; y += 1) {
        // Reset edge marker, none found yet
        edgeStart = -1;
        for (x = 0; x < width; x += 1) {
            value = pixels[y][x];
            // Edge is still open
            if (edgeStart >= 0 && x > edgeStart) {
                oldValue = pixels[y][x - 1];
                // Value stopped increasing => edge ended
                if (value < oldValue) {
                    // Only count edges that reach a certain intensity
                    if (oldValue >= edgeIntensThresh) {
                        edgeWidth = x - edgeStart - 1;
                        numEdges += 1;
                        sumEdgeWidths += edgeWidth;
                    }
                    edgeStart = -1; // Reset edge marker
                }
            }
            // Edge starts
            if (value == 0) {
                edgeStart = x;
            }
        }
    }

    if (numEdges === 0) {
        bm = 0;
        percWidth = 0;
    } else {
        bm = sumEdgeWidths / numEdges;
        percWidth = bm / width * 100;
    }

    return {
        width: width,
        height: height,
        num_edges: numEdges,
        avg_edge_width: bm,
        avg_edge_width_perc: percWidth
    };
}

    
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

    showBlurScore(context.getImageData(0, 0, canvas.width, canvas.height));
}

function showBlurScore(imageData) {
    stats = detectBlur(reducedPixels(detectEdges(imageData)));
    console.log('Blur score:', Number((stats.avg_edge_width_perc).toFixed(2)));
    console.log(stats);
}

if (process.argv.length >= 3) {
    fs.readFile(process.argv[2], createImage);
} else {
    console.info('Usage: node measure_blur.js path/to/image/file.jpg');
}
