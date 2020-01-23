const fs = require('fs')
const path = require('path')

console.log('\n\n----\n')
const buildsDir = path.join(__dirname, '../../builds')

const abs = path.join(buildsDir, './compromise.min.js')
const stats = fs.statSync(abs)
const size = (stats['size'] / 1000.0).toFixed(1)
console.log('    ./min.js  : ' + size + ' kb')
console.log('\n')
