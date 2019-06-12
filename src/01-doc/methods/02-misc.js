const eachTerm = function(doc, fn) {
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn]())
  })
  return doc
}
const eachPhrase = function(doc, fn) {
  doc.list = doc.list.map(p => p[fn]())
  return doc
}

/** turn every letter of every term to lower-cse */
exports.toLowerCase = function() {
  return eachTerm(this, 'toLowerCase')
}

/** turn every letter of every term to upper case */
exports.toUpperCase = function() {
  return eachTerm(this, 'toUpperCase')
}

/** upper-case the first letter of each term */
exports.toTitleCase = function() {
  return eachTerm(this, 'toTitleCase')
}
/** remove start and end whitespace */
exports.trim = function() {
  return eachPhrase(this, 'trim')
}

/** remove whitespace and title-case each term */
exports.toCamelCase = function() {
  this.toTitleCase()
  this.list.forEach(p => {
    //remove whitespace
    p.terms().forEach((t, i) => {
      if (i !== 0) {
        t.preText = ''
      }
      t.postText = ''
    })
  })
  this.tag('#CamelCase', 'toCamelCase')
  return this
}

/** return a flat array of term objects */
exports.termList = function() {
  return this.list.reduce((arr, p) => {
    let terms = p.terms()
    arr = arr.concat(terms)
    return arr
  }, [])
}
