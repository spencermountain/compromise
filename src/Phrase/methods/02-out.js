/** produce output in the given format */
exports.text = function(options = {}) {
  let terms = this.terms()
  //this this phrase a complete sentence?
  let isFull = false
  if (terms[0].prev === null && terms[terms.length - 1].next === null) {
    isFull = true
  }
  let text = terms.reduce((str, t, i) => {
    options.last = i === terms.length - 1
    let skipFront = isFull === false && i === 0
    let skipEnd = isFull === false && i === terms.length - 1
    return str + t.textOut(options, skipFront, skipEnd)
  }, '')
  return text
}

/** return json metadata for this phrase */
exports.json = function(options = {}) {
  let res = {}
  // text data
  if (options.text) {
    res.text = this.text(options)
    if (options.trim) {
      res.text = res.text.trim()
    }
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
