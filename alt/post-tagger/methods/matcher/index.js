const matchUp = require('./01-matchUp')
const localTrim = require('./02-localTrim')

const matcher = function (document, byGroup, methods) {
  const { cacheDoc, match } = methods
  let results = []
  // find suitable matches to attempt, on each sentence
  let docCache = cacheDoc(document)
  let maybeList = matchUp(docCache, byGroup)
  maybeList = localTrim(maybeList, docCache)
  // now actually run the matches
  maybeList.forEach((allPossible, n) => {
    allPossible.forEach(m => {
      let res = match([document[n]], m)
      if (res.ptrs.length > 0) {
        res.ptrs.forEach(ptr => {
          results.push({ pointer: ptr, tag: m.tag, reason: m.reason })
        })
      }
    })
  })
  // console.dir(results, { depth: 5 })
  return results
}
module.exports = matcher
