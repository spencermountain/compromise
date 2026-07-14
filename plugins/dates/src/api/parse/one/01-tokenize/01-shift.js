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

// half of a unit, in smaller whole units
const halfUnits = {
  year: [6, 'month'],
  quarter: [45, 'day'],
  season: [45, 'day'],
  month: [15, 'day'],
  week: [84, 'hour'],
  day: [12, 'hour'],
  hour: [30, 'minute'],
  minute: [30, 'second'],
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
  const result = {}
  let m = doc.none()
  let shift = doc.match('#DateShift+')
  if (shift.found === false) {
    return { result, m }
  }
  //is it 2 weeks ago?  → -2  ('hence' means the future)
  const isNegative = shift.has('(before|ago|back)$') === true

  // '5 weeks'
  shift.match('#Cardinal #Duration').forEach((ts) => {
    const num = ts.match('#Cardinal').numbers().get()[0]
    if (num && typeof num === 'number') {
      const unit = parseUnit(ts)
      if (knownUnits[unit] === true) {
        result[unit] = isNegative ? num * -1 : num
      }
    }
  })
  m = shift.match('#Cardinal #Duration')
  shift = shift.not(m)

  // supoprt '1 day after tomorrow'
  m = shift.match('[<unit>#Duration] [<dir>(after|before)]')
  if (m.found) {
    const unit = m.groups('unit').text('reduced')
    // unit = unit.replace(/s$/, '')
    const dir = m.groups('dir').text('reduced')
    if (dir === 'after') {
      result[unit] = 1
    } else if (dir === 'before') {
      result[unit] = -1
    }
  }

  // in half an hour
  m = shift.match('half (a|an) [#Duration]', 0)
  if (m.found) {
    const unit = parseUnit(m)
    if (knownUnits[unit] === true) {
      result[unit] = isNegative ? -0.5 : 0.5
    }
  }

  // a few years / a couple of weeks
  m = shift.match('a [<amt>(few|couple)] of? [<unit>#Duration]')
  if (m.found) {
    const unit = parseUnit(m.groups('unit'))
    if (knownUnits[unit] === true) {
      const num = m.groups('amt').has('few') ? 3 : 2
      result[unit] = isNegative ? num * -1 : num
    }
  }

  // '2 weeks and a half'
  m = doc.match('[<unit>#Duration] and a half')
  if (m.found) {
    const unit = parseUnit(m.groups('unit'))
    if (knownUnits[unit] === true && result[unit] !== undefined) {
      result[unit] += isNegative ? -0.5 : 0.5
    }
  }

  // spacetime drops fractional units - swap a half-unit for smaller whole units
  Object.keys(result).forEach((k) => {
    const whole = Math.trunc(result[k])
    const frac = result[k] - whole
    if (frac === 0.5 || frac === -0.5) {
      const [num, smaller] = halfUnits[k] || []
      if (smaller) {
        result[k] = whole
        result[smaller] = (result[smaller] || 0) + (frac > 0 ? num : num * -1)
        if (result[k] === 0) {
          delete result[k]
        }
      }
    }
  })

  // finally, remove it from our text
  m = doc.match('#DateShift+')
  return { result, m }
}
export default parseShift
