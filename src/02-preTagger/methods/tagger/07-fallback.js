import setTag from './_setTag.js'

// look for hints on preceding word
const lookLeft = function (terms, i, leftTags, leftWords) {
  // -> look at the prev word
  let left = terms[i - 1]
  if (left) {
    // look at prev tag
    let seen = leftTags.find(a => left.tags.has(a[0]))
    if (seen) {
      setTag(terms[i], seen[1], 'prev-tag')
    }
    // look at prev word <-
    seen = leftWords.find(a => left.normal === a[0])
    if (seen) {
      setTag(terms[i], seen[1], `prev-word - '${left.normal}'`)
    }
  }
}

// look for hints on subsequent word
const lookRight = function (terms, i, rightTags, rightWords) {
  // look at the next word
  let right = terms[i + 1]
  if (right) {
    // look at next tag
    let seen = rightTags.find(a => right.tags.has(a[0]))
    if (seen) {
      setTag(terms[i], seen[1], 'next-tag')
    }
    // look at prev word <-
    seen = rightWords.find(a => right.normal === a[0])
    if (seen) {
      setTag(terms[i], seen[1], 'next-word')
    }
  }
}
// look at neighbours for hints on unknown words
const nounFallback = function (terms, model) {
  const { leftTags, leftWords, rightWords, rightTags } = model.two.neighbours
  terms.forEach((term, i) => {
    if (term.tags.size === 0) {
      // any hints, from neighbouring words?
      lookLeft(terms, i, leftTags, leftWords)
      lookRight(terms, i, rightTags, rightWords)
      //  ¯\_(ツ)_/¯
      if (term.tags.size === 0) {
        setTag(term, 'Noun', 'noun-fallback')
      }
    }
  })
}
export default nounFallback
