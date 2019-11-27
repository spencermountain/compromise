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
    // try to ignore leading and trailing adverbs
    match = match.not('^#Adverb+')
    match = match.not('#Adverb+$')
    // handle commas:
    // don't split 'really, really'
    let keep = this.match('(#Adverb && @hasComma) #Adverb')
    // // but split the other commas
    let m = this.not(keep).splitAfter('@hasComma')
    // // combine them back together
    m = m.concat(keep)
    m.sort('index')

    //handle slashes?
    // match = match.splitAfter('@hasSlash')
    //ensure there's actually a verb
    match = match.if('#Verb') //this could be smarter

    // match.join().debug()
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
