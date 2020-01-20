// compress a list of things by frequency
const topk = function(list) {
  let counts = {}
  list.forEach(a => {
    counts[a] = counts[a] || 0
    counts[a] += 1
  })
  let arr = Object.keys(counts)
  arr = arr.sort((a, b) => {
    if (counts[a] > counts[b]) {
      return -1
    } else {
      return 1
    }
  })
  // arr = arr.filter(a => counts[a] > 1)
  return arr.map(a => [a, counts[a]])
}

// remove implied tags, like 'Noun' when we have 'Plural'
const reduceTags = function(tags, world) {
  let tagset = world.tags
  let implied = []
  tags.forEach(tag => {
    if (tagset[tag] && tagset[tag].isA) {
      implied = implied.concat(tagset[tag].isA)
    }
  })
  implied = implied.reduce((h, tag) => {
    h[tag] = true
    return h
  }, {})
  tags = tags.filter(tag => !implied[tag])
  // tags
  return tags
}

/** store a parsed document for later use */
exports.export = function() {
  let phraseList = this.json({ text: false, trim: false, terms: { tags: true, whitespace: true } })
  let allTags = []
  phraseList = phraseList.map(p => {
    return p.terms.map(t => {
      //remove any implied tags, first
      t.tags = reduceTags(t.tags, this.world)
      allTags = allTags.concat(t.tags)
      return [t.pre, t.text, t.post, t.tags]
    })
  })
  // compress the top tags
  allTags = topk(allTags)
  let tagMap = {}
  allTags.forEach((a, i) => {
    tagMap[a[0]] = i
  })

  // use index numbers instead of redundant tag-names
  phraseList.forEach(arr => {
    arr.forEach(a => {
      a[3] = a[3].map(tag => tagMap[tag]).join(',')
    })
  })

  return {
    tags: Object.keys(tagMap),
    list: phraseList,
  }
}
