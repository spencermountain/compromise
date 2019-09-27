/** apply a tag, or tags to all terms */
const tagTerms = function(tag, doc, safe, reason) {
  let tagList = []
  if (typeof tag === 'string') {
    tagList = tag.split(' ')
  }
  // invalidate cache
  // if (doc._cache && doc._cache.tags) {
  //   doc.parents().forEach(d => {
  //     d._cache.tags = null
  //   })
  // }
  //   d.list.forEach( p => {
  // if (p.cache) {
  //   p.cache.tags = null
  // }
  //   })
  // })

  // console.log(doc.parents().length)
  //do indepenent tags for each term:
  doc.list.forEach(p => {
    let terms = p.terms()
    // tagSafe - apply only to fitting terms
    if (safe === true) {
      terms = terms.filter(t => t.canBe(tag, doc.world))
    }
    terms.forEach((t, i) => {
      //fancy version:
      if (tagList.length > 1) {
        if (tagList[i] && tagList[i] !== '.') {
          t.tag(tagList[i], reason, doc.world)
        }
      } else {
        //non-fancy version (same tag for all terms)
        t.tag(tag, reason, doc.world)
      }
    })
  })
  return
}
module.exports = tagTerms
