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
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Sentences(this.document, m.pointer)
  }
}
export default findVerbs
