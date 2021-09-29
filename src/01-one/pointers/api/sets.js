import { getUnion, getIntersection, getDifference } from '../../../API/lib/pointers/index.js'

const getDoc = (m, view) => {
  return typeof m === 'string' ? view.match(m) : m
}

const methods = {}

// all parts, minus duplicates
methods.union = function (m) {
  m = getDoc(m, this)
  let ptrs = getUnion(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}
methods.and = methods.union

// only parts they both have
methods.intersection = function (m) {
  m = getDoc(m, this)
  let ptrs = getIntersection(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}

// only parts of a that b does not have
methods.difference = function (m) {
  m = getDoc(m, this)
  let ptrs = getDifference(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}
methods.not = methods.difference

// get opposite of a
methods.complement = function () {
  let doc = this.all()
  let ptrs = getDifference(doc.fullPointer, this.fullPointer)
  return this.update(ptrs)
}

// remove overlaps
methods.settle = function () {
  let ptrs = this.fullPointer
  ptrs.forEach(ptr => {
    ptrs = getUnion(ptrs, [ptr])
  })
  return this.update(ptrs)
}

export default methods
