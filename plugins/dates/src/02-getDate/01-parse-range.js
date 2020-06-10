const parseDate = require('../03-parseDate')

//
const logic = function (doc, context) {
  // two explicit dates - 'between friday and sunday'
  let m = doc.match('between * and *')
  if (m.found) {
    let start = m.match('between [.*] and', 0).not('^between').not('and$')
    start = parseDate(start, context)
    let end = m.match('and *').not('^and')
    end = parseDate(end, context)
    if (start) {
      return {
        start: start,
        end: end,
      }
    }
  }
  // two months, one year - 'june 5 to june 7 1998'
  m = doc.match('#Month #Value to #Month #Value of? #Year')
  if (m.found) {
  }
  // two months, no year - 'june 5 to june 7'
  m = doc.match('#Month #Value to #Month #Value')
  if (m.found) {
  }
  // one month, one year, first form - 'january 5 to 7 1998'
  m = doc.match('#Month #Value to #Value of? #Year')
  if (m.found) {
  }
  // one month, one year, second form - '5 to 7 of january 1998'
  m = doc.match('#Value to #Value of? #Month of? #Year')
  if (m.found) {
  }
  // one month, no year - '5 to 7 of january'
  m = doc.match('#Value to #Value of? #Month')
  if (m.found) {
  }
  // one month, no year - 'january 5 to 7'
  m = doc.match('#Month #Value to #Value')
  if (m.found) {
  }
  // 'from A to B'
  m = doc.match('from? * (to|@hasHyphen|until|upto) [*]')
  if (m.found) {
  }
  // 'before june'
  m = doc.match('^due (by|before|on|in)? [*]')
  if (m.found) {
  }
  // 'after june'
  m = doc.match('^(after|following|from) [*]')
  if (m.found) {
  }
  // 'in june'
  m = doc.match('^(on|during|in) [*]', 0)
  if (m.found) {
    let d = parseDate(m, context)
    if (d) {
      return {
        start: d,
        end: d.clone().end(),
      }
    }
  }
  //else, try whole thing
  let d = parseDate(doc, context)
  return {
    start: d,
    end: null,
  }
}
module.exports = logic
