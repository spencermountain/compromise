/** freeze the current state of the document, for speed-purposes*/
exports.cache = function (options) {
  options = options || {}
  let words = {}
  let tags = {}
  this._cache.words = words
  this._cache.tags = tags
  this._cache.set = true
  this.list.forEach((p, i) => {
    p.cache = p.cache || {}
    //p.terms get cached automatically
    let terms = p.terms()
    // cache all the terms
    terms.forEach(t => {
      if (words[t.reduced] && !words.hasOwnProperty(t.reduced)) {
        return //skip prototype words
      }
      words[t.reduced] = words[t.reduced] || []
      words[t.reduced].push(i)

      Object.keys(t.tags).forEach(tag => {
        tags[tag] = tags[tag] || []
        tags[tag].push(i)
      })

      // cache root-form on Term, too
      if (options.root) {
        t.setRoot(this.world)
        words[t.root] = [i]
      }
    })
  })
  return this
}

/** un-freezes the current state of the document, so it may be transformed */
exports.uncache = function () {
  this._cache = {}
  this.list.forEach(p => {
    p.cache = {}
  })
  // do parents too?
  this.parents().forEach(doc => {
    doc._cache = {}
    doc.list.forEach(p => {
      p.cache = {}
    })
  })
  return this
}
