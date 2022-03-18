
export default {
  /** pre-parse any match statements */
  parseMatch: function (str, opts) {
    const world = this.world()
    return world.methods.one.parseMatch(str, opts)
  }
}