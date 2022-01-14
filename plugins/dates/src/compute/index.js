import basic from './00-basic.js'
import values from './01-values.js'
import dates from './02-dates.js'
import sections from './03-sections.js'
import time from './04-time.js'
import shifts from './05-shifts.js'
import intervals from './06-intervals.js'
import timezone from './07-timezone.js'
import fixup from './08-fixup.js'

// normalizations to run before tagger
const normalize = function (doc) {
  // turn '20mins' into '20 mins'
  doc.numbers().normalize()
  return doc
}

// run each of the taggers
const compute = function (view) {
  // doc = normalize(doc)
  // run taggers
  // methods.forEach((fn) => fn(view))
  basic(view)
  values(view)
  dates(view)
  sections(view)
  time(view)
  shifts(view)
  intervals(view)
  timezone(view)
  fixup(view)
  // view.debug()
  return view
}

export default {
  dates: compute
}
