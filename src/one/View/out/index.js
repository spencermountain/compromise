import debug from './debug.js'
import out from './out.js'
import { textFromDoc, textFromTerms } from './text.js'

const toText = function (terms) {
  return terms.reduce((txt, t) => {
    txt += t.pre + t.text + t.post
    return txt
  }, '')
}

const methods = {
  /** return data */
  json: function () {
    return this.docs.map(terms => {
      return {
        text: textFromTerms(terms, false),
        terms: terms.map(t => {
          t.tags = Array.from(t.tags)
          return t
        }),
      }
    })
  },
  /** */
  text: function () {
    let perfect = this.pointer ? false : true
    return textFromDoc(this.docs, perfect)
  },
  /** */
  debug: debug,
  /** */
  out: out,
}
export default methods
