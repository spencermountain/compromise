const idf = function (view, opts = {}) {
  let counts = {}
  let total = 0
  let use = opts.use || 'root'
  view.docs.forEach(terms => {
    terms.forEach(term => {
      let str = term[use] || term.implicit || term.normal
      if (str) {
        counts[str] = counts[str] || 0
        counts[str] += 1
        total += 1
      }
    })
  })

  counts = Object.entries(counts)
  counts = counts.reduce((h, a) => {
    if (opts.min && a[1] < opts.min) {
      return h
    }
    // IDF = (Total number of documents) / (total number of documents containing the keyword)
    let num = Math.log10(total / a[1])
    //force between 0-1
    // num = num / max
    // num = Math.round(num * 1000) / 1000 // round to 2 digits
    h[a[0]] = num.toFixed(3)
    return h
  }, {})
  return counts
}
export default idf