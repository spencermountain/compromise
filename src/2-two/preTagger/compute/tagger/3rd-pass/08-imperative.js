import { Adj, Inf, Phrasal, NN, Det, Vb } from '../../../tagSet/_lib.js'
const beside = {
  there: true, //go there
  this: true, //try this
  it: true, //do it
  him: true,
  her: true,
  us: true, //tell us
}

// go [fast]
const howWords = new Set(['hard', 'high', 'fast', 'slow'])
// not: go so, run enough
const notHow = new Set(['so', 'such', 'rather', 'enough'])

// '[place] tea bags in hot water'
const imperative = function (terms, world) {
  const setTag = world.methods.one.setTag
  const t = terms[0]
  const next = terms[1]
  // '[go] quickly', '[run] fast' - a bare verb and how to do it
  if (terms.length === 2 && t.tags.has('Infinitive') && !t.tags.has('Hyphenated') && !notHow.has(next.normal)) {
    if (next.tags.has('Adjective') || next.tags.has('Adverb') || howWords.has(next.normal)) {
      setTag([t], 'Imperative', world, null, '3-[imperative]')
      return
    }
  }
  // "Go to Toronto", "keep it quiet".
  const goTo = t.normal === 'go' && next?.normal === 'to' && terms.length >= 3
  const keepIt = t.normal === 'keep' && next?.normal === 'it' && terms[2]?.tags.has(Adj)
  if (goTo || keepIt) {
    setTag([t], 'Imperative', world, null, '3-[imperative]')
    return
  }
  const multiWords = world.model.one._multiCache || {}
  const isRight = t.switch === 'Noun|Verb' || t.tags.has(Inf)
  if (isRight && terms.length >= 2) {
    // ensure rest of sentence is ok
    if (terms.length < 4 && !beside[terms[1].normal]) {
      return
    }
    // avoid multi-noun words like '[board] room'
    if (!t.tags.has(Phrasal) && Object.hasOwn(multiWords, t.normal)) {
      return
    }
    // is the next word a noun? - 'compile information ..'
    const nextNoun = terms[1].tags.has(NN) || terms[1].tags.has(Det)
    if (nextNoun) {
      // ensure no soon-verb -  'waste materials are ..'
      const soonVerb = terms.slice(1, 3).some(term => term.tags.has(Vb))
      if (!soonVerb || t.tags.has('#PhrV')) {
        setTag([t], 'Imperative', world, null, '3-[imperative]')
      }
    }
  }
}
export default imperative
