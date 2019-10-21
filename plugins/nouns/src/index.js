const hasPlural = require('./hasPlural')
const getArticle = require('./getArticle')
const isPlural = require('./isPlural')
const toPossessive = require('./toPossessive')

const addMethod = function(Doc) {
  /**  */
  class Nouns extends Doc {
    /** overload the original json with noun information */
    json(options) {
      options = options || { text: true, normal: true, trim: true, terms: true }
      let res = []
      this.forEach(doc => {
        let json = doc.json(options)[0]
        json.article = getArticle(doc)
        res.push(json)
      })
      return res
    }

    isPlural() {
      return this.if('#Plural') //assume tagger has run?
    }
    hasPlural() {
      return this.filter(d => hasPlural(d))
    }
    toPlural() {
      let toPlural = this.world.transforms.toPlural
      this.forEach(doc => {
        if (doc.has('#Plural') || hasPlural(doc) === false) {
          return
        }
        // double-check it isn't an un-tagged plural
        let str = doc.text()
        if (!doc.has('#Singular') && isPlural(str) === true) {
          return
        }
        str = toPlural(str, this.world)
        doc.replace(str).tag('#Plural')
      })
      return this
    }
    toSingular() {
      let toSingular = this.world.transforms.toSingular
      this.forEach(doc => {
        if (doc.has('#Singular') || hasPlural(doc) === false) {
          return
        }
        // double-check it isn't an un-tagged plural
        let str = doc.text()
        if (!doc.has('#Plural') && isPlural(str) !== true) {
          return
        }
        str = toSingular(str, this.world)
        doc.replace(str).tag('#Singular')
      })
      return this
    }
    toPossessive() {
      this.forEach(d => {
        toPossessive(d)
      })
      return this
    }
  }

  Doc.prototype.nouns = function(n) {
    let match = this.clauses()
    match = match.match('#Noun+ (of|by)? the? #Noun+?')
    //nouns that we don't want in these results, for weird reasons
    match = match.not('#Pronoun')
    match = match.not('(there|these)')
    match = match.not('(#Month|#WeekDay)') //allow Durations, Holidays
    // //allow possessives like "spencer's", but not generic ones like,
    match = match.not('(my|our|your|their|her|his)')
    match = match.not('(of|for|by|the)$')

    // match = match.splitAfter('@hasComma')

    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Nouns(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
