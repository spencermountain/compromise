const toNegative = require('./toNegative')
const parseVerb = require('./parse')
const isPlural = require('./isPlural')
const conjugate = require('./tense/conjugate')
const toInfinitive = require('./tense/toInfinitive')

module.exports = {
  /** overload the original json with verb information */
  json: function(options) {
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
        json.parts[k] = parsed[k].text('normal')
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
  adverbs: function() {
    let list = []
    // look at internal adverbs
    this.forEach(vb => {
      let advb = parseVerb(vb).adverb
      if (advb.found) {
        list = list.concat(advb.list)
      }
    })
    // look for leading adverbs
    let m = this.lookBehind('#Adverb$')
    if (m.found) {
      list = m.list.concat(list)
    }
    // look for trailing adverbs
    m = this.lookAhead('^#Adverb')
    if (m.found) {
      list = list.concat(m.list)
    }
    return this.buildFrom(list)
  },
  /**return verbs like 'we walk' and not 'spencer walks' */
  isPlural: function() {
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
  isSingular: function() {
    let list = []
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      if (isPlural(parsed, this.world) === false) {
        list.push(vb.list[0])
      }
    })
    return this.buildFrom(list)
  },

  /**  */
  conjugate: function() {
    let result = []
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let forms = conjugate(parsed, this.world)
      result.push(forms)
    })
    return result
  },
  /** */
  toPastTense: function() {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).PastTense
      if (str) {
        vb.replaceWith(str, false, true)
        // vb.tag('PastTense')
      }
    })
    return this
  },
  /** */
  toPresentTense: function() {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).PresentTense
      if (str) {
        vb.replaceWith(str, false, true)
        vb.tag('PresentTense')
      }
    })
    return this
  },
  /** */
  toFutureTense: function() {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).FutureTense
      if (str) {
        vb.replaceWith(str, false, true)
        vb.tag('FutureTense')
      }
    })
    return this
  },
  /** */
  toInfinitive: function() {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = toInfinitive(parsed, this.world)
      if (str) {
        vb.replaceWith(str, false, true)
        vb.tag('Infinitive')
      }
    })
    return this
  },
  /** */
  toGerund: function() {
    this.forEach(vb => {
      let parsed = parseVerb(vb)
      let str = conjugate(parsed, this.world).Gerund
      if (str) {
        vb.replaceWith(str, false, true)
        vb.tag('Gerund')
      }
    })
    return this
  },

  /** return only verbs with 'not'*/
  isNegative: function() {
    return this.if('#Negative')
  },
  /**  return only verbs without 'not'*/
  isPositive: function() {
    return this.ifNo('#Negative')
  },
  /** add a 'not' to these verbs */
  toNegative: function() {
    this.list.forEach(p => {
      let doc = this.buildFrom([p])
      let parsed = parseVerb(doc)
      toNegative(parsed, doc.world)
    })
    return this
  },
  /** remove 'not' from these verbs */
  toPositive: function() {
    let m = this.match('do not #Verb')
    if (m.found) {
      m.remove('do not')
    }
    return this.remove('#Negative')
  },
}
