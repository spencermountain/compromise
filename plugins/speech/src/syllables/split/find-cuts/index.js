import exceptions from './00-exceptions.js'
import vowelSpan from './01-vowel-span.js'
import pickBoundaries from './02-boundaries.js'

const findCuts = text => {
  // Rules use lowercase spelling; returned chunks are sliced from the original.
  let txt = text.toLowerCase()
  // for cutting purposes, suffixes are ignored
  txt = txt.replace(/["'.,]$/, '')
  txt = txt.replace(/'s$/, '')
  // listed-out tricky ones
  if (Object.hasOwn(exceptions, txt)) {
    return exceptions[txt]
  }
  // identify 'nuclei' of the words
  const vowelSpans = vowelSpan(txt)
  // make cuts based on vowel spans
  return pickBoundaries(txt, vowelSpans)
}

export default findCuts
