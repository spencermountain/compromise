const tf = function (view, opts = {}) {
  let counts = {}
  let use = opts.use || 'root'
  view.docs.forEach(terms => {
    terms.forEach(term => {
      let str = term[use] || term.implicit || term.normal
      if (str) {
        counts[str] = counts[str] || 0
        counts[str] += 1
      }
    })
  })
  return counts
}
export default tf