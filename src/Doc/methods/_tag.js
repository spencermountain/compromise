//include this tag in our cache
const cacheTag = function(doc, tag) {
  //add this tag to our cache
  // if (this.isFrozen()) {
  //   if (typeof tags === 'string') {
  //     tags = [tags]
  //   }
  //   tags.forEach(tag => {
  //     // if we don't already have this tag,
  //     // then cache it in each parent, too
  //     if (!this.cache.tags[tag]) {
  //       this.cache.tags[tag] = true
  //       this.parents().forEach(p => {
  //         p.cache.tags[tag] = true
  //       })
  //     }
  //   })
  // }
}

/** apply a tag, or tags to all terms */
const tagTerms = function(tag, doc, safe, reason) {
  let tagList = []
  if (typeof tag === 'string') {
    tagList = tag.split(' ')
  }
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
        // if (doc.isFrozen()) {
        //   console.log('hi')
        // }
      }
    })
  })
  return
}
module.exports = tagTerms
