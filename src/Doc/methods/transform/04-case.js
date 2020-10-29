const eachTerm = function (doc, fn) {
  let world = doc.world
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn](world))
  })
  return doc
}

/** turn every letter of every term to lower-cse */
exports.toLowerCase = function () {
  return eachTerm(this, 'toLowerCase')
}

/** turn every letter of every term to upper case */
exports.toUpperCase = function () {
  return eachTerm(this, 'toUpperCase')
}

/** upper-case the first letter of each term */
exports.toTitleCase = function () {
  return eachTerm(this, 'toTitleCase')
}
/** remove whitespace and title-case each term */
exports.toCamelCase = function () {
  this.list.forEach(p => {
    //remove whitespace
    let terms = p.terms()
    terms.forEach((t, i) => {
      if (i !== 0) {
        t.toTitleCase()
      }
      if (i !== terms.length - 1) {
        t.post = ''
      }
    })
  })
  // this.tag('#CamelCase', 'toCamelCase')
  return this
}
