let matches = require('./_corrections')
const parseSyntax = require('../../Doc/match/syntax')

const unique = function(arr) {
  let obj = arr.reduce((h, a) => {
    h[a] = true
    return h
  }, {})
  return Object.keys(obj)
}
const intersection = function(array1, array2) {
  return array1.filter(value => -1 !== array2.indexOf(value))
}
const hasEvery = function(chances) {
  if (chances.length === 0) {
    return []
  }
  if (chances.length === 1) {
    return unique(chances[0])
  }
  let running = intersection(chances[0], chances[1])
  for (let i = 2; i < chances.length; i++) {
    running = intersection(running, chances[i])
  }
  return running
}

// matches = matches.slice(0, 3)
matches = matches.map(m => {
  let needTags = []
  let needWords = []
  let reg = parseSyntax(m.match)
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
  needTags = unique(needTags)
  needWords = unique(needWords)
  return {
    reg: reg,
    required: { tags: needTags, words: needWords },
    group: m.group,
    tag: m.tag,
    reason: m.reason,
    safe: m.safe,
    str: m.match,
  }
})

// console.log(matches.length)
// console.log(matches.filter(m => m.required.tags.length > 1).length)

// console.log(hasEvery([[1], [1, 2], [1], [4, 6, 34, 6, 3, 1], [2]]))
// console.log(hasEvery([[0, 1, 2, 2, 3, 3, 3]]))

const runner = function(doc) {
  //find phrases to try for each match
  matches.forEach(m => {
    let allChances = []
    m.required.words.forEach(w => {
      allChances.push(doc._cache.words[w] || [])
    })
    m.required.tags.forEach(tag => {
      allChances.push(doc._cache.tags[tag] || [])
    })

    let worthIt = hasEvery(allChances)
    if (worthIt.length === 0) {
      return
    }
    // console.log(worthIt.length, m.str)
    let phrases = worthIt.map(index => doc.list[index])
    let tryDoc = doc.buildFrom(phrases)
    // phrases getting tagged
    let match = tryDoc.match(m.reg, m.group)
    if (match.found) {
      if (m.debug === true) {
        tryDoc.debug()
      }
      if (m.safe === true) {
        match.tagSafe(m.tag, m.reason)
      } else {
        match.tag(m.tag, m.reason)
      }
    }
  })
}
module.exports = runner
