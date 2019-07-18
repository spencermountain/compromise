/** does it have a comma?  */
exports.hasComma = function() {
  return this.postText.includes(',')
}

/** does it end in a period? */
exports.hasPeriod = function() {
  return this.postText.includes('.') === true && this.postText.includes('...') === false
}

/** does it end in an exclamation */
exports.hasExclamation = function() {
  return this.postText.includes('!')
}

/** does it end with a question mark? */
exports.hasQuestionMark = function() {
  return this.postText.includes('?') || this.postText.includes('¿')
}

/** is there a ... at the end? */
exports.hasElipses = function() {
  return this.postText.includes('..') || this.postText.includes('…')
}

/** is there a semicolon after this word? */
exports.hasSemicolon = function() {
  return this.postText.includes(';')
}

/** clopper any atypical whitespace */
exports.normalizeWhitespace = function() {
  let punct = this.punctuation() || ''
  this.preText = ' '
  this.postText = punct
  return this
}

/** return any expected forms of trailing punctuation */
exports.punctuation = function() {
  let str = this.postText.trim()
  let m = str.match(/[\.,\?\!]/)
  if (m !== null) {
    return m[0]
  }
  return null
}
