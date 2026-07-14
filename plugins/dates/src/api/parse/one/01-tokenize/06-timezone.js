import informal from '../../../../model/words/timezones.js'

const isOffset = /^[-+]?[0-9]{1,2}h(rs)?$/i
const isNumber = /^[-+]?[0-9]{1,2}$/
const utcOffset = /^utc([-+]?[0-9]{1,2})$/i
const gmtOffset = /^gmt([-+]?[0-9]{1,2})$/i

const toIana = function (num) {
  num = Number(num)
  // the Etc/GMT zones cover utc-12 to utc+14
  if (num >= -12 && num <= 14) {
    num = num * -1 //the Etc/GMT names are opposite!
    num = (num > 0 ? '+' : '') + num //add plus sign
    return 'Etc/GMT' + num
  }
  return null
}

const parseOffset = function (tz) {
  tz = tz.replace(/\s+/g, '')
  // '+5hrs'
  let m = tz.match(isOffset)
  if (m !== null) {
    return toIana(parseInt(m[0], 10))
  }
  // 'utc+5'
  m = tz.match(utcOffset)
  if (m !== null) {
    return toIana(m[1])
  }
  // 'gmt+9' - people mean utc+9 by this
  m = tz.match(gmtOffset)
  if (m !== null) {
    return toIana(m[1])
  }
  // '+5'
  m = tz.match(isNumber)
  if (m !== null) {
    return toIana(m[0])
  }
  return null
}

const parseTimezone = function (doc) {
  let m = doc.match('#Timezone+')
  if (!m.found) {
    return { result: null, m: doc.none() }
  }
  //remove prepositions
  m = m.not('(in|for|by|near|at)')
  // '3pm central time' can be over-tagged as one timezone
  m = m.not('#Time')
  if (!m.found) {
    return { result: null, m: doc.none() }
  }
  const str = m.text('reduced')

  // check our list of informal tz names
  if (informal.hasOwnProperty(str)) {
    return { result: informal[str], m }
  }
  // try the raw text first - 'utc-5' loses its minus-sign in reduced text
  const tz = parseOffset(m.text() || str) || parseOffset(str)
  if (tz) {
    return { result: tz, m }
  }

  // we couldn't resolve it - drop the timezone text, instead of failing the whole date
  return { result: null, m }
}
export default parseTimezone
