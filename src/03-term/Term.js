const makeId = require('./_id')
const parseTerm = require('./parse')
const output = require('./out')
const tagAs = require('./tag/tag')
const unTag = require('./tag/untag')

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
  }
  /** return various metadata for this term */
  json(options = {}) {
    let out = {}
    let defaultOn = ['text', 'normal', 'tags']
    defaultOn.forEach(k => {
      if (options[k] !== false) {
        out[k] = this[k]
      }
    })
    let defaultOff = ['preText', 'postText']
    defaultOff.forEach(k => {
      if (options[k] === true) {
        out[k] = this[k]
      }
    })
    return out
  }
}

//  ¯\_(:/)_/¯
Term.prototype.clone = function() {
  let term = new Term(this.text)
  term.preText = this.preText
  term.postText = this.postText
  term.tags = this.tags.slice(0)
  return term
}
Term.prototype.out = output
Term.prototype.tag = tagAs
Term.prototype.unTag = unTag

const methods = [require('./easy')]
methods.forEach(obj => Object.assign(Term.prototype, obj))

module.exports = Term
