import find from './find.js'
import parse from './parse.js'
import gender from './gender.js'
import { getNth } from '../_lib.js'

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
        let json = p.json()[0]
        let parsed = parse(p)
        json.person = {
          firstName: parsed.firstName.text('normal'),
          lastName: parsed.lastName.text('normal'),
          honorific: parsed.honorific.text('normal'),
          presumed_gender: gender(parsed, p),
        }
        return json
      })
    }
  }

  View.prototype.people = function (n) {
    this.compute('chunks')
    let m = find(this)
    m = getNth(m, n)
    return new People(this.document, m.pointer)
  }
}
export default addMethod