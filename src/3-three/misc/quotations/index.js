import select from '../../_select.js'
import { find, strip } from './fns.js'

const api = function (View) {

  class Quotations extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Possessives'
    }
    text(fmt) {
      if (!fmt || fmt === 'text') {
        return super.text({ keepEndPunct: true })
      }
      if (typeof fmt === 'object') {
        return super.text({ keepEndPunct: true, ...fmt })
      }
      return super.text(fmt)
    }
    strip() {
      return strip(this)
    }
  }

  View.prototype.quotations = select(Quotations, find)
}
export default api
