const makeId = require('./_id')
const parseTerm = require('./parse')
const methods = require('./methods')
const tagMethods = require('./tag')

class Term {
  constructor(text = '') {
    text = String(text)
    let obj = parseTerm(text)
    this.text = obj.text || ''
    this.normal = obj.normal || ''
    this.implicit = obj.implicit || null
    this.preText = obj.preText || ''
    this.postText = obj.postText || ''
    this.raw = text.trim()
    this.tags = {}
    this.prev = null
    this.next = null
    this.id = makeId(this.normal)
    this.isA = 'Term' // easier than .constructor...
  }
}

/** create a deep-copy of this term */
Term.prototype.clone = function() {
  let term = new Term(this.text)
  term.preText = this.preText
  term.postText = this.postText
  term.tags = Object.assign({}, term.tags)
  return term
}

Object.assign(Term.prototype, methods)
Object.assign(Term.prototype, tagMethods)

module.exports = Term
