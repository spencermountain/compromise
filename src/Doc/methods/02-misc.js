const eachTerm = function(doc, fn) {
  let world = doc.world
  doc.list.forEach(p => {
    p.terms().forEach(t => t[fn](world))
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

/**  */
exports.wordCount = function() {
  return this.terms().length //TODO: remove implicit terms
}
/**  */
exports.firstTerm = function() {
  return this.match('^.')
}
/**  */
exports.lastTerm = function() {
  return this.match('.$')
}
/** use only the first result(s) */
exports.first = function(n) {
  if (n === undefined) {
    return this.get(n)
  }
  return this.slice(0, n)
}
/** use only the last result(s) */
exports.last = function(n) {
  if (n === undefined) {
    return this.get(this.list.length - 1)
  }
  let end = this.list.length
  return this.slice(end - n, end)
}

/** grab a subset of the results*/
exports.slice = function(start, end) {
  let list = this.list.slice(start, end)
  return this.buildFrom(list)
}
/** use only the nth result*/
exports.get = function(n) {
  //return an empty result
  if ((!n && n !== 0) || !this.list[n]) {
    return this.buildFrom([])
  }
  let list = [this.list[n]]
  return this.buildFrom(list)
}

/** sample a subset of the results */
exports.random = function(n) {
  if (!this.found) {
    return this
  }
  let r = Math.floor(Math.random() * this.list.length)
  if (n === undefined) {
    let list = [this.list[r]]
    return this.buildFrom(list)
  }
  //prevent it from going over the end
  if (r + n > this.length) {
    r = this.length - n
    r = r < 0 ? 0 : r
  }
  return this.slice(r, r + n)
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

/** connect words with hyphen, and remove whitespace */
exports.hyphenate = function() {
  this.list.forEach(p => {
    let terms = p.terms()
    //remove whitespace
    terms.forEach((t, i) => {
      if (i !== 0) {
        t.preText = ''
      }
      if (terms[i + 1]) {
        t.postText = '-'
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
      if (hasHyphen.test(t.postText)) {
        t.postText = ' '
      }
    })
  })
  this.untag('#Hyphenated', 'hyphenate')
  return this
}

/** return a flat array of term objects */
exports.termList = function() {
  let arr = []
  //'reduce' but faster
  for (let i = 0; i < this.list.length; i++) {
    let terms = this.list[i].terms()
    for (let o = 0; o < terms.length; o++) {
      arr.push(terms[o])
    }
  }
  return arr
}
