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
  let phraseList = this.json({ text: true, trim: false, terms: { tags: true, whitespace: true } })
  // let phraseList = json.map(p => p.terms)
  let allTags = []
  phraseList.forEach(p => {
    p.terms.forEach(t => {
      // reduce redundant tags
      let tags = reduceTags(t.tags, this.world)
      allTags = allTags.concat(tags)
    })
  })
  // compress the top tags
  allTags = topk(allTags)
  let tagMap = {}
  allTags.forEach((a, i) => {
    tagMap[a[0]] = i
  })

  //use index numbers instead of redundant tag-names
  phraseList = phraseList.map(p => {
    let terms = p.terms.map(term => {
      let tags = term.tags
      tags = reduceTags(tags, this.world)
      tags = tags.map(tag => tagMap[tag])
      tags = tags.join(',')
      return tags
    })
    terms = terms.join('|')
    return [p.text, terms]
  })

  return {
    tags: Object.keys(tagMap),
    // words: {},
    list: phraseList,
  }
}
