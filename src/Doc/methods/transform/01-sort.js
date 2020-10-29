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
const byFreq = function (doc) {
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

// order results 'chronologically', or document-order
const sortSequential = function (doc) {
  let order = {}
  doc.json({ terms: { offset: true } }).forEach(o => {
    order[o.terms[0].id] = o.terms[0].offset.start
  })
  doc.list = doc.list.sort((a, b) => {
    if (order[a.start] > order[b.start]) {
      return 1
    } else if (order[a.start] < order[b.start]) {
      return -1
    }
    return 0
  })
  return doc
}

//aliases
methods.alphabetical = methods.alpha
methods.wordcount = methods.wordCount

// aliases for sequential ordering
const seqNames = {
  index: true,
  sequence: true,
  seq: true,
  sequential: true,
  chron: true,
  chronological: true,
}

/** re-arrange the order of the matches (in place) */
exports.sort = function (input) {
  input = input || 'alpha'
  //do this one up-front
  if (input === 'freq' || input === 'frequency' || input === 'topk') {
    return byFreq(this)
  }
  if (seqNames.hasOwnProperty(input)) {
    return sortSequential(this)
  }

  input = methods[input] || input
  // apply sort method on each phrase
  if (typeof input === 'function') {
    this.list = this.list.sort(input)
    return this
  }
  return this
}

/** reverse the order of the matches, but not the words */
exports.reverse = function () {
  let list = [].concat(this.list)
  list = list.reverse()
  return this.buildFrom(list)
}

/** remove any duplicate matches */
exports.unique = function () {
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
