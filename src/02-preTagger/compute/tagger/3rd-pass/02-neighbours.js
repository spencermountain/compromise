import fastTag from '../_fastTag.js'
const msg = '3-neighbour-'

// look for hints on preceding word
const lookLeft = function (terms, i, leftTags, leftWords) {
  // -> look at the prev word
  let left = terms[i - 1]
  if (left) {
    // look at prev tag
    let seen = leftTags.find(a => left.tags.has(a[0]))
    if (seen) {
      fastTag(terms[i], seen[1], msg + 'prev-tag')
      return true
    }
    // look at prev word <-
    seen = leftWords.find(a => left.normal === a[0])
    if (seen) {
      fastTag(terms[i], seen[1], msg + `prev-word - '${left.normal}'`)
      return true
    }
  }
  return false
}

// look for hints on subsequent word
const lookRight = function (terms, i, rightTags, rightWords) {
  // look at the next word
  let right = terms[i + 1]
  if (right) {
    // look at next tag
    let seen = rightTags.find(a => right.tags.has(a[0]))
    if (seen) {
      fastTag(terms[i], seen[1], msg + 'next-tag')
      return true
    }
    // look at prev word <-
    seen = rightWords.find(a => right.normal === a[0])
    if (seen) {
      fastTag(terms[i], seen[1], msg + 'next-word')
      return true
    }
  }
  return false
}

// look at neighbours for hints on unknown words
const nounFallback = function (terms, model) {
  for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    const { leftTags, leftWords, rightWords, rightTags } = model.two.neighbours
    if (term.tags.size === 0) {
      // any hints, from neighbouring words?
      let found = false
      found = found || lookLeft(terms, i, leftTags, leftWords)
      found = found || lookRight(terms, i, rightTags, rightWords)
      //  ¯\_(ツ)_/¯
      // if (term.tags.size === 0 && found !== true) {
      //   fastTag(term, 'Noun', msg + 'fallback')
      // }
    }
  }
}
export default nounFallback
