// finally,
// actually run these match-statements on the terms
const runMatch = function (maybeList, document, one) {
  let results = []
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
  return results
}
export default runMatch
