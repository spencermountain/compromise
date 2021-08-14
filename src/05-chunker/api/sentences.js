const chunker = function (View) {
  class Sentence extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentence'
      this.compute('chunks')
      this.chnks = []
    }
    verbs() {
      return this
    }
    nouns() {
      return this
    }
  }

  View.prototype.sentences = function () {
    return new Sentence(this.document, this.pointer, this.groups)
  }
}
export default chunker
