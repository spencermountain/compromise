//these are selections that don't require their own subclasses/methods

/** split-up results by each term */
exports.terms = function(n) {
  let r = this.match('.')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
// exports.term = exports.terms

/** split-up results into multi-term phrases */
exports.clauses = function(n) {
  let r = this.splitAfter('#ClauseEnd')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
/** return anything tagged as a hashtag*/
exports.hashTags = function(n) {
  let r = this.match('#HashTag').terms()
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
/** return anything tagged as an organization*/
exports.organizations = function(n) {
  let r = this.splitAfter('#Comma')
  r = r.match('#Organization+')
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
/** return anything tagged as a Place*/
exports.places = function(n) {
  let r = this.splitAfter('#Comma')
  r = r.match('#Place+')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}

/** return anything tagged as a URL*/
exports.urls = function(n) {
  let r = this.match('#Url')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}
/** return anything inside parentheses */
exports.parentheses = function(n) {
  let r = this.match('#Parentheses+')
  //split-up consecutive ones
  r = r.splitAfter('#EndBracket')
  if (typeof n === 'number') {
    r = r.get(n)
  }
  return r
}

/** return any sentences that ask a question */
exports.questions = function(doc) {
  let list = doc.sentences().list.filter(p => {
    return p.lastTerm().hasQuestionMark()
  })
  return doc.buildFrom(list)
}

/** return any sentences that are not a question */
exports.statements = function(doc) {
  let list = doc.sentences().list.filter(p => {
    return p.lastTerm().hasQuestionMark() === false
  })
  return doc.buildFrom(list)
}
