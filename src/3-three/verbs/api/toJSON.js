import parseVerb from './parse/index.js'
import getGrammar from './parse/grammar/index.js'
import { getTense } from './lib.js'

const toArray = function (m) {
  if (!m || !m.isView) {
    return []
  }
  const opts = { normal: true, terms: false, text: false }
  return m.json(opts).map(s => s.normal)
}

const toText = function (m) {
  if (!m || !m.isView) {
    return ''
  }
  return m.text('normal')
}

const toInfinitive = function (root) {
  const { verbToInfinitive } = root.methods.two.transform
  let str = root.text('normal')
  return verbToInfinitive(str, root.model, getTense(root))
}

const toJSON = function (vb) {
  vb = vb.clone().toView()
  let parsed = parseVerb(vb)
  const info = getGrammar(vb, parsed)
  return {
    root: parsed.root.text(),
    preAdverbs: toArray(parsed.adverbs.pre),
    postAdverbs: toArray(parsed.adverbs.post),
    auxiliary: toText(parsed.auxiliary),
    negative: parsed.negative.found,
    prefix: toText(parsed.prefix),
    infinitive: toInfinitive(parsed.root),
    grammar: info,
  }
}
export default toJSON
