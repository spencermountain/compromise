//hmmm: 'june 5th between 9 and 10am'

const parseTime = function(doc) {
  let time = doc.match('(at|by|for|before)? #Time+')
  if (time.found) {
    // doc.remove('(at|by|for|before)? #Time+ (sharp)?')
    doc.remove(time)
  }
  return time
}
module.exports = parseTime
