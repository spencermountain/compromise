// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const findVerbs = function (View) {
  class Sentences extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentences'
    }
  }

  View.prototype.sentences = function (n) {
    this.compute('chunks')
    let m = this.all()
    m = getNth(m, n)
    return new Sentences(this.document, m.pointer)
  }
}
export default findVerbs