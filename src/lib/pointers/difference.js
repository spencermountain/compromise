import { indexN } from './_lib.js'

// split a pointer, by negative pointer
const splitOn = function (full, m) {
  let [n, start] = full
  let mStart = m[1]
  let mEnd = m[2]
  let results = []
  // is there space before the match?
  if (start < mStart) {
    let end = mStart < full[2] ? mStart : full[2] // find closest end-point
    results.push([n, start, end]) //before segment
  }
  // is there space after the match?
  if (full[2] > mEnd) {
    results.push([n, mEnd, full[2]]) //after segment
  }
  return results
}

const subtract = function (refs, not) {
  let byN = indexN(not)
  let res = []
  refs.forEach(ptr => {
    let [n] = ptr
    if (!byN[n]) {
      // nothing to subtract, it's fine
      res.push(ptr)
      return
    }
    // oh boy, here we go
    byN[n].forEach(neg => {
      let found = splitOn(ptr, neg)
      found.forEach(p => res.push(p))
    })
  })
  return res
}
export default subtract
