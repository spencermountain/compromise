const methods = {
  // allow re-use of this view, after a mutation
  freeze: function () {
    this.frozen = this.docs
    return this
  },
  // make it fast again
  unfreeze: function () {
    this.frozen = null
    return this
  },
}
export default methods
