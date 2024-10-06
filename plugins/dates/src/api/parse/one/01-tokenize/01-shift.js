const knownUnits = {
  second: true,
  minute: true,
  hour: true,
  day: true,
  week: true,
  weekend: true,
  month: true,
  season: true,
  quarter: true,
  year: true,
}

const aliases = {
  wk: 'week',
  min: 'minute',
  sec: 'second',
  weekend: 'week', //for now...
}

const parseUnit = function (m) {
  let unit = m.match('#Duration').text('normal')
  unit = unit.replace(/s$/, '')
  // support shorthands like 'min'
  if (aliases.hasOwnProperty(unit)) {
    unit = aliases[unit]
  }
  return unit
}

//turn '5 weeks before' to {weeks:5}
const parseShift = function (doc) {
  let result = {}
  let m = doc.none()
  let shift = doc.match('#DateShift+')
  if (shift.found === false) {
    return { res: result, m }
  }

  // '5 weeks'
  shift.match('#Cardinal #Duration').forEach((ts) => {
    let num = ts.match('#Cardinal').numbers().get()[0]
    if (num && typeof num === 'number') {
      let unit = parseUnit(ts)
      if (knownUnits[unit] === true) {
        result[unit] = num
      }
    }
  })
  //is it 2 weeks ago?  → -2
  if (shift.has('(before|ago|hence|back)$') === true) {
    Object.keys(result).forEach((k) => (result[k] *= -1))
  }
  m = shift.match('#Cardinal #Duration')
  shift = shift.not(m)

  // supoprt '1 day after tomorrow'
  m = shift.match('[<unit>#Duration] [<dir>(after|before)]')
  if (m.found) {
    let unit = m.groups('unit').text('reduced')
    // unit = unit.replace(/s$/, '')
    let dir = m.groups('dir').text('reduced')
    if (dir === 'after') {
      result[unit] = 1
    } else if (dir === 'before') {
      result[unit] = -1
    }
  }

  // in half an hour
  m = shift.match('half (a|an) [#Duration]', 0)
  if (m.found) {
    let unit = parseUnit(m)
    result[unit] = 0.5
  }

  // a couple years
  m = shift.match('a (few|couple) [#Duration]', 0)
  if (m.found) {
    let unit = parseUnit(m)
    result[unit] = m.has('few') ? 3 : 2
  }

  // finally, remove it from our text
  m = doc.match('#DateShift+')
  return { result, m }
}
export default parseShift
