import { getDifference, indexN } from '../lib/pointers/index.js'

// transfer sentence-ending punctuation
const repairPunct = function (terms, len) {
  let last = terms.length - 1
  let from = terms[last]
  let to = terms[last - len]
  if (to && from) {
    to.post += from.post //this isn't perfect.
    to.post = to.post.replace(/ +([.?!])/, '$1')
  }
}

const methods = {
  /** */
  fork: function () {
    return this
  },
  /** */
  remove: function (reg) {
    let m = this
    let og = this.fullPointer
    if (reg) {
      m = this.match(reg)
    }
    let document = m.document
    // remove terms from the document
    let removed = []
    let nots = m.fullPointer.reverse()
    nots.forEach(ptr => {
      let [n, start, end] = ptr
      let len = end - start
      removed.push([n, start, start + len])
      if (end === document[n].length && end > 1) {
        repairPunct(document[n], len)
      }
      document[n].splice(start, len) // replaces len terms at index start
    })
    let ptrs = getDifference(og, removed.reverse())
    // remove any now-empty sentences
    this.document = document.filter((arr, i) => {
      if (arr.length > 0) {
        return true
      }
      // step any further-n pointers back
      for (let k = 0; k < ptrs.length; k += 1) {
        if (ptrs[k][0] > i) {
          ptrs[k][0] -= 1
        }
      }
      return false
    })

    // now that the document has been spliced, we need to repair downstream pointers
    let byN = indexN(ptrs)
    nots.forEach(not => {
      let [n] = not
      let maybes = byN[n] || []
      maybes.forEach(ptr => {
        // is it after a not?
        if (ptr[1] > not[1]) {
          let len = not[2] - not[1]
          ptr[1] -= len
          ptr[2] -= len
        }
      })
    })
    this.ptrs = ptrs
    return this.update(ptrs)
  },
}
// aliases
methods.delete = methods.remove
export default methods
