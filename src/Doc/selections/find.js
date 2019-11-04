//these are selections that don't require their own subclasses/methods

/** split-up results by each term */
exports.terms = function(n) {
  let r = this.match('.')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
exports.words = exports.terms

/** all terms connected with a hyphen or dash */
exports.hyphenated = function(n) {
  let r = this.match('@hasHyphen .').debug()
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
/** return anything tagged as a phone number */
exports.phoneNumbers = function(n) {
  let r = this.splitAfter('@hasComma')
  r = r.match('#PhoneNumber+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
