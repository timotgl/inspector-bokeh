# Inspector Bokeh

Experimental JavaScript library to measure blur in images.

## Prerequisites
 * [Node.js](https://nodejs.org/)
 * [Browserify](http://browserify.org/)

## Run with Node.js
1. Make sure [Cairo](http://cairographics.org/) is installed in your system, the `canvas` module requires this. [How to install node-canvas](https://github.com/Automattic/node-canvas/wiki).
2. `npm install`
3. `node measure_blur.js path/to/image/file.jpg`

## Prepare and run browser demo - under construction
1. `npm install`
2. `browserify measure_blur_browserify.js > measure_blur_browser.js`
3. Open `demo.html` in your browser.
