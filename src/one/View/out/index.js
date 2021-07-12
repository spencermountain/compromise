import debug from './debug.js'
import out from './out.js'
import { textFromDoc, textFromTerms } from './text.js'

const lowerCase = new Set(['normal', 'clean', 'reduced', 'root'])
const noPunct = new Set(['reduced'])
const whitespace = new Set(['normal', 'clean', 'reduced', 'root'])
const isObject = val => {
  return Object.prototype.toString.call(val) === '[object Object]'
}

const methods = {
  /** return data */
  json: function (n) {
    let arr = this.docs.map(terms => {
      return {
        text: textFromTerms(terms, false),
        terms: terms.map(t => {
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
    if (fmt && typeof fmt === 'string') {
      if (lowerCase.has(fmt)) {
        opts.lowerCase = true
      }
      if (noPunct.has(fmt)) {
        // opts.fixPunctuation = true
      }
      if (whitespace.has(fmt)) {
        opts.cleanWhitespace = true
      }
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
