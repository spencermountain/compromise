const fns = {
  toSuperlative: require('./toSuperlative'),
  toComparative: require('./toComparative'),
}

/** conjugate an adjective into other forms */
const conjugate = function (w) {
  let res = {}
  // 'greatest'
  let sup = fns.toSuperlative(w)
  if (sup) {
    res.Superlative = sup
  }
  // 'greater'
  let comp = fns.toComparative(w)
  if (comp) {
    res.Comparative = comp
  }
  return res
}
module.exports = conjugate
