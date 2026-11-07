import select from '../../_select.js'
import keepClass from '../../_lib.js'
import find from './find.js'
import parse from './parse.js'
import gender from './gender.js'


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
      return this.getNth(n).map(parse, [])
    }
    json(n) {
      const opts = typeof n === 'object' ? n : {}
      return this.getNth(n).map(p => {
        const json = p.toView().json(opts)[0]
        // read the names from a copy, without its possessive - "Biden's" → 'biden'
        const tmp = p.clone()
        tmp.possessives().strip()
        const parsed = parse(tmp)
        json.person = {
          firstName: parsed.firstName.text('normal'),
          lastName: parsed.lastName.text('normal'),
          honorific: parsed.honorific.text('normal'),
          presumed_gender: gender(parsed, p),
        }
        return json
      }, [])
    }
    // used for co-reference resolution only
    presumedMale() {
      return this.filter(m => {
        return m.has('(#MaleName|mr|mister|sr|jr|king|pope|prince|sir)')//todo configure these in .world
      })
    }
    presumedFemale() {
      return this.filter(m => {
        return m.has('(#FemaleName|mrs|miss|queen|princess|madam)')
      })
    }
  }
  keepClass(People)

  View.prototype.people = select(People, find, true)
}
export default addMethod
