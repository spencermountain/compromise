import select from '../../_select.js'
import { find, strip } from './fns.js'

const api = function (View) {
  class Parentheses extends View {
    strip() {
      return strip(this)
    }
  }
  Parentheses.prototype.viewType = 'Parentheses'

  View.prototype.parentheses = select(Parentheses, find)
}
export default api
