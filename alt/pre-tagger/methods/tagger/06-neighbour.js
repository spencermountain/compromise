// look at neighbours for hints on unknown words
const simpleMarkov = function (document, model) {
  const { leftTags, leftWords, rightWords, rightTags } = model.neighbours
  document.forEach(terms => {
    terms.forEach((term, i) => {
      if (term.tags.size === 0) {
        // -> look at the prev word
        let left = terms[i - 1]
        if (left) {
          // look at prev tag
          let seen = leftTags.find(a => left.tags.has(a[0]))
          if (seen) {
            term.tags.add(seen[1])
          }
          // look at prev word <-
          seen = leftWords.find(a => left.normal === a[0])
          if (seen) {
            term.tags.add(seen[1])
          }
        }

        // look at the next word
        let right = terms[i + 1]
        if (right) {
          // look at prev tag
          let seen = rightTags.find(a => right.tags.has(a[0]))
          if (seen) {
            term.tags.add(seen[1])
          }
          // look at prev word <-
          seen = rightWords.find(a => right.normal === a[0])
          if (seen) {
            term.tags.add(seen[1])
          }
        }
      }
    })
  })
}
module.exports = simpleMarkov
