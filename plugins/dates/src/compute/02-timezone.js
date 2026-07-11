import informal from '../model/words/timezones.js'

// abbreviations we can resolve later ('jst', 'nzst'..) -
// only tagged in an unambiguous context, like '4pm jst'
const zones = Object.keys(informal).reduce((h, str) => {
  if (/^[a-z]{2,6}$/.test(str)) {
    h[str] = true
  }
  return h
}, {})

const tagTz = function (doc) {
  // 4pm PST - only tagged if we know the abbreviation
  const m = doc.match('#Time [(#Acronym|#Abbreviation|#Noun)]', 0)
  if (m.found) {
    m.forEach(match => {
      const str = match.text('reduced')
      if (zones[str] === true) {
        match.tag('Timezone', 'tz-abbr')
      }
    })
  }
  // 'utc-5' - the offset splits into its own term
  const off = doc.match('(utc|gmt) #Cardinal')
  if (off.found) {
    off.tag('Timezone', 'tz-offset')
  }
}
export default tagTz
