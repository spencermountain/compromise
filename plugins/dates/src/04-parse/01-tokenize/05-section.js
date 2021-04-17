// 'start of october', 'middle of june 1st'
const parseSection = function (doc) {
  // start of 2019
  let m = doc.match('[(start|beginning) of] .', 0)
  if (m.found) {
    doc.remove(m)
    return 'start'
  }
  // end of 2019
  m = doc.match('[end of] .', 0)
  if (m.found) {
    doc.remove(m)
    return 'end'
  }
  // middle of 2019
  m = doc.match('[(middle|midpoint|center) of] .', 0)
  if (m.found) {
    doc.remove(m)
    return 'middle'
  }
  return null
}
module.exports = parseSection
