import debug from './lib/debug.js'
import out from './lib/out.js'
import { textFromDoc, textFromTerms } from './lib/text.js'

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
    use: 'root',
  },
  // normal: {
  //   form: 'normal',
  // },
  // clean: {
  //   form: 'normal',
  // },
  // reduced: {
  //   form: 'normal',
  // },
}

const methods = {
  /** return data */
  json: function (n) {
    let arr = this.docs.map(terms => {
      return {
        text: textFromTerms(terms, false),
        terms: terms.map(t => {
          t = Object.assign({}, t)
          t.tags = Array.from(t.tags)
          return t
        }),
      }
    })
    if (typeof n === 'number') {
      return arr[n]
    }
    return arr
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
