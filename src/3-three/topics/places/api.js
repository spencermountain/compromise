import find from './find.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const addMethod = function (View) {
  View.prototype.places = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new View(this.document, m.pointer)
  }
}
export default addMethod
