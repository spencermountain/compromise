/** apply a tag, or tags to all terms */
const tagTerms = function(tag, doc, safe, reason) {
  let tagList = []
  if (typeof tag === 'string') {
    tagList = tag.split(' ')
  }

  // console.log(doc.parents().length)
  //do indepenent tags for each term:
  doc.list.forEach(p => {
    let terms = p.terms()
    // tagSafe - apply only to fitting terms
    if (safe === true) {
      terms = terms.filter(t => t.canBe(tag, doc.world))
    }
    // set tags in our cache
    // if (terms.length > 0) {
    //   p.cache = p.cache || {}
    //   p.cache.tags = p.cache.tags || {}
    //   p.cache.tags[tag] = true

    //   if (p.parent) {
    //     p.parent.cache = p.parent.cache || { tags: {} }
    //     p.parent.cache.tags[tag] = true
    //   }
    // }
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
