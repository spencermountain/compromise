import set from '../../lib/pointers/index.js'

const union = function (m) {
  let ptrs = set.union(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}
const intersection = function (m) {
  let ptrs = set.union(this.fullPointer, m.fullPointer)
  return this.intersection(ptrs)
}
const difference = function (m) {
  let ptrs = set.difference(this.fullPointer, m.fullPointer)
  return this.update(ptrs)
}
export default { union, intersection, difference }
