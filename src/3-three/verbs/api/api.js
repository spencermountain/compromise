import find from '../find.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'
import debug from './debug.js'
import toPast from './conjugate/toPast/index.js'
import toPresent from './conjugate/toPresent/index.js'
import toFuture from './conjugate/toFuture/index.js'
import getSubject from './parse/subject/index.js'
import getGrammar from './parse/grammar/index.js'

// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

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
    toPresentTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        console.log(info)
        return toPresent(vb, parsed)
      })
    }
    toPastTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        return toPast(vb, parsed)
      })
    }
    toFutureTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        return toFuture(vb, parsed)
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
