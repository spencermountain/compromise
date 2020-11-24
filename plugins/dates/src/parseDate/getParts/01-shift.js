const knownUnits = {
  second: true,
  minute: true,
  hour: true,
  day: true,
  week: true,
  month: true,
  season: true,
  quarter: true,
  year: true,
}

//turn '5 weeks before' to {weeks:5}
const parseShift = function (doc) {
  let result = {}
  let m = doc.match('#DateShift+')
  if (m.found === false) {
    return result
  }
  m.match('#Cardinal #Duration').forEach((ts) => {
    let num = ts.match('#Cardinal').text('normal')
    num = parseFloat(num)
    if (num && typeof num === 'number') {
      let unit = ts.match('#Duration').text('normal')
      unit = unit.replace(/s$/, '')
      if (unit && knownUnits.hasOwnProperty(unit)) {
        result[unit] = num
      }
    }
  })
  //is it 2 weeks ago?  → -2
  if (m.has('(before|ago)$') === true) {
    Object.keys(result).forEach((k) => (result[k] *= -1))
  }
  // finally, remove it from our text
  doc.remove('#DateShift')
  return result
}
module.exports = parseShift
