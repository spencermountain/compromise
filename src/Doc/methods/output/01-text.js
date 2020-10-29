const shouldTrim = {
  clean: true,
  reduced: true,
  root: true,
}

/** return the document as text */
exports.text = function (options) {
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

  let txt = this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0
    const trimPost = !showFull && i === this.list.length - 1
    return str + p.text(options, trimPre, trimPost)
  }, '')

  // clumsy final trim of leading/trailing whitespace
  if (shouldTrim[options] === true || options.reduced === true || options.clean === true || options.root === true) {
    txt = txt.trim()
  }
  return txt
}
