const numUnit = /^([0-9.,+-]+)([a-z°²³µ/]+)$/i

const numberUnit = function (terms, i, units) {
  let term = terms[i]
  let parts = term.text.match(numUnit)
  if (parts !== null) {
    // is it a recognized unit, like 'km'?
    let unit = parts[2].toLowerCase().trim()
    if (units.has(unit)) {
      return [parts[1], unit] //split it
    }
  }
  return null
}
export default numberUnit
