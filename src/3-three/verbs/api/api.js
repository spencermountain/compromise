import select from '../../_select.js'
import keepClass, { keepTags as keep } from '../../_lib.js'
import find from '../find.js'
import coordinate from './conjugate/coordinate.js'
import toJSON from './toJSON.js'
import parseVerb from './parse/index.js'
import toInf from './conjugate/toInfinitive.js'
import toPast from './conjugate/toPast.js'
import toParticiple from './conjugate/toParticiple.js'
import toPresent from './conjugate/toPresent.js'
import toFuture from './conjugate/toFuture.js'
import toGerund from './conjugate/toGerund.js'
import getSubject from './parse/getSubject.js'
import getGrammar from './parse/grammar/index.js'
import toNegative from './conjugate/toNegative.js'
import { inflect, infinitive } from './conjugate/inflect.js'
import { doTense } from './lib.js'
import { Inf, Aux, Neg } from '../../../2-two/preTagger/tagSet/_lib.js'
import { Imperative, SimplePres } from './parse/grammar/forms.js'

// convert each verb to a target form, leaving bare infinitives alone
const convert = (target, fn) => function (n) {
  return coordinate(this.getNth(n), target, vb => {
    const parsed = parseVerb(vb)
    const info = getGrammar(vb, parsed)
    if (info.isInfinitive) {
      return vb
    }
    return fn(vb, parsed, info.form)
  })
}

const api = function (View) {
  class Verbs extends View {
    parse(n) {
      return this.getNth(n).map(parseVerb)
    }
    json(opts, n) {
      const m = this.getNth(n)
      const arr = m.map(vb => {
        const json = vb.toView().json(opts)[0] || {}
        json.verb = toJSON(vb)
        return json
      }, [])
      return arr
    }
    subjects(n) {
      return this.getNth(n).map(vb => {
        const parsed = parseVerb(vb)
        return getSubject(vb, parsed).subject
      })
    }
    adverbs(n) {
      return this.getNth(n).map(vb => vb.match('#Adv'))
    }
    isSingular(n) {
      return this.getNth(n).filter(vb => {
        return getSubject(vb).plural !== true
      })
    }
    isPlural(n) {
      return this.getNth(n).filter(vb => {
        return getSubject(vb).plural === true
      })
    }
    isImperative(n) {
      return this.getNth(n).filter(vb => vb.has('#Imp'))
    }
    conjugate(n) {
      const { conjugate } = this.world.methods.two.transform.verb
      return this.getNth(n).map(vb => {
        const parsed = parseVerb(vb)
        const info = getGrammar(vb, parsed)
        // allow imperatives like 'go!' to be conjugated here (only)
        if (info.form === Imperative) {
          info.form = SimplePres
        }
        let inf = parsed.root.text('normal')
        if (!parsed.root.has('#Inf')) {
          inf = infinitive(parsed.root) || inf
        }
        return conjugate(inf, vb.model)
      }, [])
    }

    /** return only verbs with 'not'*/
    isNegative() {
      return this.if('#Neg')
    }
    /**  return only verbs without 'not'*/
    isPositive() {
      return this.ifNo('#Neg')
    }
    /** remove 'not' from these verbs */
    toPositive() {
      return coordinate(this, 'positive', vb => {
        const m = vb.match('do not #Verb')
        if (m.found) {
          m.remove('do not')
        }
        // The 'not' in 'not only' is tagged as an adverb.
        vb.match('not').tag(Neg)
        // 'does not walk' -> 'walks'
        const parsed = parseVerb(vb)
        const tense = doTense(parsed)
        if (tense) {
          const { root, auxiliary } = parsed
          vb.replace(root, inflect(root, tense), keep).unTag(Inf).tag(tense)
          vb.remove(auxiliary)
        }
        return vb.remove('#Neg')
      })
    }
    toNegative(n) {
      return coordinate(this.getNth(n), 'negative', vb => {
        const parsed = parseVerb(vb)
        const info = getGrammar(vb, parsed)
        const res = toNegative(vb, parsed, info.form)
        // An inserted 'does not' needs its auxiliary tag, and a place in the next verb selection.
        // Re-running the tagger here would let a repeat reach into other clauses.
        const sentence = vb.fullSentence()
        sentence.match('[(do|does|did)] not', 0).tag(Aux)
        sentence.compute('chunks')
        return res
      })
    }
  }
  keepClass(Verbs, 'Verbs')
  const toPresentTense = convert('present', toPresent)
  const toPastTense = convert('past', toPast)
  const toFutureTense = convert('future', toFuture)
  Object.assign(Verbs.prototype, {
    toInfinitive: convert('infinitive', toInf),
    toPresentTense,
    toPastTense,
    toFutureTense,
    toGerund: convert('gerund', toGerund),
    toPastParticiple: convert('participle', toParticiple),
    // aliases
    toPresent: toPresentTense,
    toPast: toPastTense,
    toFuture: toFutureTense,
  })

  View.prototype.verbs = select(Verbs, find, true)
}
export default api
