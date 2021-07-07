/** add this punctuation or whitespace before each match: */
exports.pre = function (str, concat) {
  if (str === undefined) {
    return this.list[0].terms(0).pre
  }
  this.list.forEach(p => {
    let term = p.terms(0)
    if (concat === true) {
      term.pre += str
    } else {
      term.pre = str
    }
  })
  return this
}

/** add this punctuation or whitespace after each match: */
exports.post = function (str, concat) {
  // return array of post strings
  if (str === undefined) {
    return this.list.map(p => {
      let terms = p.terms()
      let term = terms[terms.length - 1]
      return term.post
    })
  }
  // set post string on all ends
  this.list.forEach(p => {
    let terms = p.terms()
    let term = terms[terms.length - 1]
    if (concat === true) {
      term.post += str
    } else {
      term.post = str
    }
  })
  return this
}

/** remove start and end whitespace */
exports.trim = function () {
  this.list = this.list.map(p => p.trim())
  return this
}

/** connect words with hyphen, and remove whitespace */
exports.hyphenate = function () {
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
  return this
}

/** remove hyphens between words, and set whitespace */
exports.dehyphenate = function () {
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
  return this
}
exports.deHyphenate = exports.dehyphenate

/** add quotations around these matches */
exports.toQuotations = function (start, end) {
  start = start || `"`
  end = end || `"`
  this.list.forEach(p => {
    let terms = p.terms()
    terms[0].pre = start + terms[0].pre
    let last = terms[terms.length - 1]
    last.post = end + last.post
  })
  return this
}
exports.toQuotation = exports.toQuotations

/** add brackets around these matches */
exports.toParentheses = function (start, end) {
  start = start || `(`
  end = end || `)`
  this.list.forEach(p => {
    let terms = p.terms()
    terms[0].pre = start + terms[0].pre
    let last = terms[terms.length - 1]
    last.post = end + last.post
  })
  return this
}
