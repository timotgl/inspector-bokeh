(() => {
  const readImageFile = (rawFile) =>
    new Promise((resolve, reject) => {
      if (!rawFile) {
        return reject();
      }

      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = function () {
          resolve({
            // NOTE: This is not an ImageData object!
            rawFile: rawFile,
            data: img,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = reject;
        img.src = readerEvent.target.result;
      };
      reader.readAsDataURL(rawFile);
    });

  const measureBlur = (imageData) => {
    const worker = new Worker('worker.js', { type: 'module' });
    worker.onerror = (event) => {
      console.log('worker error:', event);
    };
    worker.onmessage = (messageEvent) => {
      showScore(messageEvent.data.score);
    };
    worker.postMessage({ imageData });
  };

  const blurScore = document.querySelector('#score #value');
  const blurScoreExplanation = document.querySelector('#score #explanation');
  const scoreDetails = document.querySelector('#details');
  const spinner = document.querySelector('.spinner');
  const canvas = document.querySelector('canvas');
  let calculationTime;

  const showScore = (score) => {
    blurScore.innerHTML = 'Score: ' + score.avg_edge_width_perc.toFixed(2);
    document.querySelector('#calculation_time').innerHTML =
      'Calculation time: ' +
      ((Date.now() - calculationTime) / 1000).toFixed(3) +
      ' sec';
    let value;
    Object.keys(score).forEach((key) => {
      value = score[key];
      scoreDetails.innerHTML += `<tr><td>${key}</td><td>${value}</td></tr><tr>`;
    });
    blurScoreExplanation.style.display = 'block';
    spinner.style.display = 'none';
  };

  const measureBlurAndShowScore = (changeFileInputEvent) => {
    spinner.style.display = 'block';
    scoreDetails.innerHTML = '';
    blurScoreExplanation.style.display = 'none';
    calculationTime = Date.now();
    readImageFile(changeFileInputEvent.target.files[0]).then((img) => {
      const context = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img.data, 0, 0);

      const canvasData = context.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      measureBlur(canvasData);
    }, console.error);
  };

  document
    .querySelector('#upload_image')
    .addEventListener('change', measureBlurAndShowScore, false);
})();
