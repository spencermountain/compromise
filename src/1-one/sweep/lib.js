export default {
  // compile a list of matches into a match-net
  buildNet: function (matches) {
    const methods = this.methods()
    const net = methods.one.buildNet(matches, this.world())
    net.isNet = true
    return net
  }
}