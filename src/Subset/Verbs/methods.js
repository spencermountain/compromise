const toNegative = require('./toNegative')
const parseVerb = require('./parse')
const isPlural = require('./isPlural')
const getSubject = require('./getSubject')
const conjugate = require('./conjugate')
const isImperative = require('./conjugate/imperative').isImperative
const { toParticiple, useParticiple } = require('./participle')

// remove any tense-information in auxiliary verbs
const makeNeutral = function (parsed) {
  //remove tense-info from auxiliaries
  parsed.auxiliary.remove('(will|are|am|being)')
  parsed.auxiliary.remove('(did|does)')
  parsed.auxiliary.remove('(had|has|have)')
  //our conjugation includes the 'not' and the phrasal-verb particle
  parsed.particle.remove()
  parsed.negative.remove()
  return parsed
}

module.exports = {
  /** overload the original json with verb information */
  json: function (options) {
    let n = null
    if (typeof options === 'number') {
      n = options
      options = null
    }
    options = options || { text: true, normal: true, trim: true, terms: true }
    let res = []
    this.forEach(p => {
      let json = p.json(options)[0]
      let parsed = parseVerb(p)
      json.parts = {}
      Object.keys(parsed).forEach(k => {
        if (parsed[k] && parsed[k].isA === 'Doc') {
          json.parts[k] = parsed[k].text('normal')
        } else {
          json.parts[k] = parsed[k]
        }
      })
      json.isNegative = p.has('#Negative')
      json.conjugations = conjugate(parsed, this.world)
      res.push(json)
    })
    if (n !== null) {
      return res[n]
    }
    return res
  },

  /** grab the adverbs describing these verbs */
  adverbs: function () {
    let list = []
    // look at internal adverbs
    this.forEach(vb => {
      let advb = parseVerb(vb).adverb
      if (advb.found) {
        list = list.concat(advb.list)
      }
    })
    // look for leading adverbs
    let m = this.lookBehind('#Adverb+$')
    if (m.found) {
      list = m.list.concat(list)
    }
    // look for trailing adverbs
    m = this.lookAhead('^#Adverb+')
    if (m.found) {
      list = list.concat(m.list)
    }
    return this.buildFrom(list)
  },

  /// Verb Inflection
  /**return verbs like 'we walk' and not 'spencer walks' */
  isPlural: function () {
    let list = []
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      if (isPlural(parsed, this.world) === true) {
        list.push(vb.list[0])
      }
    })
    return this.buildFrom(list)
  },
  /** return verbs like 'spencer walks' and not 'we walk' */
  isSingular: function () {
    let list = []
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      if (isPlural(parsed, this.world) === false) {
        list.push(vb.list[0])
      }
    })
    return this.buildFrom(list)
  },

  /// Conjugation
  /** return all forms of this verb  */
  conjugate: function () {
    let result = []
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let forms = conjugate(parsed, this.world)
      result.push(forms)
    })
    return result
  },
  /** walk ➔ walked*/
  toPastTense: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      // should we support 'would swim' ➔ 'would have swam'
      if (useParticiple(parsed)) {
        toParticiple(parsed, this.world)
        return
      }
      if (isImperative(parsed)) {
        return
      }
      // don't conjugate 'to be'
      if (vb.has('be') && vb.lookBehind('to$').found) {
        return
      }
      // handle 'is raining' -> 'was raining'
      if (parsed.verb.has('#Gerund') && parsed.auxiliary.has('(is|will|was)')) {
        vb.replace('is', 'was')
        return
      }
      let str = conjugate(parsed, this.world).PastTense
      if (str) {
        parsed = makeNeutral(parsed)
        parsed.verb.replaceWith(str, false)
        // vb.tag('PastTense')
      }
    })
    return this
  },
  /** walk ➔ walks */
  toPresentTense: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)

      let obj = conjugate(parsed, this.world)
      let str = obj.PresentTense
      // 'i look', not 'i looks'
      if (vb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
        str = obj.Infinitive
      }
      if (str) {
        //awkward support for present-participle form
        // -- should we support 'have been swimming' ➔ 'am swimming'
        if (parsed.auxiliary.has('(have|had) been')) {
          parsed.auxiliary.replace('(have|had) been', 'am being')
          if (obj.Particle) {
            str = obj.Particle || obj.PastTense
          }
          return
        }
        parsed.verb.replaceWith(str, false)
        parsed.verb.tag('PresentTense')
        parsed = makeNeutral(parsed)
        // avoid 'he would walks'
        parsed.auxiliary.remove('#Modal')
      }
    })
    return this
  },
  /** walk ➔ will walk*/
  toFutureTense: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      // 'i should drive' is already future-enough
      if (useParticiple(parsed)) {
        return
      }
      let str = conjugate(parsed, this.world).FutureTense
      if (str) {
        parsed = makeNeutral(parsed)
        // avoid 'he would will go'
        parsed.auxiliary.remove('#Modal')
        parsed.verb.replaceWith(str, false)
        parsed.verb.tag('FutureTense')
      }
    })
    return this
  },
  /** walks ➔ walk */
  toInfinitive: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).Infinitive
      if (str) {
        vb.replaceWith(str, false)
        vb.tag('Infinitive')
      }
    })
    return this
  },
  /** walk ➔ walking */
  toGerund: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).Gerund
      if (str) {
        vb.replaceWith(str, false)
        vb.tag('Gerund')
      }
    })
    return this
  },
  /** drive ➔ driven - naked past-participle if it exists, otherwise past-tense */
  toParticiple: function () {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let noAux = !parsed.auxiliary.found
      toParticiple(parsed, this.world)
      // dirty trick to  ensure our new auxiliary is found
      if (noAux) {
        parsed.verb.prepend(parsed.auxiliary.text())
        parsed.auxiliary.remove()
      }
    })
    return this
  },

  /// Negation
  /** return only verbs with 'not'*/
  isNegative: function () {
    return this.if('#Negative')
  },
  /**  return only verbs without 'not'*/
  isPositive: function () {
    return this.ifNo('#Negative')
  },
  /** add a 'not' to these verbs */
  toNegative: function () {
    this.list.forEach(p => {
      let doc = this.buildFrom([p])
      let parsed = parseVerb(doc)
      toNegative(parsed, doc.world)
    })
    return this
  },
  /** remove 'not' from these verbs */
  toPositive: function () {
    let m = this.match('do not #Verb')
    if (m.found) {
      m.remove('do not')
    }
    return this.remove('#Negative')
  },
  /** who, or what is doing this action? */
  subject: function () {
    let list = []
    this.forEach(p => {
      let found = getSubject(p)
      if (found.list[0]) {
        list.push(found.list[0])
      }
    })
    return this.buildFrom(list)
  },
}
