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
