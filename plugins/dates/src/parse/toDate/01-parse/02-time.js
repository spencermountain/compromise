const spacetime = require('spacetime')
//hmmm: 'june 5th between 9 and 10am'

const parseTime = function(doc) {
  let time = doc.match('(at|by|for|before)? #Time+')
  if (time.found) {
    doc.remove(time)
  }
  // get the main part of the time
  time = time.not('(at|by|for|before|sharp)')
  time = time.not('on the dot')
  let s = spacetime.now()
  let after = s.clone()

  // '5 oclock'
  let m = time.match('^[#Cardinal] oclock')
  if (m.found) {
    after = after.hour(m.text('reduced'))
    if (after.isValid() && !s.isEqual(after)) {
      return after.time()
    }
  }
  // 'half past two'
  m = time.match('half past [#Cardinal]')
  if (m.found) {
    after = after.hour(m.text('reduced'))
    after = after.minutes(30)
    if (after.isValid() && !s.isEqual(after)) {
      return after.time()
    }
  }
  // 'quarter to two'
  m = time.match('(quarter|15) (past|after|to) #Cardinal')
  if (m.found) {
    after = after.hour(m.match('#Cardinal').text('reduced'))
    after = after.startOf('hour')
    if (m.has('(past|after)')) {
      after = after.add(15, 'minutes')
    } else {
      after = after.minus(15, 'minutes')
    }
    if (after.isValid() && !s.isEqual(after)) {
      return after.time()
    }
  }
  // parse random a time like '4:54pm'
  let str = time.out('reduced')
  after = s.time(str)
  if (after.isValid() && !s.isEqual(after)) {
    return after.time()
  }
  return null
}
module.exports = parseTime
