/** does it have a comma?  */
exports.hasComma = function() {
  return this.post.includes(',')
}

/** does it end in a period? */
exports.hasPeriod = function() {
  return this.post.includes('.') === true && this.post.includes('...') === false
}

/** does it end in an exclamation */
exports.hasExclamation = function() {
  return this.post.includes('!')
}

/** does it end with a question mark? */
exports.hasQuestionMark = function() {
  return this.post.includes('?') || this.post.includes('¿')
}

/** is there a ... at the end? */
exports.hasElipses = function() {
  return this.post.includes('..') || this.post.includes('…')
}

/** is there a semicolon after this word? */
exports.hasSemicolon = function() {
  return this.post.includes(';')
}

/** is there a slash after this word? */
exports.hasSlash = function() {
  return this.post.includes('/')
}

/** is it multiple words combinded */
exports.hasContraction = function() {
  return Boolean(this.implicit)
}
