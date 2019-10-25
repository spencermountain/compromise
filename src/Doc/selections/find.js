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
  let r = this.splitAfter('#Comma')
  r = r.match('#PhoneNumber+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
// /** return anything inside parentheses */
// exports.parentheses = function(n) {
//   let r = this.match('#Parentheses+')
//   //split-up consecutive ones
//   r = r.splitAfter('#EndBracket')
//   if (typeof n === 'number') {
//     r = r.get(n)
//   }
//   return r
// }
/** return anything tagged as an organization*/
exports.organizations = function(n) {
  let r = this.splitAfter('#Comma')
  r = r.match('#Organization+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}

/** return anything tagged as a Place*/
exports.places = function(n) {
  let r = this.splitAfter('#Comma')
  r = r.match('#Place+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}

/** return any sentences that ask a question */
// exports.questions = function(doc) {
//   return doc.sentences().isQuestion()
// }

// /** return any sentences that are not a question or exclamation*/
// exports.statements = function(doc) {
//   return doc.sentences().isStatement()
// }
/** return any sentences that are not a question */
// exports.exclamations = function(doc) {
//   return doc.sentences().isExclamation()
// }
