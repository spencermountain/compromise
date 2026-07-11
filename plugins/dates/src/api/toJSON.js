const getDuration = function (range) {
  const end = range.end.d.add(1, 'millisecond')
  const diff = end.since(range.start.d).diff
  delete diff.milliseconds
  delete diff.seconds
  return diff
}

// 'jan 1 to dec 31' is a year
const inferUnit = function (range) {
  if (!range.end) {
    return null
  }
  const s = range.start.d
  const e = range.end.d.add(1, 'millisecond')
  const units = ['year', 'quarter', 'month', 'week', 'day']
  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i]
    if (s.epoch === s.startOf(unit).epoch && e.epoch === s.add(1, unit).startOf(unit).epoch) {
      return unit
    }
  }
  return null
}

const toJSON = function (range) {
  let out = null
  if (!range.start) {
    out = {
      start: null,
      end: null,
      timezone: null,
      duration: {},
      // range: null
    }
  } else {
    const diff = range.end ? getDuration(range) : {}
    out = {
      start: range.start.format('iso'),
      end: range.end ? range.end.format('iso') : null,
      timezone: range.start.d.format('timezone'),
      duration: diff,
      // range: getRange(diff)
    }
  }
  const unit = range.unit || (range.start ? inferUnit(range) : null)
  if (unit) {
    out.unit = unit
  }
  // 'every week ..'
  if (range.repeat) {
    out.repeat = range.repeat
  }
  return out
}
export default toJSON