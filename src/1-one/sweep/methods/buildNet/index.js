import parse from './01-parse.js'
import buildUp from './02-multiply.js'
import cache from './03-cache.js'
import group from './04-group.js'

// do some indexing on the list of matches
const compile = function (matches, world) {
  let { methods } = world
  // turn match-syntax into json
  matches = parse(matches, world)
  // convert (a|b) to ['a', 'b']
  matches = buildUp(matches)
  // matches = buildUp(matches) // run this twice
  // retrieve the needs of each match statement
  matches = cache(matches, methods)
  // keep all un-cacheable matches (those with no needs) 
  let always = matches.filter(o => o.needs.length === 0)

  // organize them according to need...
  let byGroup = group(matches, methods)

  // Every sentence has a Noun/Verb,
  // assume any match will be found on another need
  // this is true now,
  // but we should stay careful about this.
  delete byGroup['#Noun']
  delete byGroup['#Verb']
  // console.log(matches.filter(o => o.needs.length === 1)) //check!

  return {
    index: byGroup,
    always
  }
}

export default compile
