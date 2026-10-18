import select from '../../_select.js'
import { find, strip } from './fns.js'

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

  View.prototype.parentheses = select(Parentheses, find)
}
export default api
