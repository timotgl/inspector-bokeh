importScripts('measure_blur.js');

onmessage = function(e) {
  var score = measureBlur(e.data.imageData);

  postMessage({
    id: e.data.id,
    score: score
  });
}