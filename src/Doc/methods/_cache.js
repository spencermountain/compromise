const cacheDoc = function(doc) {
  // cache tags
  doc.list.forEach(p => {
    let tags = {}
    p.terms().forEach(t => {
      tags = Object.assign(tags, t.tags)
    })
    p.cache = p.cache || {}
    p.cache.tags = tags
  })
}
module.exports = cacheDoc
