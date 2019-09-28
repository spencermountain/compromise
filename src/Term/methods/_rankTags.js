const boringTags = {
  Auxiliary: 1,
  Possessive: 1,
}

/** a subjective ranking of tags kinda tfidf-based */
const rankTags = function(term, world) {
  let tags = Object.keys(term.tags)
  const tagSet = world.tags
  tags = tags.sort() //alphabetical, first

  tags = tags.sort((a, b) => {
    //bury the tags we dont want
    if (boringTags[b] || !tagSet[b]) {
      return -1
    }
    // unknown tags are interesting
    if (!tagSet[a]) {
      return 1
    }
    // then sort by #of parent tags (most-specific tags first)
    if (tagSet[a].downward.length > tagSet[b].downward.length) {
      return 1
    }
    return -1
  })
  return tags
}
module.exports = rankTags
