var fs = require('fs')
var path = require('path')
var nlpPlugin = require('compromise-plugin')

console.log('\n 🕑  - packing lexicon..')
var out = path.join(__dirname, '../src/world/_data.js')

//pack it into one string
var data = require('../data')
var pckd = nlpPlugin.pack(data)

fs.writeFileSync(out, 'module.exports=`' + pckd + '`', 'utf8')

//get filesize
var stats = fs.statSync(out)
let size = (stats['size'] / 1000.0).toFixed(1)

console.log('       - packed into  ' + size + 'k\n')
console.log('  done!\n')
