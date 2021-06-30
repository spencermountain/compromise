import fs from 'fs'
// import pkg from '../../package.json'

// avoid requiring our whole package.json file
// make a small file for our version number
let pkg = JSON.parse(fs.readFileSync('./package.json').toString())

fs.writeFileSync('./src/_version.js', `export default '${pkg.version}'`)
