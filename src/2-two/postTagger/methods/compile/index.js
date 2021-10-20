import parse from './01-parse.js'
import expand from './02-expand.js'
import cache from './03-cache.js'
import group from './04-group.js'

// do some indexing on the list of matches
const compile = function (matches, methods) {
  // turn match-syntax into json
  matches = parse(matches, methods)
  // convert (a|b) to ['a', 'b']
  matches = expand(matches)
  matches = expand(matches) // run this twice
  // retrieve the needs of each match statement
  matches = cache(matches, methods)

  // organize them according to need...
  let byGroup = group(matches, methods)

  // Every sentence has a Noun/Verb,
  // assume any match will be found on another need
  // but we should stay careful about this.
  delete byGroup['#Noun']
  delete byGroup['#Verb']
  // console.log(matches.filter(o => o.needs.length === 1)) //check!

  // let words = Object.keys(byGroup)
  // words = words.sort((a, b) => {
  //   if (byGroup[a].length > byGroup[b].length) {
  //     return -1
  //   }
  //   return 0
  // })
  // words.slice(0, 10).forEach(k => {
  //   console.log(k, byGroup[k].length)
  // })
  return byGroup
}

export default compile
