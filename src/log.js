'use strict';
const pretty = require('./pretty_print')

//dummy function
let dummy = function() {}

const log = (input, path) => {
  if (!process || !process.argv || !process.argv[2]) {
    return dummy
  }
  let arg = process.argv[2]
  if (!arg.match(/^--debug/)) {
    return dummy
  }
  let enable = arg.replace(/^--debug=?/, '') || '*'
  if (enable === '*' || enable === path) {
    return pretty(input, path)
  }
  return dummy
}

module.exports = log
