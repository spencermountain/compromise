import doShift from './01-shift.js'
import doCounter from './02-counter.js'
import doTime from './03-time.js'
import doRelative from './04-relative.js'
import doSection from './05-section.js'
import doTimezone from './06-timezone.js'
import doWeekday from './07-weekday.js'


const cleanup = function (doc) {
  // 'the fifth week ..'
  doc = doc.not('[^the] !#Value', 0) // keep 'the 17th'
  // 
  doc = doc.not('#Preposition$')
  doc = doc.not('#Conjunction$')
  doc = doc.not('sharp')
  doc = doc.not('on the dot')
  doc = doc.not('^(on|of)')
  doc = doc.not('(next|last|this)$')
  return doc
}


const tokenize = function (doc, context) {
  // parse 'two weeks after'
  let res = doShift(doc)
  let shift = res.result
  doc = doc.not(res.m)

  // parse 'nth week of june'
  res = doCounter(doc)
  let counter = res.result
  doc = doc.not(res.m)

  // parse 'eastern time'
  res = doTimezone(doc)
  let tz = res.result
  doc = doc.not(res.m)

  // parse '2pm'
  res = doTime(doc, context)
  let time = res.result
  doc = doc.not(res.m)

  // parse 'tuesday'
  res = doWeekday(doc, context)
  let weekDay = res.result
  doc = doc.not(res.m)

  // parse 'start of x'
  res = doSection(doc, context)
  let section = res.result
  doc = doc.not(res.m)

  // parse 'next x'
  res = doRelative(doc)
  let rel = res.result
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