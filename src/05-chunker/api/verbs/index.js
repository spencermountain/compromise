import splitComma from '../_byComma.js'
import parseVerb from './parseVerb.js'

const findVerbs = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    json() {
      return this.map(vb => {
        return parseVerb(vb)
      })
    }
  }

  View.prototype.verbs = function (n) {
    this.compute('chunks')
    let m = this.match('{Verb}')
    // m = splitComma(m)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Verbs(this.document, m.pointer)
  }
}
export default findVerbs
