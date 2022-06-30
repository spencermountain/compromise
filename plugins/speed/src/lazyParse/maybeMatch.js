const getWords = function (net) {
  return Object.keys(net.hooks).filter(w => !w.startsWith('#') && !w.startsWith('%'))
}

const maybeMatch = function (net) {
  // must have *atleast* one of these words
  let words = getWords(net)
  if (words.length === 0) {
    return this
  }

  if (!this._cache) {
    this.cache()
  }
  // return sentences that have one of our needed words
  return this.filter(m => {
    return words.some(str => m._cache.has(str))
  })
}
export default maybeMatch