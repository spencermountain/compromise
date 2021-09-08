import find from './find.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'
import debug from './debug.js'
import { getNth } from '../_lib.js'

const findVerbs = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    parse(n) {
      return getNth(this, n).map(parseVerb)
    }
    debug() {
      debug(this)
      return this
    }
    json(n) {
      return getNth(this, n).map(vb => {
        let json = vb.json()[0]
        json.verb = toJSON(vb)
        return json
      })
    }
  }

  View.prototype.verbs = function (n) {
    this.compute('chunks')
    let vb = find(this)
    vb = getNth(vb, n)
    return new Verbs(this.document, vb.pointer)
  }
}
export default findVerbs
