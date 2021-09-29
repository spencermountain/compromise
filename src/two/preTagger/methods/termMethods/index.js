// these methods are called with '@hasComma' in the match syntax
// various unicode quotation-mark formats
const startQuote =
  /([\u0022\uFF02\u0027\u201C\u2018\u201F\u201B\u201E\u2E42\u201A\u00AB\u2039\u2035\u2036\u2037\u301D\u0060\u301F])/
const endQuote = /([\u0022\uFF02\u0027\u201D\u2019\u00BB\u203A\u2032\u2033\u2034\u301E\u00B4])/

let methods = {}
/** search the term's 'post' punctuation  */
const hasPost = function (term, punct) {
  return term.post.indexOf(punct) !== -1
}
/** search the term's 'pre' punctuation  */
const hasPre = function (term, punct) {
  return term.pre.indexOf(punct) !== -1
}
/** does it have a quotation symbol?  */
methods.hasQuote = function (term) {
  return startQuote.test(term.pre) || endQuote.test(term.post)
}
methods.hasQuotation = methods.hasQuote

/** does it have a comma?  */
methods.hasComma = function (term) {
  return hasPost(term, ',')
}

/** does it end in a period? */
methods.hasPeriod = function (term) {
  return hasPost(term, '.') === true && hasPost(term, '...') === false
}

/** does it end in an exclamation */
methods.hasExclamation = function (term) {
  return hasPost(term, '!')
}

/** does it end with a question mark? */
methods.hasQuestionMark = function (term) {
  return hasPost(term, '?') || hasPost(term, '¿')
}

/** is there a ... at the end? */
methods.hasEllipses = function (term) {
  return hasPost(term, '..') || hasPost(term, '…') || hasPre(term, '..') || hasPre(term, '…')
}

/** is there a semicolon after term word? */
methods.hasSemicolon = function (term) {
  return hasPost(term, ';')
}

/** is there a slash '/' in term word? */
methods.hasSlash = function (term) {
  return /\//.test(term.text)
}

/** a hyphen connects two words like-term */
methods.hasHyphen = function (term) {
  const hyphen = /^[-–—]$/
  return hyphen.test(term.post) || hyphen.test(term.pre)
}
/** a dash separates words - like that */
methods.hasDash = function (term) {
  const hyphen = / [-–—] /
  return hyphen.test(term.post) || hyphen.test(term.pre)
}

/** is it multiple words combinded */
methods.hasContraction = function (term) {
  return Boolean(term.implicit)
}

/** is it an acronym */
methods.isAcronym = function (term) {
  return term.tags.has('Acronym')
}
methods.isKnown = function (term) {
  return term.tags.size > 0
}
methods.isTitleCase = function (term) {
  return /^[A-Z][a-z'\u00C0-\u00FF]/.test(term.text) //|| /^[A-Z]$/.test(term.text)
}

export default methods
