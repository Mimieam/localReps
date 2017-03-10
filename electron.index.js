const menubar = require('menubar')
const url = require('url')
const path = require('path')


/*
  To deal with the never ending flood of errors from electron-compile...
  Just avoid using too much es6 here (i.e. import...),
  the prebuilt-version didn't seems to support that
  
  import menubar from 'menubar'
  import url from 'url'
  import path from 'path'
 */

let mb = menubar({
  dir: './public',
  icon: __dirname + '/public/Group.png',
  tooltip: 'LocalReps',
  width: 375,
  height:400,
  preloadWindow: true,
  backgroundColor: '#222',
  show: false
})

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    protocol: 'file:',
    slashes: true
});

mb.on('ready', () => {
  mb.window.loadURL(startUrl)
  // mb.window.toggleDevTools()
})
