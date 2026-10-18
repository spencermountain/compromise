import exceptions from './00-exceptions.js'
import vowelSpan from './01-vowel-span.js'
import pickBoundaries from './02-boundaries.js'

const findCuts = str => {
  // listed-out tricky ones
  if (Object.hasOwn(exceptions, str)) {
    return exceptions[str]
  }
  // Keep apostrophe suffixes intact so vowel rules can recognize an extra syllable.
  const vowelSpans = vowelSpan(str)
  const cuts = pickBoundaries(str, vowelSpans)
  // An exception may supply base-word cuts without overriding a syllabic suffix.
  const key = str.replace(/['’](?:s|d|ll|re|ve)$/, '')
  if (Object.hasOwn(exceptions, key)) {
    return exceptions[key].concat(cuts.filter(cut => cut >= key.length))
  }
  return cuts
}

export default findCuts
