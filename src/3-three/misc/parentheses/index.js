import { find, strip } from './fns.js'
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Parentheses extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Possessives'
    }
    strip() {
      return strip(this)
    }
  }

  View.prototype.parentheses = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Parentheses(m.document, m.pointer)
  }
}
export default api
