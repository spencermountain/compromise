const idf = function (view, opts = {}) {
  let counts = Object.create(null)
  let total = 0
  const form = opts.form || 'root'
  view.docs.forEach(terms => {
    terms.forEach(term => {
      const str = term[form] || term.implicit || term.normal
      if (str) {
        counts[str] ??= 0
        counts[str] += 1
        total += 1
      }
    })
  })

  counts = Object.entries(counts)
  counts = counts.filter(([, count]) => !opts.min || count >= opts.min)
  return Object.fromEntries(counts.map(([word, count]) => {
    // IDF = (Total number of documents) / (total number of documents containing the keyword)
    const num = Math.log10(total / count)
    //force between 0-1
    // num = num / max
    // num = Math.round(num * 1000) / 1000 // round to 2 digits
    return [word, num.toFixed(3)]
  }))
}
export default idf
