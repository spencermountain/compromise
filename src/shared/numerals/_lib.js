// '-' and the real minus-sign
const minus = /[-−]/
const signs = /[-+−]/g
// any currency symbol - '$', '€', '₽'
const currency = /\p{Sc}/u

// english, unless told otherwise
const defaults = { decimal: '.', group: ',', ordinal: null }

// the mark that groups thousands can't also be the decimal
const groupMark = function (group, decimal) {
  if (group !== decimal) {
    return group
  }
  return decimal === '.' ? ',' : '.'
}

// floating-point noise - 0.1 + 0.2
const tidy = num => Number(num.toPrecision(15))

export { minus, signs, currency, defaults, groupMark, tidy }
