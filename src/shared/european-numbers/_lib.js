// a leading '-', or the real minus-sign, or one after a symbol - '$-5'
const minus = /^\s*[-−]|\P{L}[-−]$/u
const signs = /[-+−]/g
// any currency symbol - '$', '€', '₽'
const currency = /\p{Sc}/u

// a decimal-comma, unless the language's model says otherwise.
// `ordinal` is regex-source for the ending of a numeric ordinal - '[ºª°]'
const defaults = { decimal: ',', group: '.', ordinal: '' }

// the mark that groups thousands can't also be the decimal
const groupMark = function (group, decimal) {
  if (group !== decimal) {
    return group
  }
  return decimal === '.' ? ',' : '.'
}

// '1234567' → '1.234.567'
const addGroups = function (int, mark) {
  const out = []
  for (let end = int.length; end > 0; end -= 3) {
    out.unshift(int.slice(Math.max(end - 3, 0), end))
  }
  return out.join(mark)
}

// floating-point noise - 0.1 + 0.2
const tidy = num => Number(num.toPrecision(15))

// compile each ordinal-ending once
const cache = {}
const isOrdinal = function (suffix, src) {
  if (!src || !suffix) {
    return false
  }
  cache[src] = cache[src] || new RegExp('^(?:' + src + ')$', 'iu')
  return cache[src].test(suffix)
}

export { minus, signs, currency, defaults, groupMark, addGroups, tidy, isOrdinal }
