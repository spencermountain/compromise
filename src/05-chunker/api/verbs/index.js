import parseVerb from './parseVerb.js'
import find from './find.js'

const toArray = function (m) {
  return m.json({ normal: true, terms: false, text: false }).map(s => s.normal)
}

const toJSON = function (vb) {
  let parsed = parseVerb(vb)
  let form = parsed.form
  delete form.match
  form = Object.assign(form, {
    phrasal: parsed.phrasal.found,
    copula: parsed.copula.found,
    // auxiliary: parsed.auxiliary.found,
  })
  return {
    adverbs: toArray(parsed.adverbs),
    main: parsed.main.text('machine'),
    negative: parsed.negative.found,
    auxiliary: parsed.auxiliary.text('machine'),
    infinitive: parsed.infinitive,
    form: form,
  }
}

const findVerbs = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    json() {
      return this.map(vb => {
        let json = vb.json()[0]
        json.verb = toJSON(vb)
        return json
      })
    }
  }

  View.prototype.verbs = function (n) {
    this.compute('chunks')
    let vb = find(this)
    // m = splitComma(m)
    if (typeof n === 'number') {
      vb = vb.get(n)
    }
    return new Verbs(this.document, vb.pointer)
  }
}
export default findVerbs
