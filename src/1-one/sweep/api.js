const api = function (View) {

  /** speedy match a sequence of matches */
  View.prototype.sweep = function (net, opts = {}) {
    const { world, docs } = this
    const { methods } = world
    let found = methods.two.bulkMatch(docs, net, this.methods, opts)

    // apply any changes
    if (opts.tagger !== false) {
      methods.two.bulkTagger(found, docs, this.world)
    }

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