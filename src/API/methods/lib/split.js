import { indexN, doesOverlap } from '../../../lib/pointers/_lib.js'

// split a pointer, by match pointer
const pivotBy = function (full, m) {
  let [n, start] = full
  let mStart = m[1]
  let mEnd = m[2]
  let res = {}
  // are they identical?
  // if (full[1] === m[1] && full[2] === m[2]) {
  //   res.match = m
  //   return res
  // }
  // does it miss - too far right?
  // if (mStart > full[1]) {
  //   // res.after = m
  //   res.miss = true
  //   return res
  // }
  // // does it miss - too far left?
  // if (mStart < full[1]) {
  //   // res.after = m
  //   res.miss = true
  //   return res
  // }

  // is there space before the match?
  if (start < mStart) {
    let end = mStart < full[2] ? mStart : full[2] // find closest end-point
    res.before = [n, start, end] //before segment
  }
  if (doesOverlap(full, m)) {
    res.match = m
  }
  // is there space after the match?
  if (full[2] > mEnd) {
    res.after = [n, mEnd, full[2]] //after segment
  }
  return res
}

const doesMatch = function (full, m) {
  return full[1] <= m[1] && m[2] <= full[2]
}

const splitAll = function (full, m) {
  let byN = indexN(m)
  let res = []
  full.forEach(ptr => {
    let [n] = ptr
    let matches = byN[n] || []
    matches = matches.filter(p => doesMatch(ptr, p))
    if (matches.length === 0) {
      res.push({ passthrough: ptr })
      return
    }
    // assume these are sorted
    let carry = ptr
    matches.forEach((p, i) => {
      let found = pivotBy(carry, p)
      // last one
      if (!byN[n][i + 1]) {
        res.push(found)
      } else {
        res.push({ before: found.before, match: found.match })
        if (found.after) {
          carry = found.after
        }
      }
    })
  })
  return res
}

export default splitAll
