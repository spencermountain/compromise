const boringTags = new Set(['Auxiliary', 'Possessive'])

const sortByKids = function (tags, tagSet) {
  tags = tags.sort((a, b) => {
    // (unknown tags are interesting)
    if (boringTags.has(a) || !Object.hasOwn(tagSet, b)) {
      return 1
    }
    if (boringTags.has(b) || !Object.hasOwn(tagSet, a)) {
      return -1
    }
    let kids = tagSet[a].children || []
    const aKids = kids.length
    kids = tagSet[b].children || []
    const bKids = kids.length
    return aKids - bKids
  })
  return tags
}

const tagRank = function (view) {
  const { document, world } = view
  const tagSet = world.model.one.tagSet
  document.forEach(terms => {
    terms.forEach(term => {
      const tags = Array.from(term.tags)
      term.tagRank = sortByKids(tags, tagSet)
    })
  })
}
export default tagRank
