import doShift from './01-shift.js'
import doCounter from './02-counter.js'
import doTime from './03-time.js'
import doRelative from './04-relative.js'
import doSection from './05-section.js'
import doTimezone from './06-timezone.js'
import doWeekday from './07-weekday.js'


const cleanup = function (doc) {
  // strip a leading 'the', but keep 'the 17th'
  if (doc.has('^the !#Value')) {
    doc = doc.not('^the')
  }
  //
  doc = doc.not('#Preposition$')
  doc = doc.not('#Conjunction$')
  doc = doc.not('sharp')
  doc = doc.not('on the dot')
  doc = doc.not('^(on|of|due)')
  // keep a bare 'next' or 'last' - the leftover of 'day after next'
  if (!doc.has('^(next|last)$') && !doc.has('^after (next|last)$')) {
    doc = doc.not('(next|last|this)$')
  }
  return doc
}


const tokenize = function (doc, context) {
  // parse 'two weeks after'
  let res = doShift(doc)
  const shift = res.result
  doc = doc.not(res.m)

  // parse 'nth week of june'
  res = doCounter(doc)
  const counter = res.result
  doc = doc.not(res.m)

  // parse 'eastern time'
  res = doTimezone(doc)
  const tz = res.result
  doc = doc.not(res.m)

  // parse '2pm'
  res = doTime(doc, context)
  const time = res.result
  doc = doc.not(res.m)

  // parse 'tuesday'
  res = doWeekday(doc, context)
  const weekDay = res.result
  doc = doc.not(res.m)

  // parse 'start of x'
  res = doSection(doc, context)
  const section = res.result
  doc = doc.not(res.m)

  // parse 'next x'
  res = doRelative(doc)
  const rel = res.result
  doc = doc.not(res.m)

  // cleanup remaining doc object
  doc = cleanup(doc)
  return {
    shift,
    counter,
    tz,
    time,
    weekDay,
    section,
    rel,
    doc
  }
}
export default tokenize