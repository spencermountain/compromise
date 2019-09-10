const methods = {
  /** alphabetical order */
  alpha: (a, b) => {
    let one = a
      .text('normal')
      .trim()
      .toLowerCase()
    let two = b
      .text('normal')
      .trim()
      .toLowerCase()
    if (one < two) {
      return -1
    }
    if (one > two) {
      return 1
    }
    return 0
  },

  /** count occurences of this text */
  freq: (a, b) => {
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

  /** 'chronological', or original given document order */
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

  /** */
  length: (a, b) => {
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

  /** */
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
//aliases
methods.alphabetical = methods.alpha
methods.wordcount = methods.wordCount

/** re-arrange the order of the matches (in place) */
exports.sort = function(input) {
  input = input || 'alpha'
  input = methods[input] || input

  if (typeof input === 'function') {
    this.list = this.list.sort(input)
    return this
  }
  return this
}
