const titleCase = /^[A-Z][a-z'\u00C0-\u00FF]/

/** convert all text to uppercase */
exports.toUpperCase = function(world) {
  this.text = this.text.toUpperCase()
  this.tag('#UpperCase', 'toUpperCase', world)
  return this
}

/** convert all text to lowercase */
exports.toLowerCase = function(world) {
  this.text = this.text.toLowerCase()
  this.unTag('#TitleCase', world)
  this.unTag('#UpperCase', world)
  return this
}

/** only set the first letter to uppercase
 * leave any existing uppercase alone
 */
exports.toTitleCase = function(world) {
  this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //support unicode?
  this.tag('#TitleCase', 'toTitleCase', world)
  return this
}

/** if the first letter is uppercase, and the rest are lowercase */
exports.isTitleCase = function() {
  return titleCase.test(this.text)
}
