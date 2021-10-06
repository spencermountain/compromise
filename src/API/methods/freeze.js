const methods = {
  // allow re-use of this view, after a mutation
  freeze: function () {
    // this.compute('index')
    this.frozen = this.docs
    return this
  },
}
export default methods
