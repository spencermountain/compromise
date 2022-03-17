const known = {
  century: true,
  day: true,
  decade: true,
  hour: true,
  millisecond: true,
  minute: true,
  month: true,
  second: true,
  weekend: true,
  week: true,
  year: true,
  quarter: true,
  season: true,
}

let mapping = {
  m: 'minute',
  h: 'hour',
  hr: 'hour',
  min: 'minute',
  sec: 'second',
  'week end': 'weekend',
  wk: 'week',
  yr: 'year',
  qtr: 'quarter',
}
// add plurals
Object.keys(mapping).forEach((k) => {
  mapping[k + 's'] = mapping[k]
})

const parse = function (doc) {
  let duration = {}
  //parse '8 minutes'
  let twoWord = doc.match('#Value+ #Duration')
  if (twoWord.found) {
    twoWord.forEach((m) => {
      let num = m.numbers().get()[0]
      let unit = m.terms().last().text('reduced')
      unit = unit.replace(/ies$/, 'y')
      unit = unit.replace(/s$/, '')
      // turn 'mins' into 'minute'
      if (mapping.hasOwnProperty(unit)) {
        unit = mapping[unit]
      }
      if (known.hasOwnProperty(unit) && num !== null) {
        duration[unit] = num
      }
    })
  } else {
    let oneWord = doc.match('(#Duration && /[0-9][a-z]+$/)')
    if (oneWord.found) {
      let str = doc.text()
      let num = str.match(/([0-9]+)/)
      let unit = str.match(/([a-z]+)/)
      if (num && unit) {
        num = num[0] || null
        unit = unit[0] || null
        if (mapping.hasOwnProperty(unit)) {
          unit = mapping[unit]
        }
        if (known.hasOwnProperty(unit) && num !== null) {
          duration[unit] = Number(num)
        }
      }
    }
  }
  return duration
}
export default parse
