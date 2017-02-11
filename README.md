React + Electron + MotionUI + Glue... lots of Glue XD


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


dev mode:
> npm install && npm run dev

production:
> npm run build

production - packaging:
> node_modules/.bin/electron-packager . localReps --platform=darwin --arch=x64  --out=release-builds --overwrite  --ignore="\electron-wait-react.js"



#ToDO - :
 - find a better way to call native features from the client side ( using a global `fs` is not ideal IMO...)
