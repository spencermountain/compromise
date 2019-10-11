/** return json metadata for this phrase */
exports.json = function(options = {}, world) {
  let res = {}
  // text data
  if (options.text) {
    res.text = this.text(options)
    // if (options.trim) {
    // res.text = res.text.trim()
    // }
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
    if (options.terms === true) {
      options.terms = {}
    }
    res.terms = this.terms().map(t => t.json(options.terms, world))
  }
  return res
}
