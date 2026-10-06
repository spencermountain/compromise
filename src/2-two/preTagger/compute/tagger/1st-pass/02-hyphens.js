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
  const offWhite = prev.normal === 'off' && term.normal === 'white'
  const numberFold = prev.tags.has('Value') && term.normal === 'fold'
  // Leave thank-you compounds available to the later noun-object rules.
  const verbCompound = prev.tags.has('Infinitive') &&
    !prev.tags.has('PhrasalVerb') && !term.tags.has('PhrasalVerb') && !term.tags.has('Pronoun')
  if (offWhite || numberFold || verbCompound) {
    setTag([prev, term], 'Adjective', world, null, '3-hyphen-adjective')
  }
}
export default byHyphen
