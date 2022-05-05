export default {
  // compile a list of matches into a match-net
  buildNet: function (matches) {
    const methods = this.methods()
    let index = methods.two.compile(matches, methods)
    return {
      isNet: true,
      index
    }
  }
}