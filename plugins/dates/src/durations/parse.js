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
  doc.match('#Value+ #Duration').forEach((m) => {
    let num = m.numbers().get(0)
    let unit = m.match('#Duration').nouns().toSingular().text()
    // turn 'mins' into 'minute'
    if (mapping.hasOwnProperty(unit)) {
      unit = mapping[unit]
    }
    if (known.hasOwnProperty(unit) && num) {
      duration[unit] = num
    }
  })
  return duration
}
module.exports = parse
