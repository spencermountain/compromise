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
}
export default methods
