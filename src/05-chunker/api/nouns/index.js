import splitComma from '../_byComma.js'

const findNouns = function (View) {
  class Nouns extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }
  }

  View.prototype.nouns = function (n) {
    this.compute('chunks')
    let m = this.match('{Noun}')
    // m = splitComma(m)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Nouns(this.document, m.pointer)
  }
}
export default findNouns
