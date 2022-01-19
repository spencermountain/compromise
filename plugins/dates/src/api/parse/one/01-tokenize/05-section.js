// 'start of october', 'middle of june 1st'
const parseSection = function (doc) {
  // start of 2019
  let m = doc.match('[(start|beginning) of] .', 0)
  if (m.found) {
    return { result: 'start', m }
  }
  // end of 2019
  m = doc.match('[end of] .', 0)
  if (m.found) {
    return { result: 'end', m }
  }
  // middle of 2019
  m = doc.match('[(middle|midpoint|center) of] .', 0)
  if (m.found) {
    return { result: 'middle', m }
  }
  return { result: null, m }
}
export default parseSection
