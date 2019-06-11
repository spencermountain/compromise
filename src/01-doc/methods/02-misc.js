const eachTerm = function(doc, fn) {
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn]())
  })
  return doc
}

module.exports = {
  /** turn every letter of every term to lower-cse */
  toLowerCase: function() {
    return eachTerm(this, 'toLowerCase')
  },

  /** turn every letter of every term to upper case */
  toUpperCase: function() {
    return eachTerm(this, 'toUpperCase')
  },

  /** upper-case the first letter of each term */
  toTitleCase: function() {
    return eachTerm(this, 'toTitleCase')
  },

  /** remove whitespace and title-case each term */
  toCamelCase: function() {
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
  },

  /** return a flat array of term objects */
  termList: function() {
    return this.list.reduce((arr, p) => {
      let terms = p.terms()
      arr = arr.concat(terms)
      return arr
    }, [])
  },
}
