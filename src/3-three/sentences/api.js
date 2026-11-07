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
  keepClass(Sentences, 'Sentences')
  // parse each sentence, then convert it
  const each = fn => function (n) {
    return this.getNth(n).map(s => fn(s, parse(s)))
  }
  const toPastTense = each(toPast)
  const toPresentTense = each(toPresent)
  const toFutureTense = each(toFuture)
  Object.assign(Sentences.prototype, {
    toPastTense,
    toPresentTense,
    toFutureTense,
    toInfinitive: each(toInfinitive),
    toNegative: each(toNegative),
    toPositive: each(toPositive),
    // aliases
    toPresent: toPresentTense,
    toPast: toPastTense,
    toFuture: toFutureTense,
  })

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
