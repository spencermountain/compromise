const spacetime = require('spacetime')
//hmmm: 'june 5th between 9 and 10am'

const parseTime = function(doc) {
  let time = doc.match('(at|by|for|before)? #Time+')
  if (time.found) {
    doc.remove(time)
  }
  time = time.not('(at|by|for|before|sharp)')
  let str = time.out('reduced')
  let s = spacetime.now()
  let after = s.time(str)
  if (after.isValid() && !s.isEqual(after)) {
    return after.time()
  }
  return null
}
module.exports = parseTime
