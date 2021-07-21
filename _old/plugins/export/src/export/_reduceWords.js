const reduceWords = function(allWords) {
  let topWords = Object.keys(allWords).filter(str => allWords[str] >= 2)
  topWords = topWords.sort((a, b) => {
    if (allWords[a] > allWords[b]) {
      return -1
    } else if (allWords[a] < allWords[b]) {
      return 1
    }
    return 0
  })
  let order = topWords.reduce((h, str, i) => {
    h[str] = i
    return h
  }, {})
  return order
}
module.exports = reduceWords
