const api = function (View) {

  /** speedy match a sequence of matches */
  View.prototype.sweep = function (net) {
    const { world, document } = this
    const { methods } = world
    let found = methods.two.bulkMatch(document, net.index, this.methods)

    // apply any changes
    methods.two.bulkTagger(found, document, this.world)

    // collect all found results into a View
    let ptrs = found.map(o => o.pointer)

    // cleanup results a bit
    found = found.map(obj => {
      obj.view = this.update([obj.pointer])
      delete obj.regs
      delete obj.needs
      delete obj.pointer
      delete obj._expanded
      return obj
    })
    return {
      view: this.update(ptrs),
      found
    }
  }

}
export default api