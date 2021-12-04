import find from './find.js'
import parse from './parse.js'
import gender from './gender.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

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
      return getNth(this, n).map(parse)
    }
    json(n) {
      let doc = getNth(this, n)
      return doc.map(p => {
        let json = p.toView().json()[0]
        let parsed = parse(p)
        json.person = {
          firstName: parsed.firstName.text('normal'),
          lastName: parsed.lastName.text('normal'),
          honorific: parsed.honorific.text('normal'),
          presumed_gender: gender(parsed, p),
        }
        return json
      }, [])
    }
    // overloaded - keep People class
    update(pointer) {
      let m = new People(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }

  View.prototype.people = function (n) {
    let m = find(this)
    m = getNth(m, n)
    return new People(this.document, m.pointer)
  }
}
export default addMethod
