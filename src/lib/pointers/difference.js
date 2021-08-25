// split a pointer, by negative pointer
const splitBy = function (full, neg) {
  let [n, start] = full
  let negStart = neg[1]
  let negEnd = neg[2]
  let results = []
  // is there space before the neg?
  if (start < negStart) {
    let end = negStart < full[2] ? negStart : full[2] // find closest end-point
    results.push([n, start, end]) //before segment
  }
  // is there space after the neg?
  if (full[2] > negEnd) {
    results.push([n, negEnd, full[2]]) //after segment
  }
  return results
}

const subtract = function (refs, not) {
  let byN = {}
  not.forEach(ref => {
    byN[ref[0]] = byN[ref[0]] || []
    byN[ref[0]].push(ref)
  })
  let res = []
  refs.forEach(ptr => {
    let [n] = ptr
    if (!byN[n]) {
      // nothing to subtract, it's fine
      res.push(ptr)
    }
    // oh boy, here we go
    byN[n].forEach(neg => {
      let found = splitBy(ptr, neg)
      res = res.concat(found)
    })
  })
  return res
}
export default subtract
