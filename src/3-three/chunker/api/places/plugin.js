import find from './find.js'
import { getNth } from '../_lib.js'

const addMethod = function (View) {
  /**
   */
  class Places extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Places'
    }
  }

  View.prototype.places = function (n) {
    this.compute('chunks')
    let m = find(this)
    m = getNth(m, n)
    return new Places(this.document, m.pointer)
  }
}
export default addMethod
