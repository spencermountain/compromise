import keepClass from '../_lib.js'
import isQuestion from './questions.js'
import parse from './parse/index.js'
import toPast from './conjugate/toPast.js'
import toPresent from './conjugate/toPresent.js'
import toFuture from './conjugate/toFuture.js'
import { toNegative, toPositive } from './conjugate/toNegative.js'
import toInfinitive from './conjugate/toInfinitive.js'

const api = function (View) {
  class Sentences extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Sentences'
    }
    json(opts = {}) {
      return this.map(m => {
        const json = m.toView().json(opts)[0] || {}
        const { subj, verb, pred, grammar } = parse(m)
        json.sentence = {
          subject: subj.text('normal'),
          verb: verb.text('normal'),
          predicate: pred.text('normal'),
          grammar
        }
        return json
      }, [])
    }
    isQuestion(n) {
      return this.questions(n)
    }
    isExclamation(n) {
      const res = this.filter(s => s.lastTerm().has('@hasExclamation'))
      return res.getNth(n)
    }
    isStatement(n) {
      const res = this.filter(s => !s.isExclamation().found && !s.isQuestion().found)
      return res.getNth(n)
    }
  }
  keepClass(Sentences)
  // parse each sentence, then convert it
  const each = fn => function (n) {
    return this.getNth(n).map(s => fn(s, parse(s)))
  }
  Object.assign(Sentences.prototype, {
    toPastTense: each(toPast),
    toPresentTense: each(toPresent),
    toFutureTense: each(toFuture),
    toInfinitive: each(toInfinitive),
    toNegative: each(toNegative),
    toPositive: each(toPositive),
  })
  // aliases
  Sentences.prototype.toPresent = Sentences.prototype.toPresentTense
  Sentences.prototype.toPast = Sentences.prototype.toPastTense
  Sentences.prototype.toFuture = Sentences.prototype.toFutureTense

  const methods = {
    sentences: function (n) {
      let m = this.map(s => s.fullSentence())
      m = m.getNth(n)
      return new Sentences(this.document, m.pointer)
    },
    questions: function (n) {
      const m = isQuestion(this)
      return m.getNth(n)
    },
  }

  Object.assign(View.prototype, methods)
}
export default api
