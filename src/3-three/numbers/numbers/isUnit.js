import parse from './parse/index.js'

// accept 'kg', ['kg', 'lb'], or { kg: true } as a set of unit names
const toUnits = function (input) {
  if (typeof input === 'string' || typeof input === 'number') {
    return new Set([String(input)])
  }
  if (Array.isArray(input)) {
    return new Set(input.map(String))
  }
  return new Set(Object.keys(input || {}).filter(k => input[k] === true))
}

// only return values with the given unit
const isUnit = function (doc, input = {}) {
  const units = toUnits(input)
  return doc.filter(p => {
    const { unit } = parse(p)
    return Boolean(unit) && units.has(unit)
  })
}
export default isUnit
