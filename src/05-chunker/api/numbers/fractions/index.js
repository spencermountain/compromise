import find from './find.js'
import parse from './parse.js'

const addMethod = function (View) {
  /**
   *
   */
  class Fractions extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Fractions'
    }
    parse(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(parse)
    }
    get(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(parse) //.map(o => o.num)
    }
    json(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(p => {
        let json = p.json()[0]
        let parsed = parse(p)
        json.fraction = parsed
        return json
      })
    }
  }

  View.prototype.fractions = function (n) {
    let m = find(this)
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Fractions(this.document, m.pointer)
  }
}

export default addMethod
