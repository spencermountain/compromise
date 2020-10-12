/** return json metadata for this phrase */
exports.json = function (options = {}, world) {
  let res = {}
  // text data
  if (options.text) {
    res.text = this.text()
  }
  if (options.normal) {
    res.normal = this.text('normal')
  }
  if (options.clean) {
    res.clean = this.text('clean')
  }
  if (options.reduced) {
    res.reduced = this.text('reduced')
  }
  if (options.root) {
    res.root = this.text('root')
  }
  if (options.trim) {
    if (res.text) {
      res.text = res.text.trim()
    }
    if (res.normal) {
      res.normal = res.normal.trim()
    }
    if (res.reduced) {
      res.reduced = res.reduced.trim()
    }
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
