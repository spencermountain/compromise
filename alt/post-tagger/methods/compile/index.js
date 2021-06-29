const parse = require('./01-parse')
const expand = require('./02-expand')
const cache = require('./03-cache')
const group = require('./04-group')

const compile = function (matches, methods) {
  matches = parse(matches, methods)
  matches = expand(matches)
  matches = cache(matches, methods)
  let byGroup = group(matches, methods)
  return byGroup
}

module.exports = compile
