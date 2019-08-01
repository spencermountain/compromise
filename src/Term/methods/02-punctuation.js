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
