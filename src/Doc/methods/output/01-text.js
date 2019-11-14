/** return the document as text */
exports.text = function(options) {
  options = options || {}
  //are we showing every phrase?
  let showFull = false
  if (this.parents().length === 0) {
    showFull = true
  }
  // cache roots, if necessary
  if (options === 'root' || (typeof options === 'object' && options.root)) {
    this.list.forEach(p => {
      p.terms().forEach(t => {
        if (t.root === null) {
          t.setRoot(this.world)
        }
      })
    })
  }

  return this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0
    const trimPost = !showFull && i === this.list.length - 1
    return str + p.text(options, trimPre, trimPost)
  }, '')
}
