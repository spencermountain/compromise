const api = function (View) {

  /** speedy match a sequence of matches */
  View.prototype.netMatch = function (net) {
    const { world, document } = this
    const { methods } = world
    let found = methods.two.bulkMatch(document, net.index, this.methods)

    // apply any changes
    methods.two.bulkTagger(found, document, this.world)

    let ptrs = []
    found.forEach(o => {
      ptrs.push(o.pointer)
    })

    return this.update(ptrs)
  }

}
export default api