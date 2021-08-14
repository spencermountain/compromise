import matchUp from './01-matchUp.js'
import localTrim from './02-localTrim.js'

const matcher = function (document, byGroup, methods) {
  const one = methods.one
  let results = []
  // find suitable matches to attempt, on each sentence
  let docCache = one.cacheDoc(document)
  let maybeList = matchUp(docCache, byGroup)
  maybeList = localTrim(maybeList, docCache)
  // now actually run the matches
  maybeList.forEach((allPossible, n) => {
    allPossible.forEach(m => {
      let res = one.match([document[n]], m)
      if (res.ptrs.length > 0) {
        res.ptrs.forEach(ptr => {
          ptr[0] = n // fix the sentence pointer
          let todo = Object.assign({}, m, { pointer: ptr })
          if (m.unTag !== undefined) {
            todo.unTag = m.unTag
          }
          results.push(todo)
        })
      }
    })
  })
  // console.dir(results, { depth: 5 })
  return results
}
export default matcher
