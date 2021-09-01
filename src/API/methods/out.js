import debug from './debug/index.js'
import out from './lib/out.js'
import json from './lib/json.js'
import { textFromDoc } from './lib/text.js'

const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const fmts = {
  text: {
    use: 'text',
  },
  normal: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'normal',
  },
  machine: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'none',
    unicode: 'some',
    use: 'machine',
  },
  root: {
    whitespace: 'some',
    punctuation: 'some',
    case: 'some',
    unicode: 'some',
    use: 'normal',
  },
}
fmts.clean = fmts.normal
fmts.reduced = fmts.root

const methods = {
  /** return data */
  json: function (n) {
    let res = json(this, n)
    if (typeof n === 'number') {
      return res[n]
    }
    return res
  },
  /** */
  text: function (fmt) {
    let opts = {
      keepSpace: true,
      keepPunct: true,
    }
    if (fmt && typeof fmt === 'string' && fmts.hasOwnProperty(fmt)) {
      opts = Object.assign({}, fmts[fmt])
    } else if (fmt && isObject(fmt)) {
      opts = Object.assign({}, fmt, opts)
    }
    if (this.pointer) {
      opts.keepSpace = false
      let ptr = this.pointer[0]
      if (ptr && ptr[1]) {
        opts.keepPunct = false
      }
    }
    return textFromDoc(this.docs, opts)
  },
  /** */
  debug: debug,
  /** */
  out: out,
}
// aliases
methods.data = methods.json

export default methods
