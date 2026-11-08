import fastTag from '../_fastTag.js'
import fillTag from './_fillTags.js'

// a hint from the neighbouring word
const lookAtWord = (term, words) => {
  if (term && Object.hasOwn(words, term.normal)) {
    return words[term.normal]
  }
  return null
}

// a hint from the neighbouring word's tags - first match wins
const lookAtTag = (term, tags) => {
  if (!term) {
    return null
  }
  const found = Object.keys(tags).find(tag => term.tags.has(tag))
  if (found) {
    return tags[found]
  }
  return null
}

// look at neighbours for hints on unknown words
const neighbours = function (terms, i, model) {
  const { leftTags, leftWords, rightWords, rightTags } = model.two.neighbours
  const term = terms[i]
  if (term.tags.size === 0) {
    let tag = null
    // look left <-
    tag ||= lookAtWord(terms[i - 1], leftWords)
    // look right ->
    tag ||= lookAtWord(terms[i + 1], rightWords)
    // look left <-
    tag ||= lookAtTag(terms[i - 1], leftTags)
    // look right ->
    tag ||= lookAtTag(terms[i + 1], rightTags)
    if (tag) {
      fastTag(term, tag, '3-[neighbour]')
      fillTag(terms, i, model)
      terms[i].confidence = 0.2
      return true
    }
  }
  return null
}
export default neighbours
