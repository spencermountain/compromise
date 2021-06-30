import debug from './debug.js'
import out from './out.js'
const methods = {
  /** return data */
  json: function () {
    return this.docs.map(terms => {
      return terms.map(t => {
        t.tags = Array.from(t.tags)
        return t
      })
    })
  },
  /** */
  text: function () {
    return this.docs.reduce((txt, terms) => {
      terms.forEach(t => (txt += t.pre + t.text + t.post))
      return txt
    }, '')
  },
  /** */
  debug: debug,
  /** */
  out: out,
}
export default methods
