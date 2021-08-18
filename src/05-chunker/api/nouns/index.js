const findNouns = function (View) {
  class Nouns extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }
  }

  Nouns.prototype.nouns = function (n) {
    let m = this.match('#Verb+')
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Nouns(this.document, m.pointer)
  }
}
export default findNouns
