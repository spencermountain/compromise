import { textFromDoc } from './lib/_text.js'
import fmts from './_fmts.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export default {
  /** */
  text: function (fmt) {
    let opts = {}
    if (fmt && typeof fmt === 'string' && fmts.hasOwnProperty(fmt)) {
      opts = Object.assign({}, fmts[fmt])
    } else if (fmt && isObject(fmt)) {
      opts = Object.assign({}, fmt)//todo: fixme
    }
    if (opts.keepSpace === undefined && this.pointer) {
      opts.keepSpace = false
    }
    if (opts.keepPunct === undefined && this.pointer) {
      let ptr = this.pointer[0]
      if (ptr && ptr[1]) {
        opts.keepPunct = false
      } else {
        opts.keepPunct = true
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
