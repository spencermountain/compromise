import parseVerb from './parse/index.js'
import getGrammar from './parse/grammar/index.js'
import { infinitive } from './conjugate/inflect.js'
import { toArray } from '../../_lib.js'

const toJSON = function (vb) {
  const parsed = parseVerb(vb)
  vb = vb.clone().toView()
  const info = getGrammar(vb, parsed)
  return {
    root: parsed.root.text(),
    preAdverbs: toArray(parsed.adverbs.pre),
    postAdverbs: toArray(parsed.adverbs.post),
    auxiliary: parsed.auxiliary.text('normal'),
    negative: parsed.negative.found,
    prefix: parsed.prefix.text('normal'),
    infinitive: infinitive(parsed.root),
    grammar: info,
  }
}
export default toJSON
