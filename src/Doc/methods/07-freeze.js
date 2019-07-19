exports.freeze = function() {
  this.cache = {
    frozen: true,
    words: {},
    tags: {},
  }
  //cache all normalized words
  let terms = this.termList()
  for (let i = 0; i < terms.length; i++) {
    this.cache.words[terms[i].normal] = true
  }
}
