// import { getUnion, getIntersection, getDifference } from '../methods/lib/index.js'

const getDoc = (m, view) => {
  return typeof m === 'string' ? view.match(m) : m
}

const methods = {}

// all parts, minus duplicates
methods.union = function (m) {
  const { getUnion } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getUnion(this.fullPointer, m.fullPointer)
  return this.toView(ptrs)
}
methods.and = methods.union

// only parts they both have
methods.intersection = function (m) {
  const { getIntersection } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getIntersection(this.fullPointer, m.fullPointer)
  return this.toView(ptrs)
}

// only parts of a that b does not have
methods.difference = function (m) {
  const { getDifference } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getDifference(this.fullPointer, m.fullPointer)
  return this.toView(ptrs)
}
methods.not = methods.difference

// get opposite of a
methods.complement = function () {
  const { getDifference } = this.methods.one
  let doc = this.all()
  let ptrs = getDifference(doc.fullPointer, this.fullPointer)
  return this.toView(ptrs)
}

// remove overlaps
methods.settle = function () {
  const { getUnion } = this.methods.one
  let ptrs = this.fullPointer
  ptrs.forEach(ptr => {
    ptrs = getUnion(ptrs, [ptr])
  })
  return this.update(ptrs)
}

export default methods
