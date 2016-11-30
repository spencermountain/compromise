'use strict';

const months = {

}

//
const parseDate = (r) => {
  let result = {
    month: null,
    date: null,
    day: null,
    year: null,
    time: null,
    knownDate: null
  }
  let m = r.match('#Holiday')
  if (m.found) {
    result.knownDate = m.normal()
  }
  m = r.match('#Month')
  if (m.found) {
    result.month = m.normal()
  }
  return result
}
module.exports = parseDate
