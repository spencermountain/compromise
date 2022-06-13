// finally,
// actually run these match-statements on the terms
const runMatch = function (maybeList, document, methods, opts) {
  let results = []
  for (let n = 0; n < maybeList.length; n += 1) {
    for (let i = 0; i < maybeList[n].length; i += 1) {
      let m = maybeList[n][i]
      // ok, actually do the work.
      let res = methods.one.match([document[n]], m)
      // found something.
      if (res.ptrs.length > 0) {
        // let index=document[n][0].index
        res.ptrs.forEach(ptr => {
          ptr[0] = n // fix the sentence pointer
          let todo = Object.assign({}, m, { pointer: ptr })
          if (m.unTag !== undefined) {
            todo.unTag = m.unTag
          }
          results.push(todo)
        })
        //ok cool, can we stop early?
        if (opts.matchOne === true) {
          return [results[0]]
        }
      }
    }
  }
  return results
}
export default runMatch
