// '[place] tea bags in hot water'
const imperative = function (terms, world) {
  const setTag = world.methods.one.setTag
  const multiWords = world.model.one._multiCache || {}
  if (terms.length >= 4 && terms[0].switch === 'Noun|Verb') {
    // avoid multi-noun words like '[board] room'
    if (multiWords.hasOwnProperty(terms[0].normal)) {
      return
    }
    // is the next word a noun? - 'compile information ..'
    let nextNoun = terms[1].tags.has('Noun')
    if (nextNoun) {
      // ensure no soon-verb -  'waste materials are ..'
      let soonVerb = terms.slice(0, 3).some(t => t.tags.has('Verb'))
      if (!soonVerb) {
        setTag([terms[0]], 'Imperative', world, null, '3-[imperative]')
      }
    }
  }
}
export default imperative