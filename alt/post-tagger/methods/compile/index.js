const parse = require('./01-parse')
const expand = require('./02-expand')
const cache = require('./03-cache')
const group = require('./04-group')

const compile = function (matches, methods) {
  matches = parse(matches, methods)
  // console.log(matches.length)
  matches = expand(matches)
  matches = expand(matches) // run this twice
  // console.log(matches.length)
  // console.dir(matches, { depth: 3 })
  matches = cache(matches, methods)
  let byGroup = group(matches, methods)
  return byGroup
}

module.exports = compile
