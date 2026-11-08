import pluckOutTerm from './lib/remove.js'
import expandContraction from './lib/_expand.js'

// which sentences will have no terms left?
const getEmptied = function (gonePtrs, document) {
  return Object.keys(gonePtrs).map(Number).filter(n => {
    const count = gonePtrs[n].reduce((sum, no) => sum + no[2] - no[1], 0)
    return document[n] && count >= document[n].length
  })
}

// gonePtrs must run from last-to-first, in each sentence
const fixPointers = function (ptrs, gonePtrs, emptied) {
  ptrs = ptrs.map(ptr => {
    const [n] = ptr
    const gone = gonePtrs[n] || []
    gone.forEach(no => {
      const len = no[2] - no[1]
      // does it effect our pointer?
      if (ptr[1] <= no[1] && ptr[2] >= no[2]) {
        ptr[2] -= len
      } else if (ptr[1] >= no[2]) {
        // terms before our pointer are gone
        ptr[1] -= len
        ptr[2] -= len
      }
    })
    // sentences before our pointer are gone
    ptr[0] -= emptied.filter(k => k < n).length
    // remove old hard-pointers
    ptr[3] = null
    ptr[4] = null
    return ptr
  })
  // remove any now-empty pointers
  return ptrs.filter(ptr => ptr[2] - ptr[1] > 0)
}

const methods = {
  /** */
  remove: function (reg) {
    const { indexN } = this.methods.one.pointer
    this.uncache()
    // two modes:
    //  - a. remove self, from full parent
    let self = this.all()
    let not = this
    //  - b. remove a match, from self
    if (reg) {
      self = this
      not = this.match(reg)
    }
    const isFull = !self.ptrs
    // is it part of a contraction?
    expandContraction(not)

    let ptrs = self.fullPointer
    const nots = not.fullPointer.reverse()
    const gonePtrs = indexN(nots)
    const emptied = getEmptied(gonePtrs, this.document)
    // remove them from the actual document)
    const document = pluckOutTerm(this.document, nots)
    // repair our pointers
    ptrs = fixPointers(ptrs, gonePtrs, emptied)
    // clean up our original inputs
    self.ptrs = ptrs
    self.document = document
    self.compute('index')
    // if we started zoomed-out, try to end zoomed-out
    if (isFull) {
      self.ptrs = undefined
    }
    if (!reg) {
      this.ptrs = []
      return self.none()
    }
    const res = self.toView(ptrs) //return new document
    return res
  },
}

// aliases
methods.delete = methods.remove
export default methods
