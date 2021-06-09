const createCache = function (view) {
  let cache = { words: {}, tags: {} }
  view.docs.forEach((terms, n) => {
    terms.forEach(term => {
      // let ptr = `/${n}/${i}`
      // add words
      if (term.normal !== '') {
        cache.words[term.normal] = cache.words[term.normal] || new Set()
        cache.words[term.normal].add(n)
      }
      // cache implicit words, too
      if (term.implicit) {
        cache.words[term.implicit] = cache.words[term.implicit] || new Set()
        cache.words[term.implicit].add(n)
      }
      let tags = Array.from(term.tags)
      for (let t = 0; t < tags.length; t += 1) {
        cache.tags[tags[t]] = cache.tags[tags[t]] || new Set()
        cache.tags[tags[t]].add(n)
      }
    })
  })
  return cache
}
module.exports = createCache
