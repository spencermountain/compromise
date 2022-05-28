export default {
  // compile a list of matches into a match-net
  buildNet: function (matches) {
    const methods = this.methods()
    let { index, always } = methods.one.makeNet(matches, methods)
    return {
      isNet: true,
      index,
      always
    }
  }
}