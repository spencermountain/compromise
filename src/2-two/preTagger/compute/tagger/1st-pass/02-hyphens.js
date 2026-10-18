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
    (before?.tags.has('Pronoun') || before?.tags.has('Modal'))) {
    setTag([prev], 'Prefix', world, null, '3-hyphen-prefix')
    setTag([prev], 'Verb', world, null, '3-hyphen-prefix')
    setTag([term], 'Infinitive', world, null, '3-hyphen-prefix')
    return
  }
  const offWhite = prev.normal === 'off' && term.normal === 'white'
  const numberFold = prev.tags.has('Value') && term.normal === 'fold'
  // Leave thank-you compounds available to the later noun-object rules.
  const verbCompound = prev.tags.has('Infinitive') &&
    !prev.tags.has('PhrasalVerb') && !term.tags.has('PhrasalVerb') && !term.tags.has('Pronoun')
  const nounParticiple = prev.switch === 'Noun|Verb' && term.tags.has('PastTense') &&
    (before?.tags.has('Copula') || before?.tags.has('Determiner'))
  if (offWhite || numberFold || verbCompound || nounParticiple) {
    setTag([prev, term], 'Adjective', world, null, '3-hyphen-adjective')
  }
}
export default byHyphen
