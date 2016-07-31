'use strict';
//turn a number like 5 into an ordinal like 5th
const toOrdinal = function(num) {
  const mapping = {
    0: 'th',
    1: 'st',
    2: 'nd',
    3: 'rd'
  }
  let str = '' + num
  let last = str.slice(str.length - 1, str.length)
  if (mapping[last]) {
    str += mapping[last]
  } else {
    str += 'th'
  }
  return str
}

module.exports = {
  ordinal: toOrdinal
}
