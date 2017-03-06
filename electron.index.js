const menubar = require('menubar')
const url = require('url')
const path = require('path')

// var remote = require('electron').remote;
// var electronFs = remote.require('fs');
// var electronDialog = remote.dialog;

/* To deal with the never ending flood of errors from electron-compile...Math avoid using too much es6 here (i.e. import...), the prebuilt-version didn't seems to support that */

// import menubar from 'menubar'
// import url from 'url'
// import path from 'path'
const options = {

}
let mb = menubar({
  dir: './public',
  icon:'./public/Group.png',
  // index
  preloadWindow: true,
})

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    // pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

// mb.setOption('icon', './public/icon.png');
mb.on('ready', () => {
  console.log('app is ready', mb)
  mb.window.loadURL(startUrl)
  mb.window.toggleDevTools()
  // your app code here
})
