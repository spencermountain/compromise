const hasNumber = /[0-9,;!:|¦]/

const compile = function (view, opts = {}) {
  let counts = {}
  let total = 0
  let use = opts.use || 'normal'
  view.docs.forEach(terms => {
    terms.forEach(term => {
      let str = term[use]
      if (str) {
        counts[str] = counts[str] || 0
        counts[str] += 1
        total += 1
      }
    })
  })
  if (total === 0) {
    return {}
  }
  // turn into percentages
  let arr = Object.keys(counts).map(k => {
    let per = counts[k] / total
    per = Math.round(per * 1000) / 1000 // round to 3 digits
    return [k, per]
  })
  arr = arr.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else if (a[1] < b[1]) {
      return 1
    }
    return 0
  })
  // remove anything so small
  arr = arr.filter(a => a[1] > 0 && hasNumber.test(a[0]) === false)
  let obj = arr.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  return obj
}
export default compile