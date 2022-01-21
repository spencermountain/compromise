import basic from './00-basic.js'
import time from './04-time.js'
import timezone from './07-timezone.js'
import fixup from './08-fixup.js'
import matches from './matches.js'
let byGroup = null


const doMatches = function (view) {
  let { document, world } = view
  const { methods } = world
  byGroup = byGroup || methods.two.compile(matches, methods)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  // console.log(found.length, 'found')
  methods.two.bulkTagger(found, document, world)
}

// run each of the taggers
const compute = function (view) {
  view.cache()
  doMatches(view)
  basic(view)
  time(view)
  timezone(view)
  fixup(view)
  view.uncache()
  return view
}

export default {
  dates: compute
}
