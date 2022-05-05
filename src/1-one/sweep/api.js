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

    // 
    let byIndex = {}
    found.forEach(obj => {
      byIndex[obj.index] = byIndex[obj.index] || []
      byIndex[obj.index].push({
        match: obj.match,
        tag: obj.tag,
        view: this.update([obj.pointer])
      })
    })
    let matches = Object.values(byIndex)

    return {
      view: this.update(ptrs),
      matches
    }
  }

}
export default api