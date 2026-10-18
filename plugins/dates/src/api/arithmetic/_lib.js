const month = 'jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?'
const named = new RegExp(`^(${month})(\\.?\\s+)(\\d{1,2})(st|nd|rd|th)?(,?\\s+\\d{4})?$`, 'i')
const reversed = new RegExp(`^(\\d{1,2})(st|nd|rd|th)?(\\s+(?:of\\s+)?)(${month})(\\.?)(,?\\s+\\d{4})?$`, 'i')

const matchCase = (str, model) => {
  if (model === model.toLowerCase()) {
    return str.toLowerCase()
  }
  if (model === model.toUpperCase()) {
    return str.toUpperCase()
  }
  return str
}

const monthName = (d, model) => {
  const short = model.length <= 4 && model.toLowerCase() !== 'june' && model.toLowerCase() !== 'july'
  return matchCase(d.format(short ? 'month-short' : 'month'), model)
}

const yearSuffix = (suffix, start, shifted) => {
  if (suffix) {
    return suffix.replace(/\d{4}/, shifted.year())
  }
  if (start.year() !== shifted.year()) {
    return ' ' + shifted.year()
  }
  return ''
}

// Keep the spelling, ordering and ordinal style of common calendar dates.
const calendarFormat = (text, start, shifted, opts) => {
  let m = text.match(named)
  if (m) {
    const date = matchCase(shifted.format(m[4] ? 'date-ordinal' : 'date'), m[4] || '')
    return monthName(shifted, m[1]) + m[2] + date + yearSuffix(m[5], start, shifted)
  }
  m = text.match(reversed)
  if (m) {
    const date = matchCase(shifted.format(m[2] ? 'date-ordinal' : 'date'), m[2] || '')
    return date + m[3] + monthName(shifted, m[4]) + m[5] + yearSuffix(m[6], start, shifted)
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return shifted.format('iso-short')
  }
  m = text.match(/^(\d{1,2})([/.\-])(\d{1,2})\2(\d{4})$/)
  if (m) {
    let parts = [shifted.month() + 1, shifted.date()]
    if (opts.dmy || Number(m[1]) > 12) {
      parts = parts.reverse()
    }
    return String(parts[0]).padStart(m[1].length, '0') + m[2] +
      String(parts[1]).padStart(m[3].length, '0') + m[2] + shifted.year()
  }
  return null
}

// Keep the named zone as well as the offset for subsequent calendar arithmetic.
const preciseFormat = d => d.format('iso') + ' ' + d.format('timezone')

const explicitFormat = (d, time) => {
  if (time) {
    if (d.second() === 0 && d.millisecond() === 0) {
      return d.format('{month} {date-ordinal} {year} at {time} {timezone}')
    }
    return preciseFormat(d)
  }
  return d.format('{month} {date-ordinal} {year}')
}

export { calendarFormat, explicitFormat, preciseFormat }
