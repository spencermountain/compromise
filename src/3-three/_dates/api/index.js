import find from './find.js'

const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {

  class Dates extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Nouns'
    }

    fmt(n) {
      console.log('=-=-=-= here -=-=-=-')
    }

    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.dates !== true) {
          json.dates = {}
        }
        return json
      }, [])
    }
  }

  View.prototype.dates = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new Dates(this.document, m.pointer)
  }
}

export default api