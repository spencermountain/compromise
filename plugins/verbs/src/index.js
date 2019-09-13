const conjugate = require('./conjugate')
const toNegative = require('./toNegative')

// turn 'would not really walk up' into parts
const parseVerb = function(vb) {
  return {
    adverb: vb.match('#Adverb+'), // 'really'
    negative: vb.match('#Negative'), // 'not'
    auxiliary: vb.match('#Auxiliary'), // 'will' of 'will go'
    particle: vb.match('#Particle'), // 'up' of 'pull up'
    verb: vb.match('#Verb').not('(#Adverb|#Negative|#Auxiliary|#Particle)'),
  }
}

const addMethod = function(Doc) {
  /**  */
  class Verbs extends Doc {
    constructor(list, from, world) {
      super(list, from, world)
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
    /** */
    // conjugation(){}
    /** */
    conjugations() {
      let result = []
      this.forEach(vb => {
        let parsed = parseVerb(vb)
        let forms = conjugate(parsed, this.world)
        result.push(forms)
      })
      return result
    }
    /** */
    // isPlural(){}
    /** */
    // isSingular(){}

    /** return only verbs with 'not'*/
    isNegative() {
      return this.if('#Negative')
    }
    /**  return only verbs without 'not'*/
    isPositive() {
      return this.ifNo('#Negative')
    }
    /** add a 'not' to these verbs */
    toNegative() {
      this.forEach(vb => {
        let parsed = parseVerb(vb)
        toNegative(parsed, this.world)
      })
      return this
    }
    /** remove 'not' from these verbs */
    toPositive() {
      return this.remove('#Negative')
    }
    /** */
    toPastTense() {
      let transforms = this.world.transforms
      return this.map(vb => {
        let verb = parseVerb(vb).verb
        let str = verb.out('normal')
        let past = transforms.verbs(str).PastTense
        if (past) {
          let p = vb.list[0]
          // console.log(p.buildFrom)
          // let p = vb.buildP
          // console.log(vb.list[0].replace(past))
          return vb //.replaceWith(past, this)
        }
        return vb
      })
    }
    /** */
    // toPresentTense(){}
    /** */
    // toFutureTense(){}
    /** */
    // toInfinitive(){}
    /** */
    // toGerund(){}
    /** */
    // asAdjective(){}
  }

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
    return vb
  }
  return Doc
}
module.exports = addMethod
