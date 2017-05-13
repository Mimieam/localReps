
# LocalReps  ( Mac )

LocalReps fin
This app search for all git repos in a search path and make bring them all together to be easily run.


dev mode:
> npm install && npm run dev

production:
> npm run build

production - packaging:
> node_modules/.bin/electron-packager . localReps --platform=darwin --arch=x64  --out=release-builds --overwrite  --ignore="\electron-wait-react.js" --icon=Icon.icns


![Alt text](/progressPic.png?raw=true "May 2017")

Made with:

React + Electron + MotionUI + less + muscle-css + antd +  Glue... lots of Glue XD

#ToDO - :
 - [ ] child Processes 
    + [ ] add a process stop option within the menu
    + [ ] kill them all on parent exit - we don't want any zombie process
    

 - find a better way to call native features from the client side ( using a global `fs` is not ideal IMO...)
 - localstorage added - update only on request.
 - input
    * margin
    * add selectect from dropdown 
    