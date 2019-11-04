const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/

/** convert all text to uppercase */
exports.toUpperCase = function() {
  this.text = this.text.toUpperCase()
  return this
}

/** convert all text to lowercase */
exports.toLowerCase = function() {
  this.text = this.text.toLowerCase()
  return this
}

/** only set the first letter to uppercase
 * leave any existing uppercase alone
 */
exports.toTitleCase = function() {
  this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //support unicode?
  return this
}

/** if the first letter is uppercase, and the rest are lowercase */
exports.isTitleCase = function() {
  return titleCase.test(this.text)
}
exports.titleCase = exports.isTitleCase
