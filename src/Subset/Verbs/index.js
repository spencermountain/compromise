const methods = require('./methods')

const addMethod = function (Doc) {
  /**  */
  class Verbs extends Doc {}
  // add-in our methods
  Object.assign(Verbs.prototype, methods)

  // aliases
  Verbs.prototype.negate = Verbs.prototype.toNegative

  Doc.prototype.verbs = function (n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    // try to ignore leading and trailing adverbs
    match = match.not('^#Adverb+')
    match = match.not('#Adverb+$')
    // handle commas:
    // don't split 'really, really'
    let keep = match.match('(#Adverb && @hasComma) #Adverb')
    // // but split the other commas
    let m = match.not(keep).splitAfter('@hasComma')
    // i was shocked looking at...
    let gerund = m.match('#PastTense #Gerund')
    if (!gerund.has('(been|am|#Auxiliary) #Gerund')) {
      m = m.splitBefore(gerund.match('#Gerund'))
    }
    // combine them back together
    m = m.concat(keep)
    m.sort('index')
    //handle slashes?

    //ensure there's actually a verb
    m = m.if('#Verb')

    // the reason he will is ...
    if (m.has('(is|was)$')) {
      m = m.splitBefore('(is|was)$')
    }

    //ensure it's not two verbs
    if (m.has('#PresentTense #Adverb #PresentTense')) {
      m = m.splitBefore('#Adverb #PresentTense')
    }

    //grab (n)th result
    if (typeof n === 'number') {
      m = m.get(n)
    }
    let vb = new Verbs(m.list, this, this.world)
    return vb
  }
  return Doc
}
module.exports = addMethod
