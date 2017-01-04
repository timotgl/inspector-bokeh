# Inspector Bokeh

Experimental JavaScript library to measure blur in images. See this [blog post](http://www.codeoclock.com/2015/06/05/blur-detection-javascript/) for more info.

## Prerequisites
* [Node.js](https://nodejs.org/)
* [Browserify](http://browserify.org/)

## Run with Node.js
1. Make sure [Cairo](http://cairographics.org/) is installed in your system, the [canvas](https://github.com/Automattic/node-canvas) module requires this. [How to install node-canvas](https://github.com/Automattic/node-canvas/wiki).
   * On OS X with [Homebrew](http://brew.sh/): `brew install pkg-config cairo pango libpng jpeg giflib`
1. `npm install`
1. `node measure_blur_node.js path/to/image/file.jpg`

## Prepare and run browser demo - under construction
1. `npm install`
1. `browserify measure_blur_browserify.js > measure_blur_browser.js`
1. Open `demo.html` in your browser.
