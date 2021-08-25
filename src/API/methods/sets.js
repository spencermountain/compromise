import { getUnion, getIntersection, getDifference } from '../../lib/pointers/index.js'

const getDoc = (m, view) => {
  return typeof m === 'string' ? view.match(m) : m
}

// all parts, minus duplicates
const union = function (m) {
  m = getDoc(m, this)
  let ptrs = getUnion(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}

// only parts they both have
const intersection = function (m) {
  m = getDoc(m, this)
  let ptrs = getIntersection(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}

// only parts of a that b does not have
const difference = function (m) {
  m = getDoc(m, this)
  let ptrs = getDifference(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}

// get opposite of a
const complement = function () {
  let doc = this.all()
  let ptrs = getDifference(doc.fullPointer, this.fullPointer)
  return this.update(ptrs)
}
export default { union, intersection, difference, complement }
