const fs = require('fs')
const pkg = require('../../package.json')

// avoid requiring our whole package.json file
// make a small file for our version number
fs.writeFileSync('./src/_version.js', `module.exports = '${pkg.version}'`)

// pack-up our lexicon
require('./pack')
