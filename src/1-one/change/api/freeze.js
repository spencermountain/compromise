
const looksOk = function (terms, ids) {

}



const methods = {
  // allow re-use of this view, after a mutation
  freeze: function () {
    this.compute('uuid')
    let docs = this.docs
    let pointer = this.fullPointer
    pointer = pointer.map((a, n) => {
      let ids = docs[n].map(t => t.uuid)
      a.push(ids)
      return a
    })
    this.ptrs = pointer
    this.frozen = true
    return this
  },
  // make it fast again
  unfreeze: function () {
    let pointer = this.fullPointer
    pointer = pointer.map((a, n) => {
      return a.slice(0, 3)
    })
    this.ptrs = pointer
    delete this.frozen
    return this
  },
  // fix a potentially-broken match
  repair: function () {
    let ptrs = []
    let document = this.document
    this.ptrs.forEach(ptr => {
      let [n, i, end, ids] = ptr
      let terms = document[n].slice(i, end)
      if (looksOk(terms, ids)) {
        ptrs.push(ptr)
        return
      }
    })
    return this
  }
}
export default methods
