import find from './find.js'
import parse from './parse.js'
const addMethod = function (View) {
  /**
   *
   */
  class People extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'People'
    }
    parse(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(parse)
    }
    json(n) {
      let doc = this
      if (typeof n === 'number') {
        doc = doc.eq(n)
      }
      return doc.map(p => {
        let json = p.json()[0]
        let parsed = parse(p)
        json.person = {
          firstName: parsed.firstName.text('normal'),
          lastName: parsed.lastName.text('normal'),
          honorific: parsed.honorific.text('normal'),
        }
        return json
      })
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
