import questions from './questions.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Sentences extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentences'
    }
    toPastTense() {
      return this
    }
    toPresentTense() {
      return this
    }
    toFutureTense() {
      return this
    }
    // overloaded - keep Sentences class
    update(pointer) {
      let m = new Sentences(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }

  const methods = {
    sentences: function (n) {
      let m = this.map(s => s.fullSentence())
      m = getNth(m, n)
      return new Sentences(this.document, m.pointer)
    },
    questions: function (n) {
      let m = questions(this)
      return getNth(m, n)
    },
  }

  Object.assign(View.prototype, methods)
}
export default api
