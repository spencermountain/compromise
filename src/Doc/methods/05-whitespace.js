/** remove start and end whitespace */
exports.trim = function() {
  this.list = this.list.map(p => p.trim())
  return this
}

/** connect words with hyphen, and remove whitespace */
exports.hyphenate = function() {
  this.list.forEach(p => {
    let terms = p.terms()
    //remove whitespace
    terms.forEach((t, i) => {
      if (i !== 0) {
        t.pre = ''
      }
      if (terms[i + 1]) {
        t.post = '-'
      }
    })
  })
  this.tag('#Hyphenated', 'hyphenate')
  return this
}

/** remove hyphens between words, and set whitespace */
exports.dehyphenate = function() {
  const hasHyphen = /(-|–|—)/
  this.list.forEach(p => {
    let terms = p.terms()
    //remove whitespace
    terms.forEach(t => {
      if (hasHyphen.test(t.post)) {
        t.post = ' '
      }
    })
  })
  this.untag('#Hyphenated', 'hyphenate')
  return this
}
