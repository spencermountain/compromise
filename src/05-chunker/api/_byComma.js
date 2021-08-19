const commaSplit = function (terms, i) {
  // let before=terms[i-1]
  let term = terms[i]
  let after = terms[i + 1]
  if (after) {
    // Toronto, Ontario
    if (term.tags.has('Place') && after.tags.has('Place')) {
      return false
    }
    // Wednesday, June 5th
    if (term.tags.has('Date') && after.tags.has('Date')) {
      return false
    }
    // oxford comma
    // if (after.normal === 'and' || after.normal === 'or') {
    //   return false
    // }
  }
  return true
}

const byPunctuation = function (view) {
  let splits = []
  view.docs.forEach((terms, n) => {
    terms.forEach((term, i) => {
      // split on some commas
      if (term.post.indexOf(',') !== -1 && commaSplit(term, i)) {
        splits.push([n, i, i + 1])
      }
    })
  })
  if (splits.length > 0) {
    let m = view.update(splits)
    return view.splitOn(m)
  }
  // console.log(splits)
  return view
}
export default byPunctuation
