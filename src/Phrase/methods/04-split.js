const append = require('./_join/append')
const prepend = require('./_join/prepend')
const deletePhrase = require('./_join/delete')
// const tokenize = require('../../01-tokenizer')

/** put this text at the end */
exports.append = function(newPhrase, doc) {
  append(this, newPhrase, doc)
  return this
}

/** add this text to the beginning */
exports.prepend = function(newPhrase, doc) {
  prepend(this, newPhrase, doc)
  return this
}

exports.delete = function(doc) {
  deletePhrase(this, doc)
  return this
}

exports.replace = function(newPhrase, doc) {
  // console.log(tokenize.fromText)
  if (typeof newPhrase === 'string') {
    // console.log(build(newPhrase))
  }
  //add it do the end
  let firstLength = this.length
  append(this, newPhrase, doc)
  //delete original terms
  let tmp = this.buildFrom(this.start, this.length)
  tmp.length = firstLength
  deletePhrase(tmp, doc)
  return this
}

/**
 * Turn this phrase object into 3 phrase objects
 */
exports.splitOn = function(p) {
  let terms = this.terms()
  let result = {
    before: null,
    match: null,
    after: null,
  }
  let index = terms.findIndex(t => t.id === p.start)
  if (index === -1) {
    return result
  }
  //make all three sections into phrase-objects
  let start = terms.slice(0, index)
  if (start.length > 0) {
    result.before = this.buildFrom(start[0].id, start.length)
  }
  let match = terms.slice(index, index + p.length)
  if (match.length > 0) {
    result.match = this.buildFrom(match[0].id, match.length)
  }
  let end = terms.slice(index + p.length, terms.length)
  if (end.length > 0) {
    result.after = this.buildFrom(end[0].id, end.length, this.pool)
  }
  return result
}
