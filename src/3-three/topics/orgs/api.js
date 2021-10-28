// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  View.prototype.organizations = function (n) {
    let m = this.match('#Organization+')
    return getNth(m, n)
  }
}
export default api
