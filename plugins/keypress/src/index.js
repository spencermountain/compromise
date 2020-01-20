const addMethods = function(Doc, world, nlp) {
  let cache = {}

  /** memoize tagger per-sentence */
  nlp.keypress = function(str) {
    let doc = nlp.tokenize(str)
    let sentences = doc.json()
    sentences.forEach(o => {
      //keep it
      if (cache.hasOwnProperty(o.text) === false) {
        cache[o.text] = o
      } else {
        // nlp.import([[o]])
      }
    })
    // console.log(sentences)
  }

  /** invalidate the keypress cache */
  nlp.clear = function() {
    cache = {}
  }
}

module.exports = addMethods
