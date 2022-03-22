import find from '../find.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'
import toInfinitive from './conjugate/toInfinitive.js'
import toPast from './conjugate/toPast.js'
import toPresent from './conjugate/toPresent.js'
import toFuture from './conjugate/toFuture.js'
import toGerund from './conjugate/toGerund.js'
import getSubject from './parse/getSubject.js'
import getGrammar from './parse/grammar/index.js'
import toNegative from './conjugate/toNegative.js'
// import debug from './debug.js'


// return the nth elem of a doc
export const getNth = (doc, n) => (typeof n === 'number' ? doc.eq(n) : doc)

const api = function (View) {
  class Verbs extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Verbs'
    }
    parse(n) {
      return getNth(this, n).map(parseVerb)
    }
    json(opts, n) {
      let m = getNth(this, n).reverse()
      let arr = m.map(vb => {
        let json = vb.toView().json(opts)[0] || {}
        json.verb = toJSON(vb)
        return json
      }, [])
      return arr.reverse()
    }
    subjects(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        return getSubject(vb, parsed).subject
      })
    }
    adverbs(n) {
      return getNth(this, n).map(vb => vb.match('#Adverb'))
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
    isImperative(n) {
      return getNth(this, n).filter(vb => vb.has('#Imperative'))
    }
    toInfinitive(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toInfinitive(vb, parsed, info.form)
      })
    }
    toPresentTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toPresent(vb, parsed, info.form)
      })
    }
    toPastTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toPast(vb, parsed, info.form)
      })
    }
    toFutureTense(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toFuture(vb, parsed, info.form)
      })
    }
    toGerund(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toGerund(vb, parsed, info.form)
      })
    }
    conjugate(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return {
          Infinitive: toInfinitive(vb.clone(), parsed, info.form).text('normal'),
          PastTense: toPast(vb.clone(), parsed, info.form).text('normal'),
          PresentTense: toPresent(vb.clone(), parsed, info.form).text('normal'),
          FutureTense: toFuture(vb.clone(), parsed, info.form).text('normal'),
        }
      }, [])
    }

    /** return only verbs with 'not'*/
    isNegative() {
      return this.if('#Negative')
    }
    /**  return only verbs without 'not'*/
    isPositive() {
      return this.ifNo('#Negative')
    }
    /** remove 'not' from these verbs */
    toPositive() {
      let m = this.match('do not #Verb')
      if (m.found) {
        m.remove('do not')
      }
      return this.remove('#Negative')
    }
    toNegative(n) {
      return getNth(this, n).map(vb => {
        let parsed = parseVerb(vb)
        let info = getGrammar(vb, parsed)
        return toNegative(vb, parsed, info.form)
      })
    }
    // overloaded - keep Verb class
    update(pointer) {
      let m = new Verbs(this.document, pointer)
      m._cache = this._cache // share this full thing
      return m
    }
  }
  Verbs.prototype.toPast = Verbs.prototype.toPastTense
  Verbs.prototype.toPresent = Verbs.prototype.toPresentTense
  Verbs.prototype.toFuture = Verbs.prototype.toFutureTense

  View.prototype.verbs = function (n) {
    let vb = find(this)
    vb = getNth(vb, n)
    return new Verbs(this.document, vb.pointer)
  }
}
export default api
