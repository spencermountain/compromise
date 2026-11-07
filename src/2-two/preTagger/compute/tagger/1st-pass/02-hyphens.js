import { Pron, Mod, Vb, Inf, Val, Phrasal, Past, Cop, Det, Adj } from '../../../tagSet/_lib.js'
const byHyphen = (terms, i, model, world) => {
  const { setTag } = world.methods.one
  const term = terms[i]
  if (term.post === '-' && terms[i + 1]) {
    setTag([term, terms[i + 1]], 'Hyphenated', world, null, '1-punct-hyphen')
  }
  // Resolve the pair after both terms have passed through their switches.
  const prev = terms[i - 1]
  if (!prev || prev.post !== '-') {
    return
  }
  const before = terms[i - 2]
  // we under-estimate costs: the prefix does not make an adjective.
  if (/^(under|over|out|re|mis)$/.test(prev.normal) && term.switch === 'Noun|Verb' &&
    (before?.tags.has(Pron) || before?.tags.has(Mod))) {
    setTag([prev], 'Prefix', world, null, '3-hyphen-prefix')
    setTag([prev], Vb, world, null, '3-hyphen-prefix')
    setTag([term], Inf, world, null, '3-hyphen-prefix')
    return
  }
  const offWhite = prev.normal === 'off' && term.normal === 'white'
  const numberFold = prev.tags.has(Val) && term.normal === 'fold'
  // Leave thank-you compounds available to the later noun-object rules.
  const verbCompound = prev.tags.has(Inf) &&
    !prev.tags.has(Phrasal) && !term.tags.has(Phrasal) && !term.tags.has(Pron)
  const nounParticiple = prev.switch === 'Noun|Verb' && term.tags.has(Past) &&
    (before?.tags.has(Cop) || before?.tags.has(Det))
  if (offWhite || numberFold || verbCompound || nounParticiple) {
    setTag([prev, term], Adj, world, null, '3-hyphen-adjective')
  }
}
export default byHyphen
