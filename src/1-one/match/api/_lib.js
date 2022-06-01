export const relPointer = function (ptrs, parent) {
  if (!parent) {
    return ptrs
  }
  ptrs.forEach(ptr => {
    let n = ptr[0]
    if (parent[n]) {
      ptr[0] = parent[n][0] //n
      ptr[1] += parent[n][1] //start
      ptr[2] += parent[n][1] //end
    }
  })
  return ptrs
}

// make match-result relative to whole document
export const fixPointers = function (res, parent) {
  let { ptrs, byGroup } = res
  ptrs = relPointer(ptrs, parent)
  Object.keys(byGroup).forEach(k => {
    byGroup[k] = relPointer(byGroup[k], parent)
  })
  return { ptrs, byGroup }
}

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

// did they pass-in a compromise object?
export const isView = val => val && isObject(val) && val.isView === true

export const isNet = val => val && isObject(val) && val.isNet === true


// is the pointer the full sentence?
// export const isFull = function (ptr, document) {
//   let [n, start, end] = ptr
//   if (start !== 0) {
//     return false
//   }
//   if (document[n] && document[n][end - 1] && !document[n][end]) {
//     return true
//   }
//   return false
// }