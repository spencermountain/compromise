// handle 'one bottle', 'two bottles'
const agreeUnits = function (agree, val, obj) {
  if (agree === false) {
    return
  }
  let unit = val.lookAhead('^(#Unit|#Noun)')
  // don't do these
  if (unit.has('(#Address|#Money|#Percent)') || val.has('#Ordinal')) {
    return
  }
  if (obj.num === 1) {
    unit.nouns().toSingular()
  } else if (unit.has('#Singular')) {
    unit.nouns().toPlural()
  }
}
module.exports = agreeUnits
