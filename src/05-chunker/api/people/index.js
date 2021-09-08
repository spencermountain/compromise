import find from './find.js'

const addMethod = function (View) {
  /**
   *
   */
  class People extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'People'
    }
  }

  View.prototype.people = function (n) {
    this.compute('chunks')
    let m = find(this)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new People(this.document, m.pointer)
  }
}
export default addMethod
