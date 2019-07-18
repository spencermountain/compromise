/** convert all text to uppercase */
exports.toUpperCase = function() {
  this.text = this.text.toUpperCase()
  this.tag('#UpperCase', 'toUpperCase')
  return this
}

/** convert all text to lowercase */
exports.toLowerCase = function() {
  this.text = this.text.toLowerCase()
  this.unTag('#TitleCase')
  this.unTag('#UpperCase')
  return this
}

/** only set the first letter to uppercase
 * leave any existing uppercase alone
 */
exports.toTitleCase = function() {
  this.text = this.text.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //support unicode?
  this.tag('#TitleCase', 'toTitleCase')
  return this
}
