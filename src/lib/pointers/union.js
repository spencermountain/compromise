// do the pointers intersect?
const doesOverlap = function (a, b) {
  if (a[0] !== b[0]) {
    return false
  }
  let startA = a[1]
  let startB = b[1]
  // [a,a,a,-,-,-,]
  // [-,-,b,b,b,-,]
  if (startA <= startB && a[2] >= startB) {
    return true
  }
  // [-,-,-,a,a,-,]
  // [-,-,b,b,b,-,]
  if (startB <= startA && b[2] >= startA) {
    return true
  }
  return false
}

// get widest min/max
const getExtent = function (ptrs) {
  let min = ptrs[0][1]
  let max = ptrs[0][2]
  ptrs.forEach(ptr => {
    if (ptr[1] < min) {
      min = ptr[1]
    }
    if (ptr[2] > max) {
      max = ptr[2]
    }
  })
  return [ptrs[0][0], min, max]
}

const uniquePtrs = function (arr) {
  let obj = {}
  for (let i = 0; i < arr.length; i += 1) {
    obj[arr[i].join(',')] = arr[i]
  }
  return Object.values(obj)
}

const getUnion = function (a, b) {
  let both = a.concat(b)
  let byN = {}
  both.forEach(ptr => {
    let [n] = ptr
    byN[n] = byN[n] || []
    byN[n].push(ptr)
  })
  let res = []
  both.forEach(ptr => {
    let [n] = ptr
    if (byN[n].length === 1) {
      // we're alone on this sentence, so we're good
      res.push(ptr)
      return
    }
    // there may be overlaps
    let hmm = byN[n].filter(m => doesOverlap(ptr, m))
    hmm.push(ptr)
    let extent = getExtent(hmm)
    res.push(extent)
  })
  res = uniquePtrs(res)
  return res
}
export default getUnion

// a before b
// console.log(doesOverlap([0, 0, 4], [0, 2, 5]))
// // b before a
// console.log(doesOverlap([0, 3, 4], [0, 1, 5]))
// // disjoint
// console.log(doesOverlap([0, 0, 3], [0, 4, 5]))

// console.log(
//   getExtent([
//     [0, 3, 4],
//     [0, 4, 5],
//     [0, 1, 2],
//   ])
// )
// two disjoint
// console.log(getUnion([[1, 3, 4]], [[0, 1, 2]]))
// two disjoint
// console.log(getUnion([[0, 3, 4]], [[0, 1, 2]]))
// overlap-plus
// console.log(getUnion([[0, 1, 4]], [[0, 2, 6]]))
// overlap
// console.log(getUnion([[0, 1, 4]], [[0, 2, 3]]))
