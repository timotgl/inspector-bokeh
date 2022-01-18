# Inspector Bokeh

Experimental JavaScript library to measure blur in images. See this [blog post](https://medium.com/dawandadev/canvas-based-blur-detection-with-javascript-8d9dc25cb7d5) for more info.

[Live demo](https://timotaglieber.de/inspector-bokeh)

## Prerequisites
* [Node.js](https://nodejs.org/)

## Usage
1. Make sure [Cairo](http://cairographics.org/) is installed in your system, the [canvas](https://github.com/Automattic/node-canvas) module requires this. [How to install node-canvas](https://github.com/Automattic/node-canvas/wiki).
   * On OS X or macOS with [Homebrew](http://brew.sh/): `brew install pkg-config cairo pango libpng jpeg giflib librsvg`
1. `npm install`
1. `npm start path/to/image/file.jpg`

## Troubleshooting

### On macOS 12 Monterey: canvas.node can’t be opened

Full error message:
```
“canvas.node” can’t be opened because Apple cannot check it for malicious software.

This software needs to be updated. Contact the developer for more information.
```

 * If this error pops up, click `Show in Finder`.
 * Right-click the file `canvas.node`, select `Open with` and choose `Other...`.
 * Make sure `Enable: All Applications` is selected. Pick `/Applications/Utilities/Terminal.app` (the default macOS Terminal).
 * Confirm that you really want to open it.
 * Run `npm start path/to/image/file.jpg` again - this time an `Open` button will be displayed in the dialog.
 * After choosing `Open` once, subsequent attempts of running the script will work without showing any dialog.

This possibly happens only if you cloned this repo onto a Volume mounted from a disk image file (`.dmg`). The reason is macOS' Gatekeeper trying to protect you from running software from an "unidentified developer".