import isQuestion from './questions.js'
import parse from './parse/index.js'
import toPast from './conjugate/toPast.js'
import toPresent from './conjugate/toPresent.js'
import toFuture from './conjugate/toFuture.js'
import { toNegative, toPositive } from './conjugate/toNegative.js'
import toInfinitive from './conjugate/toInfinitive.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Sentences extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentences'
    }
    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        let { subj, verb, pred } = parse(m)
        json.sentence = {
          subject: subj.text('normal'),
          verb: verb.text('normal'),
          predicate: pred.text('normal'),
        }
        return json
      }, [])
    }
    toPastTense(n) {
      return getNth(this, n).map(s => {
        let parsed = parse(s)
        return toPast(s, parsed)
      })
    }
    toPresentTense(n) {
      return getNth(this, n).map(s => {
        let parsed = parse(s)
        return toPresent(s, parsed)
      })
    }
    toFutureTense(n) {
      return getNth(this, n).map(s => {
        let parsed = parse(s)
        s = toFuture(s, parsed)
        return s
      })
    }
    toInfinitive(n) {
      return getNth(this, n).map(s => {
        let parsed = parse(s)
        return toInfinitive(s, parsed)
      })
    }
    toNegative(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toNegative(vb, parsed)
      })
    }
    toPositive(n) {
      return getNth(this, n).map(vb => {
        let parsed = parse(vb)
        return toPositive(vb, parsed)
      })
    }
    isQuestion(n) {
      return this.questions(n)
    }
    isExclamation(n) {
      let res = this.filter(s => s.lastTerm().has('@hasExclamation'))
      return getNth(res, n)
    }
    isStatement(n) {
      let res = this.filter(s => !s.isExclamation().found && !s.isQuestion().found)
      return getNth(res, n)
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
      let m = isQuestion(this)
      return getNth(m, n)
    },
  }

  Object.assign(View.prototype, methods)
}
export default api
