import canvasModule from 'canvas';
import measureBlur from './measureBlur.js';

if (process.argv.length < 3) {
  console.info('Usage: node measureBlur.js path/to/image/file.jpg');
  process.exit(0);
}

const { createCanvas, loadImage } = canvasModule;
const image = await loadImage(process.argv[2]);
const canvas = createCanvas(image.width, image.height);
const context = canvas.getContext('2d');
context.drawImage(image, 0, 0);
const stats = measureBlur(
  context.getImageData(0, 0, canvas.width, canvas.height)
);

console.log('Blur score:', Number(stats.avg_edge_width_perc.toFixed(2)));
console.log(stats);
