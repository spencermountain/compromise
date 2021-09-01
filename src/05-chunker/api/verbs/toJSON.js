import parseVerb from './parse/index.js'

const toArray = function (m) {
  if (!m || m.isView !== true) {
    return []
  }
  return m.json({ normal: true, terms: false, text: false }).map(s => s.normal)
}

const toJSON = function (vb) {
  let parsed = parseVerb(vb)
  let json = {
    root: parsed.root.text(),
    preAdverbs: toArray(parsed.adverbs.pre),
    postAdverbs: toArray(parsed.adverbs.post),
    auxiliary: parsed.auxiliary.text(),
    infinitive: parsed.infinitive,
    grammar: parsed.grammar,
  }
  // delete details.match
  // details = Object.assign(details, {
  //   phrasal: parsed.phrasal.found,
  //   copula: parsed.copula.found,
  //   // auxiliary: parsed.auxiliary.found,
  // })
  return json
  // return {
  //   adverbs: toArray(parsed.adverbs),
  //   main: parsed.main.text('machine'),
  //   negative: parsed.negative.found,
  //   auxiliary: parsed.auxiliary.text('machine'),
  //   infinitive: parsed.infinitive,
  //   form: details,
  // }
}
export default toJSON
