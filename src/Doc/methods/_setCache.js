const cacheDoc = function(doc, options) {
  // cache tags - on phrases
  // doc.list.forEach(p => {
  //   let tags = {}
  //   p.terms().forEach(t => {
  //     tags = Object.assign(tags, t.tags)
  //   })
  //   p.cache = p.cache || {}
  //   p.cache.tags = tags
  // })

  // cache tags
  // let tags = {}
  // doc.list.forEach(p => {
  //   p.terms().forEach(t => {
  //     tags = Object.assign(tags, t.tags)
  //   })
  // })

  // cache words
  let words = {}
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      words[t.clean] = true
    })
  })
  doc._cache = {
    // tags: tags,
    words: words,
  }
  return doc
}
module.exports = cacheDoc
