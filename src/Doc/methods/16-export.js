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

/** store a parsed document for later use */
exports.export = function() {
  let phraseList = this.json({ text: true, terms: { tags: true, whitespace: true } })
  // let phraseList = json.map(p => p.terms)
  let allTags = []
  phraseList.forEach(p => {
    p.terms.forEach(t => {
      allTags = allTags.concat(t.tags)
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
      let tags = term.tags.map(tag => tagMap[tag])
      tags = tags.join(',')
      return tags
    })
    terms = terms.join('|')
    return [p.text, terms]
  })

  return {
    tags: tagMap,
    // words: {},
    phrases: phraseList,
  }
}
