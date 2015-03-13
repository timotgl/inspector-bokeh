var measure_blur = require('./measure_blur').measure;

(function () {
    var canvas, context, input;

    function loadImage(fileSelectedEvent) {
        var file = input.files[0],
            img = new Image;
        img.src = URL.createObjectURL(file);
        img.onload = drawImageOnCanvas;
    }

    function drawImageOnCanvas() {
        var imageData;

        // this = Image object
        canvas.width = this.width;
        canvas.height = this.height;
        context.drawImage(this, 0, 0);

        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        showBlurScore(imageData);
    }

    function showBlurScore(imageData) {
        blur_score = measure_blur(imageData);
        document.getElementById('blur_score').textContent = 'Blur score: ' + blur_score;
    }

    // Initialize canvas and form.
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    input = document.getElementById('upload_image');

    // Trigger image analysis on file upload.
    input.onchange = loadImage;
})();
