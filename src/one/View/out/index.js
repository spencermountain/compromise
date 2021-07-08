import debug from './debug.js'
import out from './out.js'
import { textFromDoc, textFromTerms } from './text.js'

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
  text: function () {
    let keepSpace = true
    let keepPunct = true
    if (this.pointer) {
      keepSpace = false
      let ptr = this.pointer[0]
      if (ptr && ptr[1]) {
        keepPunct = false
      }
    }
    return textFromDoc(this.docs, keepSpace, keepPunct)
  },
  /** */
  debug: debug,
  /** */
  out: out,
}
export default methods
