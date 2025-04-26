const tf = function (view, opts = {}) {
  const counts = {}
  const form = opts.form || 'root'
  view.docs.forEach(terms => {
    terms.forEach(term => {
      const str = term[form] || term.implicit || term.normal
      if (str) {
        counts[str] = counts[str] || 0
        counts[str] += 1
      }
    })
  })
  return counts
}
export default tf