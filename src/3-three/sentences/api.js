import questions from './questions.js'
import parse from './parse.js'
import toPast from './conjugate/toPast.js'
import toPresent from './conjugate/toPresent.js'
import toFuture from './conjugate/toFuture.js'
import toInfinitive from './conjugate/toInfinitive.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Sentences extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentences'
    }
    toPastTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toPast(vb, parsed)
      })
    }
    toPresentTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toPresent(vb, parsed)
      })
    }
    toFutureTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toFuture(vb, parsed)
      })
    }
    toInfinitive(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toInfinitive(vb, parsed)
      })
    }
    toNegative() {
      // return getNth(this, n).map(vb => {
      //   let parsed = parse(vb)
      //   return toInfinitive(vb, parsed)
      // })
      return this
    }
    // overloaded - keep Sentences class
    update(pointer) {
      let m = new Sentences(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }
  // aliases
  Sentences.prototype.toPresent = Sentences.prototype.toPresentTense
  Sentences.prototype.toPast = Sentences.prototype.toPastTense
  Sentences.prototype.toFuture = Sentences.prototype.toFutureTense

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
