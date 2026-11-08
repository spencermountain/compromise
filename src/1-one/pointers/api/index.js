import getUnion from './lib/union.js'
import getDifference from './lib/difference.js'
import getIntersection from './lib/intersection.js'
import { getDoc } from './lib/_lib.js'

// 'harden' our json pointers, again
const addIds = function (ptrs, docs) {
  return ptrs.map(ptr => {
    const [n, start] = ptr
    if (docs[n] && docs[n][start]) {
      ptr[3] = docs[n][start].id
    }
    return ptr
  })
}

// a new view from the pointers
const toView = (view, ptrs) => view.toView(addIds(ptrs, view.document))

// combine our pointers with another view's
const setOp = fn => function (m) {
  m = getDoc(m, this)
  return toView(this, fn(this.fullPointer, m.fullPointer))
}

const methods = {}

// all parts, minus duplicates
methods.union = setOp(getUnion)
methods.and = methods.union

// only parts they both have
methods.intersection = setOp(getIntersection)

// only parts of a that b does not have
methods.not = setOp(getDifference)
methods.difference = methods.not

// get opposite of a match
methods.complement = function () {
  return toView(this, getDifference(this.all().fullPointer, this.fullPointer))
}

// remove overlaps
methods.settle = function () {
  let ptrs = this.fullPointer
  ptrs.forEach(ptr => {
    ptrs = getUnion(ptrs, [ptr])
  })
  ptrs = addIds(ptrs, this.document)
  return this.update(ptrs)
}

const addAPI = function (View) {
  // add set/intersection/union
  Object.assign(View.prototype, methods)
}
export default addAPI
