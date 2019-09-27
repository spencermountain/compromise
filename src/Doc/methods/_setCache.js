const cacheDoc = function(doc, options) {
  // cache tags
  // doc.list.forEach(p => {
  //   let tags = {}
  //   p.terms().forEach(t => {
  //     tags = Object.assign(tags, t.tags)
  //   })
  //   p.cache = p.cache || {}
  //   p.cache.tags = tags
  // })
  let tags = {}
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      tags = Object.assign(tags, t.tags)
    })
  })
  doc._cache = {
    tags: tags,
  }
  return doc
}
module.exports = cacheDoc
