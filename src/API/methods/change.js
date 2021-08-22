const methods = {
  /** */
  fork: function () {
    return this
  },
  /** */
  remove: function (reg) {
    let doc = this
    if (reg) {
      doc = this.match(reg)
    }
    let ptrs = doc.fullPointer.reverse()
    let document = doc.document
    ptrs.forEach(ptr => {
      let [n, start, end] = ptr
      let len = end - start
      document[n].splice(start, len) // replaces len terms at index start
    })
    // remove any now-empty sentences
    ptrs.forEach(ptr => {
      let n = ptr[0]
      if (document[n].length === 0) {
        document.splice(n, 1)
      }
    })
    // remove the cached 'docs'
    // this.docs = undefined
    return this
  },
}
// aliases
methods.delete = methods.remove
export default methods
