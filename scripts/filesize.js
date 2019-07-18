var fs = require('fs')
var path = require('path')

console.log('\n\n----\n')
var buildsDir = path.join(__dirname, '../builds')

let abs = path.join(buildsDir, './compromise.min.js')
var stats = fs.statSync(abs)
let size = (stats['size'] / 1000.0).toFixed(1)
console.log('    ./min.js  : ' + size + ' kb')
console.log('\n')
