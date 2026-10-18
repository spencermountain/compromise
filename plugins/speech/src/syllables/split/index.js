import splitWord from './split.js'

const syllables = text => {
  if (!text) {
    return []
  }
  // pull-apart word into identifiable segments, first
  const parts = text.split(/\s+/).filter(Boolean)
  // then split each segment into syllables
  return parts.flatMap(splitWord)
}

export default syllables
