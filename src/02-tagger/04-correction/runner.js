const parseSyntax = require('../../Doc/match/syntax')
let matches = require('./_corrections')
const loops = require('./_loops')
matches = matches.concat(loops)

// let tagCount = 0
const unique = function(arr) {
  let obj = arr.reduce((h, a) => {
    h[a] = true
    return h
  }, {})
  return Object.keys(obj)
}

// return intersection of array-of-arrays
const hasEvery = function(chances) {
  if (chances.length === 0) {
    return []
  }
  let all = {}
  chances.forEach(arr => {
    arr = unique(arr)
    arr.forEach(a => {
      all[a] = all[a] || 0
      all[a] += 1
    })
  })
  let res = Object.keys(all).filter(k => all[k] >= chances.length)
  res = res.map(num => Number(num))
  return res
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
      // console.log('tag ', tagCount)
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

// console.log(hasEvery([[1, 2, 2, 3], [2, 3], []]))
