const reduceWords = require('./_reduceWords')
const reduceTags = require('./_reduceTags')
const topk = require('./_topk')

/** store a parsed document for later use */
const exportFn = function() {
  let phraseList = this.json({ text: false, trim: false, terms: { tags: true, whitespace: true } })
  let allTags = []
  let allWords = {}
  phraseList = phraseList.map(p => {
    return p.terms.map(t => {
      allWords[t.text] = allWords[t.text] || 0
      allWords[t.text] += 1
      allWords[t.pre] = allWords[t.pre] || 0
      allWords[t.pre] += 1
      allWords[t.post] = allWords[t.post] || 0
      allWords[t.post] += 1
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

  //compress the top words
  let wordMap = reduceWords(allWords)

  phraseList.forEach(arr => {
    arr.forEach(a => {
      // use index numbers instead of redundant tag-names
      a[3] = a[3].map(tag => tagMap[tag]).join(',')
      // use index numbers instead of re-used words
      a[0] = wordMap[a[0]] !== undefined ? wordMap[a[0]] : a[0]
      a[1] = wordMap[a[1]] !== undefined ? wordMap[a[1]] : a[1]
      a[2] = wordMap[a[2]] !== undefined ? wordMap[a[2]] : a[2]
    })
  })
  // pivot wordlist
  let wordList = []
  Object.keys(wordMap).forEach(k => {
    wordList[wordMap[k]] = k
  })

  return {
    tags: Object.keys(tagMap),
    words: wordList,
    list: phraseList,
  }
}
module.exports = exportFn
