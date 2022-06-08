import basic from './00-year.js'
import time from './01-time-range.js'
import timezone from './02-timezone.js'
import fixup from './03-fixup.js'
import matches from './matches.js'
let net = null

const doMatches = function (view) {
  let { world } = view
  net = net || world.methods.one.buildNet(matches, world)
  view.sweep(net)
}

// run each of the taggers
const compute = function (view) {
  view.cache()
  doMatches(view)
  doMatches(view) // do it twice
  basic(view)
  time(view)
  timezone(view)
  fixup(view)
  view.uncache()

  // sorry, one more
  view.match('#Cardinal #Duration and? #DateShift').tag('DateShift', 'three days before')
  view.match('#DateShift and #Cardinal #Duration').tag('DateShift', 'three days and two weeks')
  view.match('#Time [(sharp|on the dot)]').tag('Time', '4pm sharp')
  // view.match('in #Adverb #DateShift').tag('Date', 'in-around-2-weeks')

  return view
}

export default {
  dates: compute
}
