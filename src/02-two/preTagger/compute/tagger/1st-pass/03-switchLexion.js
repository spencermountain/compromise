import fastTag from '../_fastTag.js'

// use the fallback tag for each of the 'switch' lexicon words
const switchLexicon = function (terms, i, model) {
  const { switchers } = model.two
  const keys = Object.keys(switchers)
  // every list of words
  for (let k = 0; k < keys.length; k += 1) {
    const { words, fallback } = switchers[keys[k]]
    if (words.hasOwnProperty(terms[i].normal)) {
      fastTag(terms[i], fallback, '1-switchLex-' + keys[k])
      return true
    }
  }
  return null
}
export default switchLexicon
