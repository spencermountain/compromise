const parse = require('./01-parse')
const expand = require('./02-expand')
const cache = require('./03-cache')
const group = require('./04-group')

const runner = function (document, matches, methods) {
  matches = parse(matches, methods)
  matches = expand(matches)
  matches = cache(matches, methods)
  let byGroup = group(matches, methods)
  console.dir(byGroup, { depth: 2 })
  // console.log(JSON.stringify(matches, null, 2))
}
module.exports = runner
