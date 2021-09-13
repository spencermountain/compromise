import find from './find.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'
import debug from './debug.js'
import { getNth } from '../_lib.js'
import toPast from './conjugate/toPast/index.js'
import toPresent from './conjugate/toPresent/index.js'
import toFuture from './conjugate/toFuture/index.js'
import getSubject from './subject/index.js'

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
    subjects(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        return getSubject(vb, parsed).subject
      })
    }
    isSingular(n) {
      return getNth(this, n).filter(vb => {
        return getSubject(vb).plural !== true
      })
    }
    isPlural(n) {
      return getNth(this, n).filter(vb => {
        return getSubject(vb).plural === true
      })
    }
    conjugate(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        return {
          pastTense: toPast(vb, parsed),
          presentTense: toPresent(vb, parsed),
          futureTense: toFuture(vb, parsed),
        }
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
