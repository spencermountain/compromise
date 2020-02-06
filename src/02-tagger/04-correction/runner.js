let matches = require('./_corrections')
const parseSyntax = require('../../Doc/match/syntax')

// matches = matches.slice(0, 3)
matches = matches.map(a => {
  let needTags = []
  let needWords = []
  let reg = parseSyntax(a[0])
  reg.forEach(obj => {
    if (obj.optional === true) {
      return
    }
    if (obj.tag !== undefined) {
      needTags.push(obj.tag)
    }
    if (obj.word !== undefined) {
      needWords.push(obj.word)
    }
  })
  return {
    reg: reg,
    required: { tags: needTags, words: needWords },
    group: a[1],
    tag: a[2],
    hint: a[3],
    tagSafe: a[4],
    str: a[0],
  }
})
console.log('all:', matches.length)
console.log('words:', matches.filter(m => m.required.words.length > 0).length)
console.log('tags:', matches.filter(m => m.required.tags.length > 0).length)

const runner = function(doc) {
  //find phrases to try for each match
  matches.forEach(m => {
    // let fromTags = []
    // let fromWords = []
    // m.needWords.forEach(w => {
    //   if (doc._cache.words[m.needWords] !== undefined) {
    //     fromWords = fromWords.concat(doc._cache.words[m.needWords])
    //   }
    // })
    // if (fromWords.length) {
    //   console.log(fromWords)
    //   console.log(m.str)
    // }
    // tagsafe
    if (m.tagSafe === true) {
      doc.match(m.reg, m.group).tagSafe(m.tag, m.hint)
    } else {
      doc.match(m.reg, m.group).tag(m.tag, m.hint)
    }
  })
}
module.exports = runner
