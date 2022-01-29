
const methods = {
  // allow re-use of this view, after a mutation
  freeze: function () {
    this.compute('uuid')
    let docs = this.docs
    let pointer = this.fullPointer
    pointer = pointer.map((a, n) => {
      a[3] = docs[n].map(t => t.uuid)
      return a
    })
    this.ptrs = pointer
    this.frozen = true
    return this
  },
  // make it fast again
  unFreeze: function () {
    let pointer = this.fullPointer
    pointer = pointer.map((a, n) => {
      return a.slice(0, 3)
    })
    this.ptrs = pointer
    delete this.frozen
    return this
  },
  // helper method for freeze-state
  isFrozen: function () {
    return Boolean(this.fullPointer[0] && this.fullPointer[0][3])
  },

}
// aliases
methods.unfreeze = methods.unFreeze
export default methods
