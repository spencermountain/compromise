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

const mapping = {
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

// units made of other units
const multiples = {
  fortnight: [2, 'week'],
}

const toUnit = function (str) {
  let unit = str.replace(/ies$/, 'y')
  unit = unit.replace(/s$/, '')
  // turn 'mins' into 'minute'
  if (Object.hasOwn(mapping, unit)) {
    unit = mapping[unit]
  }
  return unit
}

// '8', 'a', 'half an', 'two and a half'
const toNumber = function (m) {
  if (m.has('^half')) {
    return 0.5
  }
  let num = m.match('[#Value+] #Duration', 0).numbers().get()[0]
  if (num === null || num === undefined) {
    num = m.has('(a|an)') ? 1 : null
  }
  if (num !== null && m.has('and a half$')) {
    num += 0.5
  }
  return num
}

const parse = function (doc) {
  const duration = {}
  //parse '8 minutes'
  const twoWord = doc.match('half? (#Value+|a|an) #Duration (and a half)?')
  if (twoWord.found) {
    twoWord.forEach((m) => {
      let num = toNumber(m)
      let unit = toUnit(m.match('#Duration').text('reduced'))
      // 'a fortnight' is 2 weeks
      if (Object.hasOwn(multiples, unit)) {
        num *= multiples[unit][0]
        unit = multiples[unit][1]
      }
      if (Object.hasOwn(known, unit) && num !== null) {
        duration[unit] = num
      }
    })
  } else {
    const oneWord = doc.match('(#Duration && /[0-9][a-z]+$/)')
    if (oneWord.found) {
      const str = doc.text()
      let num = str.match(/([0-9]+)/)
      let unit = str.match(/([a-z]+)/)
      if (num && unit) {
        num = num[0] || null
        unit = unit[0] || null
        if (Object.hasOwn(mapping, unit)) {
          unit = mapping[unit]
        }
        if (Object.hasOwn(known, unit) && num !== null) {
          duration[unit] = Number(num)
        }
      }
    }
  }
  return duration
}
export default parse
