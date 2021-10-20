// these methods are called with '@hasComma' in the match syntax
// various unicode quotation-mark formats
const startQuote = /(\u0022|\uFF02|\u0027|\u201C|\u2018|\u201F|\u201B|\u201E|\u2E42|\u201A|\u00AB|\u2039|\u2035|\u2036|\u2037|\u301D|\u0060|\u301F)/
const endQuote = /(\u0022|\uFF02|\u0027|\u201D|\u2019|\u201D|\u2019|\u201D|\u201D|\u2019|\u00BB|\u203A|\u2032|\u2033|\u2034|\u301E|\u00B4|\u301E)/

/** search the term's 'post' punctuation  */
exports.hasPost = function (punct) {
  return this.post.indexOf(punct) !== -1
}
/** search the term's 'pre' punctuation  */
exports.hasPre = function (punct) {
  return this.pre.indexOf(punct) !== -1
}

/** does it have a quotation symbol?  */
exports.hasQuote = function () {
  return startQuote.test(this.pre) || endQuote.test(this.post)
}
exports.hasQuotation = exports.hasQuote

/** does it have a comma?  */
exports.hasComma = function () {
  return this.hasPost(',')
}

/** does it end in a period? */
exports.hasPeriod = function () {
  return this.hasPost('.') === true && this.hasPost('...') === false
}

/** does it end in an exclamation */
exports.hasExclamation = function () {
  return this.hasPost('!')
}

/** does it end with a question mark? */
exports.hasQuestionMark = function () {
  return this.hasPost('?') || this.hasPost('¿')
}

/** is there a ... at the end? */
exports.hasEllipses = function () {
  return this.hasPost('..') || this.hasPost('…') || this.hasPre('..') || this.hasPre('…')
}

/** is there a semicolon after this word? */
exports.hasSemicolon = function () {
  return this.hasPost(';')
}

/** is there a slash '/' in this word? */
exports.hasSlash = function () {
  return /\//.test(this.text)
}

/** a hyphen connects two words like-this */
exports.hasHyphen = function () {
  const hyphen = /^(-|–|—)$/
  return hyphen.test(this.post) || hyphen.test(this.pre)
}
/** a dash separates words - like that */
exports.hasDash = function () {
  const hyphen = / (-|–|—) /
  return hyphen.test(this.post) || hyphen.test(this.pre)
}

/** is it multiple words combinded */
exports.hasContraction = function () {
  return Boolean(this.implicit)
}

/** try to sensibly put this punctuation mark into the term */
exports.addPunctuation = function (punct) {
  // dont add doubles
  if (punct === ',' || punct === ';') {
    this.post = this.post.replace(punct, '')
  }
  this.post = punct + this.post
  return this
}
