const numUnit = /^([+-]?[0-9][.,0-9]*)([a-z°²³µ/]+)$/ //(must be lowercase)

const numberUnit = function (terms, i, world) {
  const notUnit = world.model.one.numberSuffixes || {}
  const term = terms[i]
  const parts = term.text.match(numUnit)
  if (parts !== null) {
    // is it a recognized unit, like 'km'?
    const unit = parts[2].toLowerCase().trim()
    // don't split '3rd'
    if (notUnit.hasOwnProperty(unit)) {
      return null
    }
    return [parts[1], unit] //split it
  }
  return null
}
export default numberUnit
