// these methods are called with '@hasComma' in the match syntax

/** search the term's 'post' punctuation  */
exports.hasPost = function(punct) {
  return this.post.includes(punct)
}

/** does it have a comma?  */
exports.hasComma = function() {
  return this.hasPost(',')
}

/** does it end in a period? */
exports.hasPeriod = function() {
  return this.hasPost('.') === true && this.hasPost('...') === false
}

/** does it end in an exclamation */
exports.hasExclamation = function() {
  return this.hasPost('!')
}

/** does it end with a question mark? */
exports.hasQuestionMark = function() {
  return this.hasPost('?') || this.hasPost('¿')
}

/** is there a ... at the end? */
exports.hasEllipses = function() {
  return this.hasPost('..') || this.hasPost('…')
}

/** is there a semicolon after this word? */
exports.hasSemicolon = function() {
  return this.hasPost(';')
}

/** is there a slash after this word? */
exports.hasSlash = function() {
  return this.hasPost('/')
}

/** is it multiple words combinded */
exports.hasContraction = function() {
  return Boolean(this.implicit)
}

/** try to sensibly put this punctuation mark into the term */
exports.addPunctuation = function(punct) {
  // dont add doubles
  if (punct === ',' || punct === ';') {
    this.post = this.post.replace(punct, '')
  }
  this.post = punct + this.post
  return this
}
