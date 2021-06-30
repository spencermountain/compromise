// look for hints on preceding word
const lookLeft = function (terms, i, leftTags, leftWords) {
  // -> look at the prev word
  let left = terms[i - 1]
  if (left) {
    // look at prev tag
    let seen = leftTags.find(a => left.tags.has(a[0]))
    if (seen) {
      terms[i].tags.add(seen[1])
    }
    // look at prev word <-
    seen = leftWords.find(a => left.normal === a[0])
    if (seen) {
      terms[i].tags.add(seen[1])
    }
  }
}
// look for hints on subsequent word
const lookRight = function (terms, i, rightTags, rightWords) {
  // look at the next word
  let right = terms[i + 1]
  if (right) {
    // look at prev tag
    let seen = rightTags.find(a => right.tags.has(a[0]))
    if (seen) {
      terms[i].tags.add(seen[1])
    }
    // look at prev word <-
    seen = rightWords.find(a => right.normal === a[0])
    if (seen) {
      terms[i].tags.add(seen[1])
    }
  }
}
// look at neighbours for hints on unknown words
const nounFallback = function (document, model) {
  const { leftTags, leftWords, rightWords, rightTags } = model.neighbours
  document.forEach(terms => {
    terms.forEach((term, i) => {
      if (term.tags.size === 0) {
        // any hints, from neighbouring words?
        lookLeft(terms, i, leftTags, leftWords)
        lookRight(terms, i, rightTags, rightWords)
        //  ¯\_(ツ)_/¯
        if (term.tags.size === 0) {
          term.tags.add('Noun')
        }
      }
    })
  })
}
export default nounFallback
