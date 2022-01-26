const hasNumber = /[0-9,;!:|¦]/
const hasPunct = /[.,\/#!$%\^&\*;:{}=\-_`~()']/
const hasLetter = /[a-z]/

const compile = function (view, opts = {}) {
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
  if (total === 0) {
    return {}
  }
  // turn into percentages
  let keys = Object.keys(counts)
  // keys = keys.filter(k => counts[k] > 7)
  let arr = keys.map(k => {
    let per = (counts[k] / total) * 10000
    per = Math.round(per * 100) / 100 // round to 2 digits
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
  // console.log(arr.length)
  arr = arr.filter(a => a[1] > 0 && hasNumber.test(a[0]) === false && hasPunct.test(a[0]) === false && hasLetter.test(a[0]) === true)
  // console.log(arr.length)
  let obj = arr.reduce((h, a) => {
    h[a[0]] = a[1]
    return h
  }, {})
  return obj
}
export default compile