importScripts('measure_blur.js');

onmessage = function(e) {
  var score = measureBlur(e.data);
  postMessage(score);
}