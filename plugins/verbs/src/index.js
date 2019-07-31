const conjugate = require('./conjugate')

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
    // conjugation(){}
    conjugations() {
      let result = []
      this.forEach(vb => {
        let parsed = parseVerb(vb)
        let forms = conjugate(parsed, this.world)
        result.push(forms)
      })
      return result
    }
    // isPlural(){}
    // isSingular(){}
    // isNegative(){}
    // isPositive(){}
    // toNegative(){}
    // toPositive(){}
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
    // toPresentTense(){}
    // toFutureTense(){}
    // toInfinitive(){}
    // toGerund(){}
    // asAdjective(){}
  }

  Doc.prototype.verbs = function(n) {
    let match = this.match('(#Adverb|#Auxiliary|#Verb|#Negative|#Particle)+')
    match = match.splitAfter('#Comma')
    //handle slashes
    // match.list.forEach(ts => {
    //   ts.terms.forEach(t => {
    //     if (t.whitespace.before.match('/')) {
    //       match.splitOn(t.normal)
    //     }
    //   })
    // })
    match = match.if('#Verb') //this should be (much) smarter

    //grab (n)th result
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Verbs(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
