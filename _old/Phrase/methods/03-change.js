/** remove start and end whitespace */
exports.trim = function () {
  let terms = this.terms()
  if (terms.length > 0) {
    //trim starting
    terms[0].pre = terms[0].pre.replace(/^\s+/, '')
    //trim ending
    let lastTerm = terms[terms.length - 1]
    lastTerm.post = lastTerm.post.replace(/\s+$/, '')
  }
  return this
}
