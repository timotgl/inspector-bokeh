import measureBlur from './measureBlur.js';

onmessage = (messageEvent) => {
  postMessage({
    score: measureBlur(messageEvent.data.imageData),
  });
};
