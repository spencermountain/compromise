//sweep-through all suffixes
const suffixLoop = function (term, suffixes) {
  const len = term.normal.length
  let max = 7
  if (len <= max) {
    max = len - 1
  }
  for (let i = max; i > 1; i -= 1) {
    let str = term.normal.substr(len - i, len)
    if (suffixes[str.length].hasOwnProperty(str) === true) {
      let tag = suffixes[str.length][str]
      return tag
    }
  }
  return null
}

// decide tag from the ending of the word
const tagBySuffix = function (terms, model) {
  terms.forEach(t => {
    if (t.tags.size === 0) {
      let tag = suffixLoop(t, model.suffixes)
      if (tag !== null) {
        t.tags.add(tag)
      }
    }
  })
}
module.exports = tagBySuffix
