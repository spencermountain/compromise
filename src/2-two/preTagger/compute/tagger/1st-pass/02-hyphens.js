import { setTag } from '../_lib.js'
import { hasAny } from '../../../../_lib.js'
import { Pron, Mod, Vb, Inf, Val, Phrasal, Past, Cop, Det, Adj, Hyphenated, Prefix, NounVerb } from '../../../tagSet/_lib.js'
const reason = '3-hyphen-prefix'
const byHyphen = (terms, i, model, world) => {
  const term = terms[i]
  if (term.post === '-' && terms[i + 1]) {
    setTag([term, terms[i + 1]], Hyphenated, world, '1-punct-hyphen')
  }
  // Resolve the pair after both terms have passed through their switches.
  const prev = terms[i - 1]
  if (!prev || prev.post !== '-') {
    return
  }
  const before = terms[i - 2]
  // we under-estimate costs: the prefix does not make an adjective.
  if (/^(under|over|out|re|mis)$/.test(prev.normal) && term.switch === NounVerb &&
    before && hasAny(before, Pron, Mod)) {
    setTag([prev], Prefix, world, reason)
    setTag([prev], Vb, world, reason)
    setTag([term], Inf, world, reason)
    return
  }
  const offWhite = prev.normal === 'off' && term.normal === 'white'
  const numberFold = prev.tags.has(Val) && term.normal === 'fold'
  // Leave thank-you compounds available to the later noun-object rules.
  const verbCompound = prev.tags.has(Inf) && !prev.tags.has(Phrasal) && !hasAny(term, Phrasal, Pron)
  const nounParticiple = prev.switch === NounVerb && term.tags.has(Past) && before && hasAny(before, Cop, Det)
  if (offWhite || numberFold || verbCompound || nounParticiple) {
    setTag([prev, term], Adj, world, '3-hyphen-adjective')
  }
}
export default byHyphen
