const forEach = function (cb) {
  let ptrs = this.fullPointer
  ptrs.forEach((ptr, i) => {
    let view = this.update([ptr])
    cb(view, i)
  })
  return this
}

const map = function (cb, empty) {
  let ptrs = this.fullPointer
  // let cache = this._cache || []
  let res = ptrs.map((ptr, i) => {
    let view = this.update([ptr])
    // view._cache = cache[i]
    return cb(view, i)
  })
  if (res.length === 0) {
    return empty || this.update([])
  }
  // return an array of values, or View objects?
  // user can return either from their callback
  if (res[0] !== undefined) {
    // array of strings
    if (typeof res[0] === 'string') {
      return res
    }
    // array of objects
    if (typeof res[0] === 'object' && (res[0] === null || !res[0].isView)) {
      return res
    }
  }
  // return a View object
  let all = []
  res.forEach(ptr => {
    all = all.concat(ptr.fullPointer)
  })
  return this.toView(all)
}

const filter = function (cb) {
  let ptrs = this.fullPointer
  // let cache = this._cache || []
  ptrs = ptrs.filter((ptr, i) => {
    let view = this.update([ptr])
    // view._cache = cache[i]
    return cb(view, i)
  })
  let res = this.update(ptrs) //TODO: keep caches automatically
  // res._cache = ptrs.map(ptr => cache[ptr[0]])
  return res
}

const find = function (cb) {
  let ptrs = this.fullPointer
  // let cache = this._cache || []
  let found = ptrs.find((ptr, i) => {
    let view = this.update([ptr])
    // view._cache = cache[i]
    return cb(view, i)
  })
  return this.update([found])
}

const some = function (cb) {
  let ptrs = this.fullPointer
  // let cache = this._cache || []
  return ptrs.some((ptr, i) => {
    let view = this.update([ptr])
    // view._cache = cache[i]
    return cb(view, i)
  })
}

const random = function (n = 1) {
  let ptrs = this.fullPointer
  let r = Math.floor(Math.random() * ptrs.length)
  //prevent it from going over the end
  if (r + n > this.length) {
    r = this.length - n
    r = r < 0 ? 0 : r
  }
  ptrs = ptrs.slice(r, r + n)
  return this.update(ptrs)
}
export default { forEach, map, filter, find, some, random }
