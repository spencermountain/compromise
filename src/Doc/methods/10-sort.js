const methods = {
  /** alphabetical order */
  alpha: (a, b) => {
    let left = a.text('clean')
    let right = b.text('clean')
    if (left < right) {
      return -1
    }
    if (left > right) {
      return 1
    }
    return 0
  },

  /** the 'chronological', or original document sort order */
  chron: (a, b) => {
    let left = a.text()
    let right = b.text()
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },

  /** count the # of characters of each match */
  length: (a, b) => {
    let left = a.text().trim().length
    let right = b.text().trim().length
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },

  /** count the # of terms in each match */
  wordCount: (a, b) => {
    let left = a.wordCount()
    let right = b.wordCount()
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  },
}

/** sort by # of duplicates in the document*/
const byFreq = function(doc) {
  let counts = {}
  const options = {
    case: true,
    punctuation: false,
    whitespace: true,
    unicode: true,
  }
  doc.list.forEach(p => {
    let str = p.text(options)
    counts[str] = counts[str] || 0
    counts[str] += 1
  })
  console.log(counts)
  // sort by freq
  doc.list.sort((a, b) => {
    let left = counts[a.text(options)]
    let right = counts[b.text(options)]
    if (left < right) {
      return 1
    }
    if (left > right) {
      return -1
    }
    return 0
  })
  return doc
}

//aliases
methods.alphabetical = methods.alpha
methods.wordcount = methods.wordCount
methods.chronological = methods.chron
methods.index = methods.chron

/** re-arrange the order of the matches (in place) */
exports.sort = function(input) {
  input = input || 'alpha'
  input = methods[input] || input
  //do this one up-front
  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this)
  }
  // apply sort method on each phrase
  if (typeof input === 'function') {
    this.list = this.list.sort(input)
    return this
  }
  return this
}

/** reverse the order of the matches, but not the words */
exports.reverse = function() {
  let list = [].concat(this.list)
  list = list.reverse()
  return this.buildFrom(list)
}

/** remove any duplicate matches */
exports.unique = function() {
  let list = [].concat(this.list)
  let obj = {}
  list = list.filter(p => {
    let str = p.text('reduced').trim()
    if (obj.hasOwnProperty(str) === true) {
      return false
    }
    obj[str] = true
    return true
  })
  return this.buildFrom(list)
}
