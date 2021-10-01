import find from './find.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

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
