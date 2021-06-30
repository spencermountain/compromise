import parse from './01-parse.js'
import expand from './02-expand.js'
import cache from './03-cache.js'
import group from './04-group.js'
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
export default compile
