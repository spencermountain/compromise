//include this tag in our cache
const cacheTag = function(tags, doc) {
  //add this tag to our cache
  if (doc.isFrozen()) {
    let cache = doc.world.cache
    if (typeof tags === 'string') {
      tags = [tags]
    }
    tags.forEach(tag => {
      tag = tag.replace(/^#/, '')
      if (!cache.tags[tag]) {
        cache.tags[tag] = true
      }
    })
  }
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
      }
    })
    //add the new tags to our cache
    if (doc.isFrozen() === true) {
      if (tagList.length > 1) {
        tagList.forEach(tags => cacheTag(tags, doc))
      } else {
        cacheTag(tag, doc)
      }
    }
  })
  return
}
module.exports = tagTerms
