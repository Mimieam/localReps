'use strict'
const fs = require('fs')

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
  const p = await _bfs(searchPath, proms).then(async (data)=> {
    await Promise.all(proms).then((data)=>{
      console.log(res)
      return res
    }).catch((e)=>{console.log(e.message)})
  }).catch((e)=>{console.log(e.message)})

   console.log("[------------------------------------------\
---------------------------------------------\
----------------------------->>>>" )
   return res
}

// patiently awaiting Node support for es6 modules...
module.exports = {
    bfs: bfs,
}

bfs('/Users/Miezan/')
  // .then(data=>console.log(data))
  // .catch((e)=>{console.log(e)})

