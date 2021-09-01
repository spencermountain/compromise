import find from './find.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'

const findVerbs = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    parse(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return parseVerb(doc)
    }
    json(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(vb => {
        let json = vb.json()[0]
        json.verb = toJSON(vb)
        return json
      })
    }
  }

  View.prototype.verbs = function (n) {
    this.compute('chunks')
    let vb = find(this)
    // m = splitComma(m)
    if (typeof n === 'number') {
      vb = vb.get(n)
    }
    return new Verbs(this.document, vb.pointer)
  }
}
export default findVerbs
