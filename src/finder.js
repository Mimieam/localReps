'use strict'
const fs = require('fs')

// folder excluded from any recursive search **shrug**
const EXCLUDES = [
  "node_modules",
  "bower_components",
  "npm",
  ".meteor",
  ".Trash"
]

const findDirectories = (p) => {
  let dirs = []
  // returns all directories within a search path p
  try{
    dirs = fs.readdirSync(p)
      .filter(
        f => { return fs.existsSync(p) && fs.lstatSync(p+"/"+f).isDirectory()}
      )
  } catch (e) {
    console.log(e.name +  " => " + e.message)
  }
  return dirs
}

const _bfs = (searchPath) => {
  let res = []
  let directories = findDirectories(searchPath)
  if (directories.includes(".git")) {
    res.push(searchPath)
    return res
  }
  else {
    directories.forEach ((subfolder) => {
      if (!EXCLUDES.includes(subfolder)){
        res.push(..._bfs(searchPath + "/" + subfolder))
      }
    });
  }

  return res
}

 const bfs = (searchPath) => {
    // search the provided path for a .git folder
  return _bfs(searchPath)
}

// patiently awaiting Node support for es6 modules...
module.exports = {
    bfs: bfs,
}

console.log(bfs('/Users/Miezan/'))
