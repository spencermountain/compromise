import basic from './00-year.js'
import time from './01-time-range.js'
import timezone from './02-timezone.js'
import fixup from './03-fixup.js'
import matches from './matches.js'
const nets = new WeakMap()

const doMatches = function (view) {
  const { world } = view
  let net = nets.get(world)
  if (!net) {
    net = world.methods.one.buildNet(matches, world)
    nets.set(world, net)
  }
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

  // sorry, one more - twice, to chain '2 years, 4 months and 5 days ago'
  if (view.has('#DateShift')) {
    for (let i = 0; i < 2; i += 1) {
      view.match('#Cardinal #Duration and? #DateShift').tag('DateShift', 'three days before')
      view.match('#DateShift and #Cardinal #Duration').tag('DateShift', 'three days and two weeks')
    }
  }
  // view.match('in #Adverb #DateShift').tag('Date', 'in-around-2-weeks')

  return view
}

export default {
  dates: compute
}
