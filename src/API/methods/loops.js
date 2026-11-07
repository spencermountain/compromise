// wrappers for loops in javascript arrays

// call the callback with a one-match view
const wrap = (view, cb) => (ptr, i) => cb(view.update([ptr]), i)

const forEach = function (cb) {
  this.fullPointer.forEach(wrap(this, cb))
  return this
}

const map = function (cb, empty) {
  const run = wrap(this, cb)
  const res = this.fullPointer.map((ptr, i) => {
    const out = run(ptr, i)
    // if we returned nothing, return a view
    if (out === undefined) {
      return this.none()
    }
    return out
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
  return this.update(this.fullPointer.filter(wrap(this, cb)))
}

const find = function (cb) {
  const found = this.fullPointer.find(wrap(this, cb))
  if (found === undefined) {
    return this.update([])
  }
  return this.update([found])
}

const some = function (cb) {
  return this.fullPointer.some(wrap(this, cb))
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
