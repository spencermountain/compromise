const methods = require('./methods')

const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {}
  // add-in our methods
  Object.assign(Verbs.prototype, methods)

  // aliases
  Verbs.prototype.negate = Verbs.prototype.toNegative

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    // handle commas
    match = match.clauses()
    //handle slashes?
    // match = match.splitAfter('@hasSlash')
    //ensure there's actually a verb
    match = match.if('#Verb') //this could be smarter
    // try to ignore leading and trailing adverbs
    match = match.not('^#Adverb').not('#Adverb$')
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
