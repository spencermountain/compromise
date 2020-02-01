const informal = require('../../data/_timezones')

const isOffset = /(\-?[0-9]+)h(rs)?/i
const isNumber = /(\-?[0-9]+)/
const utcOffset = /utc([\-+]?[0-9]+)/i
const gmtOffset = /gmt([\-+]?[0-9]+)/i

const toIana = function(num) {
  num = Number(num)
  if (num > -13 && num < 13) {
    num = num * -1 //it's opposite!
    num = (num > 0 ? '+' : '') + num //add plus sign
    return 'Etc/GMT' + num
  }
  return null
}

const parseOffset = function(tz) {
  // '+5hrs'
  let m = tz.match(isOffset)
  if (m !== null) {
    return toIana(m[1])
  }
  // 'utc+5'
  m = tz.match(utcOffset)
  if (m !== null) {
    return toIana(m[1])
  }
  // 'GMT-5' (not opposite)
  m = tz.match(gmtOffset)
  if (m !== null) {
    let num = Number(m[1]) * -1
    return toIana(num)
  }
  // '+5'
  m = tz.match(isNumber)
  if (m !== null) {
    return toIana(m[1])
  }
  return null
}

const parseTimezone = function(doc) {
  let m = doc.match('#Timezone+')
  //remove prepositions
  m = m.remove('(in|for|by|near|at)')
  let str = m.text('reduced')

  // remove it from our doc, either way
  doc.remove('#Timezone+')

  // check our list of informal tz names
  if (informal.hasOwnProperty(str)) {
    return informal[str]
  }
  let tz = parseOffset(str)
  if (tz) {
    return tz
  }

  return null
}
module.exports = parseTimezone
