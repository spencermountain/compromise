
const api = function (View) {
  View.prototype.organizations = function (n) {
    const m = this.match('#Organization+')
    return m.getNth(n)
  }
}
export default api
