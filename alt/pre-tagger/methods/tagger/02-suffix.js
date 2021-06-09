//sweep-through all suffixes
const suffixLoop = function (str, suffixes = []) {
  const len = str.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i > 1; i -= 1) {
    let suffix = str.substr(len - i, len)
    if (suffixes[suffix.length].hasOwnProperty(suffix) === true) {
      let tag = suffixes[suffix.length][suffix]
      return tag
    }
  }
  return null
}

// decide tag from the ending of the word
const tagBySuffix = function (terms, model) {
  terms.forEach(t => {
    if (t.tags.size === 0) {
      let tag = suffixLoop(t.normal, model.suffixPatterns)
      if (tag !== null) {
        t.tags.add(tag)
      }
      // try implicit form of word, too
      if (t.implicit) {
        tag = suffixLoop(t.implicit, model.suffixPatterns)
        if (tag !== null) {
          t.tags.add(tag)
        }
      }
    }
  })
}
module.exports = tagBySuffix
