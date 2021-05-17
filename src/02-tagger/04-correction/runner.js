const matches = require('./matches')
const unique = require('./_unique')

const union = sets => {
  let result = new Set()
  sets.forEach(S => S.forEach(e => result.add(e)))
  return result
}

// return intersection of array-of-arrays
const hasEvery = function (chances) {
  if (chances.length === 0) {
    return []
  }
  let res = union(chances)
  return Array.from(res)
  // chances.forEach(set => {
  // arr = unique(arr)
  // for (let i = 0; i < arr.length; i++) {
  //   obj[arr[i]] = obj[arr[i]] || 0
  //   obj[arr[i]] += 1
  // }
  // })
  // let res = Object.keys(obj)
  // res = res.filter(k => obj[k] === chances.length)
  // res = res.map(num => Number(num))
  // return res
}

const runner = function (doc) {
  //find phrases to try for each match
  matches.forEach(m => {
    let allChances = []
    m.required.words.forEach(w => {
      if (doc._cache.words[w]) {
        allChances.push(doc._cache.words[w])
      }
    })
    m.required.tags.forEach(tag => {
      if (doc._cache.tags[tag]) {
        allChances.push(doc._cache.tags[tag])
      }
    })
    let worthIt = hasEvery(allChances)
    if (worthIt.length === 0) {
      return
    }

    let phrases = worthIt.map(index => doc.list[index])
    let tryDoc = doc.buildFrom(phrases)
    // phrases getting tagged
    let match = tryDoc.match(m.reg, m.group)
    if (match.found) {
      if (m.safe === true) {
        match.tagSafe(m.tag, m.reason)
      } else {
        match.tag(m.tag, m.reason)
      }
    }
  })
}
module.exports = runner

// console.log(hasEvery([[1, 2, 2, 3], [2, 3], []]))
