import menubar from 'menubar'
import url from 'url'
// var menubar = require('menubar')

let mb = menubar({
  dir: './public',
  // index
  preloadWindow: true,
})

const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
});

mb.on('ready', () => {
  console.log('app is ready', mb)
  
  mb.window.loadURL(startUrl)
  // your app code here
})