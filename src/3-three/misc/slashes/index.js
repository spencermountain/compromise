import select from '../../_select.js'
const hasSlash = /\//

const api = function (View) {

  class Slashes extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Slashes'
    }
    split() {
      return this.map((m) => {
        const str = m.text()
        const arr = str.split(hasSlash)
        m = m.replaceWith(arr.join(' '))
        return m.growRight('(' + arr.join('|') + ')+')
      })
    }
  }

  View.prototype.slashes = select(Slashes, '#SlashedTerm')
}
export default api
