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
    safe: a[4],
    str: a[0],
  }
})

const union = function(a, b) {
  return [...new Set([...a, ...b])]
}

const runner = function(doc) {
  //find phrases to try for each match
  matches.forEach(m => {
    let fromTags = []
    let fromWords = []
    m.required.words.forEach(w => {
      if (doc._cache.words[w] !== undefined) {
        fromWords = fromWords.concat(doc._cache.words[w])
      }
    })
    m.required.tags.forEach(tag => {
      if (doc._cache.tags[tag] !== undefined) {
        fromTags = fromTags.concat(doc._cache.tags[tag])
      }
    })
    if (fromTags.length === 0 && fromWords.length === 0) {
      return
    }
    let worthIt = union(fromTags, fromWords)
    // let toTry = intersection(fromTags, fromWords)
    let phrases = worthIt.map(index => doc.list[index])
    let tryDoc = doc.buildFrom(phrases)
    if (m.safe === true) {
      tryDoc.match(m.reg, m.group).tagSafe(m.tag, m.hint)
    } else {
      tryDoc.match(m.reg, m.group).tag(m.tag, m.hint)
    }
  })
}
module.exports = runner
