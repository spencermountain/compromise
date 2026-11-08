import { setTag } from '../_lib.js'
import { hasAny, toSet } from '../../../../_lib.js'
import { Adj, Adv, Inf, Phrasal, NN, Det, Vb, Hyphenated, Imp, NounVerb } from '../../../tagSet/_lib.js'
// go there, try this, do it, tell us
const beside = toSet('there this it him her us')

// go [fast]
const howWords = toSet('hard high fast slow')
// not: go so, run enough
const notHow = toSet('so such rather enough')

const reason = '3-[imperative]'

// '[place] tea bags in hot water'
const imperative = function (terms, world) {
  const t = terms[0]
  const next = terms[1]
  // '[go] quickly', '[run] fast' - a bare verb and how to do it
  if (terms.length === 2 && t.tags.has(Inf) && !t.tags.has(Hyphenated) && !notHow.has(next.normal)) {
    if (hasAny(next, Adj, Adv) || howWords.has(next.normal)) {
      setTag([t], Imp, world, reason)
      return
    }
  }
  // "Go to Toronto", "keep it quiet".
  const goTo = t.normal === 'go' && next?.normal === 'to' && terms.length >= 3
  const keepIt = t.normal === 'keep' && next?.normal === 'it' && terms[2]?.tags.has(Adj)
  if (goTo || keepIt) {
    setTag([t], Imp, world, reason)
    return
  }
  const multiWords = world.model.one._multiCache || {}
  const isRight = t.switch === NounVerb || t.tags.has(Inf)
  if (isRight && terms.length >= 2) {
    // ensure rest of sentence is ok
    if (terms.length < 4 && !beside.has(terms[1].normal)) {
      return
    }
    // avoid multi-noun words like '[board] room'
    if (!t.tags.has(Phrasal) && Object.hasOwn(multiWords, t.normal)) {
      return
    }
    // is the next word a noun? - 'compile information ..'
    if (hasAny(terms[1], NN, Det)) {
      // ensure no soon-verb -  'waste materials are ..'
      const soonVerb = terms.slice(1, 3).some(term => term.tags.has(Vb))
      if (!soonVerb || t.tags.has('#PhrV')) {
        setTag([t], Imp, world, reason)
      }
    }
  }
}
export default imperative
