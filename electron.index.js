const menubar = require('menubar')
const url = require('url')
const path = require('path')

/* To deal with the never ending flood of errors from electron-compile...Math avoid using too much es6 here (i.e. import...), the prebuilt-version didn't seems to support that */

// import menubar from 'menubar'
// import url from 'url'
// import path from 'path'

let mb = menubar({
  dir: './public',
  // index
  preloadWindow: true,
})

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    // pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

mb.on('ready', () => {
  console.log('app is ready', mb)
  mb.window.loadURL(startUrl)
  mb.window.toggleDevTools()
  // your app code here
})
