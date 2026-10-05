import { textFromDoc } from './_text.js'
import fmts from './_fmts.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}
// a dash between two words, like '2025-05-11 - they'
const spacedDash = /^\s+[-—]\s+$/

export default {
  /** */
  text: function (fmt) {
    let opts = {}
    if (fmt && typeof fmt === 'string' && Object.hasOwn(fmts, fmt)) {
      opts = { ...fmts[fmt] }
    } else if (fmt && isObject(fmt)) {
      opts = { ...fmt } //todo: fixme
    }
    // is it a full document?
    if (opts.keepSpace === undefined && !this.isFull()) {
      //
      opts.keepSpace = false
    }
    if (opts.keepEndPunct === undefined && this.pointer) {
      const ptr = this.pointer[0]
      const lastTerm = this.docs.at(-1)?.at(-1)
      if (ptr?.[1] || spacedDash.test(lastTerm?.post)) {
        opts.keepEndPunct = false
      } else {
        opts.keepEndPunct = true
      }
    }
    // set defaults
    if (opts.keepPunct === undefined) {
      opts.keepPunct = true
    }
    if (opts.keepSpace === undefined) {
      opts.keepSpace = true
    }
    return textFromDoc(this.docs, opts)
  },
}
