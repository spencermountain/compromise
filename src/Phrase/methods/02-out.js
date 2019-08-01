/** produce output in the given format */
exports.text = function(options = {}) {
  let terms = this.terms()
  return terms.reduce((str, t, i) => {
    options.last = i === terms.length - 1
    return str + t.textOut(options)
  }, '')
}

/** return json metadata for this phrase */
exports.json = function(options = {}) {
  let res = {}
  // text data
  if (options.text) {
    res.text = this.text()
  }
  if (options.normal) {
    res.normal = this.text({
      punctuation: true,
      whitespace: true,
      unicode: true,
    })
  }
  // terms data
  if (options.terms) {
    res.terms = this.terms().map(t => t.json(options.terms))
  }
  return res
}
