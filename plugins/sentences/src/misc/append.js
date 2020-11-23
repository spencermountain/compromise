/** add a word to the start of this sentence */
exports.prepend = function (str) {
  this.forEach((doc) => {
    // repair the titlecase
    let firstTerms = doc.match('^.')
    firstTerms.not('#ProperNoun').toLowerCase()
    // actually add the word
    firstTerms._prepend(str)
    // add a titlecase
    firstTerms.terms(0).toTitleCase()
  })
  return this
}

/** add a word to the end of this sentence */
exports.append = function (str) {
  let hasEnd = /[.?!]\s*$/.test(str)
  this.forEach((doc) => {
    let end = doc.match('.$')
    let lastTerm = end.termList(0)
    let punct = lastTerm.post
    if (hasEnd === true) {
      punct = ''
    }
    // add punctuation to the end
    end._append(str + punct)
    // remove punctuation from the former last-term
    lastTerm.post = ' '
  })
  return this
}
