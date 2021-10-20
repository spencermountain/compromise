const boringTags = {
  Auxiliary: 1,
  Possessive: 1,
}

/** a subjective ranking of tags kinda tfidf-based */
const rankTags = function (term, world) {
  let tags = Object.keys(term.tags)
  const tagSet = world.tags
  tags = tags.sort((a, b) => {
    //bury the tags we dont want
    if (boringTags[b] || !tagSet[b]) {
      return -1
    }
    // unknown tags are interesting
    if (!tagSet[b]) {
      return 1
    }
    if (!tagSet[a]) {
      return 0
    }
    // then sort by #of parent tags (most-specific tags first)
    if (tagSet[a].lineage.length > tagSet[b].lineage.length) {
      return 1
    }
    if (tagSet[a].isA.length > tagSet[b].isA.length) {
      return -1
    }
    return 0
  })
  return tags
}
module.exports = rankTags
