const parseVerb = require('./parse')

const methods = [
  require('./negative/methods'),
  require('./plural/methods'),
  require('./tense/methods'),
]

const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
    }

    /** overload the original json with conjugation information */
    json() {
      return this.json()
    }

    /** grab the adverbs describing these verbs */
    adverbs() {
      let list = []
      this.forEach(vb => {
        let advb = parseVerb(vb).adverb
        if (advb.found) {
          list = list.concat(advb.list)
        }
      })
      return this.buildFrom(list)
    }
  }

  // add-in our methods
  methods.forEach(obj => Object.assign(Verbs.prototype, obj))

  // aliases
  Verbs.prototype.negate = Verbs.prototype.toNegative

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    // handle commas
    // match = match.splitAfter('!#Adverb @hasComma')
    //handle slashes?
    // match = match.splitAfter('@hasSlash')
    //ensure there's actually a verb
    match = match.if('#Verb') //this could be smarter
    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    let vb = new Verbs(match.list, this, this.world)
    // this.before(match).debug()
    return vb
  }
  return Doc
}
module.exports = addMethod
