import { textFromDoc } from './_text.js'
import fmts from './_fmts.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

export default {
  /** */
  text: function (fmt) {
    let opts = {
      keepSpace: true,
      keepPunct: true,
    }
    if (fmt && typeof fmt === 'string' && fmts.hasOwnProperty(fmt)) {
      opts = Object.assign({}, fmts[fmt])
    } else if (fmt && isObject(fmt)) {
      opts = Object.assign({}, fmt, opts)//todo: fixme
    }
    if (this.pointer) {
      opts.keepSpace = false
      let ptr = this.pointer[0]
      if (ptr && ptr[1]) {
        opts.keepPunct = false
      } else {
        opts.keepPunct = true
      }
    } else {
      opts.keepPunct = true
    }
    return textFromDoc(this.docs, opts)
  },
}
