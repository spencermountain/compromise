/** remove start and end whitespace */
exports.trim = function() {
  let terms = this.terms()
  if (terms.length > 0) {
    //trim starting
    terms[0].preText = terms[0].preText.replace(/^\s+/, '')
    //trim ending
    let lastTerm = terms[terms.length - 1]
    lastTerm.postText = lastTerm.postText.replace(/\s+$/, '')
  }
  return this
}
