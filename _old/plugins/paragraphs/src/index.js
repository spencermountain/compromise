const hasTwoNewline = /\n\n/
const wrapperMethods = require('./methods')

const addMethods = function(Doc) {
  /** an abstraction on top of Doc */
  class Paragraphs {
    constructor(paragraphs, parent, world) {
      Object.defineProperty(this, 'paragraphs', {
        enumerable: false,
        writable: true,
        value: paragraphs,
      })
      this.parent = parent
      this.world = world
      //'found' getter
      Object.defineProperty(this, 'found', {
        get: () => this.paragraphs.length > 0,
      })
      //'length' getter
      Object.defineProperty(this, 'length', {
        get: () => this.paragraphs.length,
      })
    }
  }
  // add our wrapper methods for Doc
  wrapperMethods(Paragraphs, Doc)

  // finder method creates the sentence groups
  Doc.prototype.paragraphs = function(n) {
    let match = this.all()
    let results = []
    let carry = []
    match.forEach(s => {
      carry.push(s)
      if (hasTwoNewline.test(s.post()[0])) {
        results.push(carry)
        carry = []
      }
    })
    if (carry.length > 0) {
      results.push(carry)
    }
    if (typeof n === 'number') {
      if (results[n]) {
        results = [results[n]]
      } else {
        results = []
      }
    }
    return new Paragraphs(results, this, this.world)
  }
}

module.exports = addMethods
