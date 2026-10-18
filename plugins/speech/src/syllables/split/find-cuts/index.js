import checkExceptions from './00-exceptions.js'
import vowelSpan from './01-vowel-span.js'
import pickBoundaries from './02-boundaries.js'

const findCuts = str => {
  // Exact exceptions and their plural forms take priority over spelling rules.
  const found = checkExceptions(str)
  if (found !== null) {
    return found
  }
  // Keep apostrophe suffixes intact so vowel rules can recognize an extra syllable.
  const vowelSpans = vowelSpan(str)
  const cuts = pickBoundaries(str, vowelSpans)
  // An exception may supply base-word cuts without overriding a syllabic suffix.
  const key = str.replace(/['’](?:s|d|ll|re|ve)$/, '')
  // Without a suffix, the initial lookup already checked this word.
  if (key === str) {
    return cuts
  }
  const baseCuts = checkExceptions(key)
  if (baseCuts !== null) {
    return baseCuts.concat(cuts.filter(cut => cut >= key.length))
  }
  return cuts
}

export default findCuts
