export default {
  // compile a list of matches into a match-net
  buildNet: function (matches) {
    const methods = this.methods()
    let { index, always } = methods.two.makeNet(matches, methods)
    return {
      isNet: true,
      index,
      always
    }
  }
}