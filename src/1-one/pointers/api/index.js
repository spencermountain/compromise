
const getDoc = (m, view) => {
  return typeof m === 'string' ? view.match(m) : m
}

// 'harden' our json pointers, again
const addIds = function (ptrs, docs) {
  return ptrs.map(ptr => {
    let [n, start] = ptr
    if (docs[n][start]) {
      ptr[3] = docs[n][start].id
    }
    return ptr
  })
}

const methods = {}

// all parts, minus duplicates
methods.union = function (m) {
  const { getUnion } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getUnion(this.fullPointer, m.fullPointer)
  ptrs = addIds(ptrs, this.document)
  return this.toView(ptrs)
}
methods.and = methods.union

// only parts they both have
methods.intersection = function (m) {
  const { getIntersection } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getIntersection(this.fullPointer, m.fullPointer)
  ptrs = addIds(ptrs, this.document)
  return this.toView(ptrs)
}

// only parts of a that b does not have
methods.difference = function (m) {
  const { getDifference } = this.methods.one
  m = getDoc(m, this)
  let ptrs = getDifference(this.fullPointer, m.fullPointer)
  ptrs = addIds(ptrs, this.document)
  return this.toView(ptrs)
}
methods.not = methods.difference

// get opposite of a
methods.complement = function () {
  const { getDifference } = this.methods.one
  let doc = this.all()
  let ptrs = getDifference(doc.fullPointer, this.fullPointer)
  ptrs = addIds(ptrs, this.document)
  return this.toView(ptrs)
}

// remove overlaps
methods.settle = function () {
  const { getUnion } = this.methods.one
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
