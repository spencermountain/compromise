let matches = require('./_corrections')
const loops = require('./_loops')
matches = matches.concat(loops)

const parseSyntax = require('../../Doc/match/syntax')
// let tagCount = 0
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
  m.reg = reg
  m.required = { tags: needTags, words: needWords }
  m.str = m.match
  m.count = 0
  return m
})

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
    // m.count += 1
    // phrases getting tagged
    let match = tryDoc.match(m.reg, m.group)
    if (match.found) {
      // tagCount += 1
      // if (match.has(m.tag)) {
      //   console.log(m.str)
      // }
      if (m.safe === true) {
        match.tagSafe(m.tag, m.reason)
      } else {
        match.tag(m.tag, m.reason)
      }
    }
  })
  // console.log('\n\ntotal:', matches.length)
  // let used = matches.filter(m => m.count > 0)
  // console.log('used:', used.length)
  // let unused = matches.filter(m => m.count === 0)
  // console.log('\n\n')
  // console.log(unused.map(m => m.str))
}
module.exports = runner
