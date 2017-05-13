// 'use strict'

// import fs from 'fs'
import store, { STORAGE_ID } from './storage.js'
// const fs = window.fs


// console.log(fs)

// // folder excluded from any recursive search **shrug**
// const EXCLUDES = [
//   "node_modules",
//   "bower_components",
//   "npm",
//   ".meteor",
//   ".Trash"
// ]

// const findDirectories = (p) => {
//   let dirs = []
//   // returns all directories within a search path p
//   try{
//     dirs = fs.readdirSync(p)
//       .filter(
//         f => { return fs.existsSync(p) && fs.lstatSync(p+"/"+f).isDirectory()}
//       )
//   } catch (e) {
//     console.log(e.name +  " => " + e.message)
//   }
//   return dirs
// }

// const _bfs = (searchPath) => {
//   let res = []
//   let directories = findDirectories(searchPath)
//   if (directories.includes(".git")) {
//     res.push(searchPath)
//     return res
//   }
//   else {
//     directories.forEach ((subfolder) => {
//       if (!EXCLUDES.includes(subfolder)){
//         res.push(..._bfs(searchPath + "/" + subfolder))
//       }
//     });
//   }

//   return res
// }

//  const bfs = (searchPath) => {
//     // search the provided path for a .git folder
//    // ok got lazy there... _path.split("/").filter((x)=> x!="").slice(-1)[0]  => just return the basename
//    let resultTable = _bfs(searchPath).map((_path) => {
     
//      return {
//        "name": _path.split("/").filter((x) => x !== "").slice(-1)[0].toUpperCase(),
//        "path": _path,
//        "text": _path.toLowerCase(),
//      }
//    })
//   //  console.log(resultTable)
//    store.put({repos: resultTable})  // NOT WORKING YET... probably need to wait for bfs to finish  
//    return resultTable
// }

// // patiently awaiting Node support for es6 modules...
// module.exports = {
//     bfs: bfs,
// }

// console.log(bfs('/Users/Miezan/Desktop/'))




'use strict'
// import fs from 'fs'
const fs = window.fs
// const fs = require('fs')
// const fs = require('fs')
console.log('fs -finder.js', fs)

// folder excluded from any recursive search **shrug**
const EXCLUDES = [
  "node_modules",
  "bower_components",
  "npm",
  ".meteor",
  ".Trash",
  // ".cache",
]

const findDirectories = (p) => {
      return new Promise((resolve, reject) => {
        fs.readdir(p, (err, items) => {
          if (err) reject(err)
          // console.log(p)
          let dirs = !items ? [] : items.filter( f => { return fs.existsSync(p) && fs.lstatSync(p+"/"+f).isDirectory()})
          return resolve(dirs)
        })
      })
}

const createNewSearchPaths = (currentLocation, dirs) => {
  return dirs
          .filter(subfolder => !EXCLUDES.includes(subfolder))
          .map(subfolder => currentLocation + "/" + subfolder)
}

let res = []
const _bfs = (searchPath, arrayOfPromises) => {
  let directories = []
  let p = findDirectories(searchPath)
      .then((directories) => {
          if (directories.includes(".git")) {
            res.push(searchPath)
            // console.log("............", searchPath)
            return (res)
          }
          else {
            let subfolders = createNewSearchPaths(searchPath, directories)
            for (let _path of subfolders){
               arrayOfPromises.push( _bfs(_path, []))
            }
            return Promise.all(arrayOfPromises)
          }
      })
  return (p)
}

 const bfs = async (searchPath) => {
    // search the provided path for a .git folder
  let proms = []
  let resultTable  = [] 
  const p = await _bfs(searchPath, proms).then(async (data)=> {
    await Promise.all(proms).then((data)=>{
      
    console.log("bfs- res", res)  // VOODOO magic -> _bfs push things to the global res array - don't remember why i did it this way but most likely because of some promise issue and async/wait messing around
      
    resultTable = res.map((_path) => { 
        return {
          "name": _path.split("/").filter((x) => x !== "").slice(-1)[0].toUpperCase(),
          "path": _path,
          "text": _path.toLowerCase(),
          }
    })
     console.log(resultTable)
    store.put({repos: resultTable})  // NOT WORKING YET... probably need to wait for bfs to finish  
    return resultTable

    }).catch((e)=>{console.log(e.message)})
  }).catch((e)=>{console.log(e.message)})

   console.log("[------------------------------------------\
---------------------------------------------\
----------------------------->>>>" )
   return resultTable
}

// patiently awaiting Node support for es6 modules...
module.exports = {
    bfs: bfs,
}

// bfs('/Users/Miezan/')
  // .then(data=>console.log(data))
  // .catch((e)=>{console.log(e)})

