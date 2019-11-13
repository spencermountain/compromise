/** return the document as text */
exports.text = function(options = {}) {
  //are we showing every phrase?
  let showFull = false
  if (this.parents().length === 0) {
    showFull = true
  }
  return this.list.reduce((str, p, i) => {
    const trimPre = !showFull && i === 0
    const trimPost = !showFull && i === this.list.length - 1
    return str + p.text(options, trimPre, trimPost)
  }, '')
}
