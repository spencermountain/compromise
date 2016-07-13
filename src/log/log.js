'use strict';
const fns = require('./fns')
const color = require('./color')
const pretty_print = require('./pretty_print')

//dummy function
let dummy = {
  here: function() {},
  change: function() {}
}

const serverOutput = {
  here: function(path) {
    let indent = fns.findIndent(path) || ''
    console.log(fns.makePath(path, indent))
  },
  change: function(input, path) {
    let indent = fns.findIndent(path) || ''
    console.log(indent + '   ' + color.red(input))
  },
  show: function(input, path) {
    pretty_print(input, path)
  }
}

//figure out if it should print anything, first
const log = ((input, path) => {
  if (!process || !process.argv || !process.argv[2]) {
    return dummy
  }
  let arg = process.argv[2]
  if (!arg.match(/^--debug/)) {
    return dummy
  }
  let enable = arg.replace(/^--debug=?/, '') || '*'
  if (enable === '*' || enable === path) {
    return serverOutput
  }
  return dummy
})()

module.exports = log
