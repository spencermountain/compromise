import splitComma from '../_byComma.js'
import parseVerb from './parseVerb.js'

const getWords = function (m) {
  return m.json({ normal: true }).map(s => s.normal)
}

const toJSON = function (vb) {
  let parsed = parseVerb(vb)
  return {
    adverbs: getWords(parsed.adverbs),
    main: parsed.main.text('normal'),
    negative: parsed.negative.found,
    auxiliary: getWords(parsed.auxiliary),
    copula: parsed.copula.found,
    form: parsed.form,
    tense: parsed.tense,
    isPhrasal: parsed.phrasal.found,
    infinitive: parsed.infinitive,
  }
}

const findVerbs = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    json(opts = {}) {
      return this.map(vb => {
        let json = vb.json()
        if (opts && opts.verb !== false) {
          json.verb = toJSON(vb)
        }
        return json
      })
    }
  }

  View.prototype.verbs = function (n) {
    this.compute('chunks')
    let m = this.match('{Verb}')
    // m = splitComma(m)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Verbs(this.document, m.pointer)
  }
}
export default findVerbs
