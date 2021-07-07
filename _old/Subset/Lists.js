const addMethod = function (Doc) {
  //pull it apart..
  const parse = function (doc) {
    let things = doc.splitAfter('@hasComma').splitOn('(and|or) not?').not('(and|or) not?')
    let beforeLast = doc.match('[.] (and|or)', 0)
    return {
      things: things,
      conjunction: doc.match('(and|or) not?'),
      beforeLast: beforeLast,
      hasOxford: beforeLast.has('@hasComma'),
    }
  }

  /** cool, fun, and nice */
  class Lists extends Doc {
    /** coordinating conjunction */
    conjunctions() {
      return this.match('(and|or)')
    }
    /** split-up by list object */
    parts() {
      return this.splitAfter('@hasComma').splitOn('(and|or) not?')
    }
    /** remove the conjunction */
    items() {
      return parse(this).things
    }
    /** add a new unit to the list */
    add(str) {
      this.forEach(p => {
        let beforeLast = parse(p).beforeLast
        beforeLast.append(str)
        //add a comma to it
        beforeLast.termList(0).addPunctuation(',')
      })
      return this
    }
    /** remove any matching unit from the list */
    remove(match) {
      return this.items().if(match).remove()
    }
    /** return only lists that use a serial comma */
    hasOxfordComma() {
      return this.filter(doc => parse(doc).hasOxford)
    }
    addOxfordComma() {
      let items = this.items()
      let needsComma = items.eq(items.length - 2)
      if (needsComma.found && needsComma.has('@hasComma') === false) {
        needsComma.post(', ')
      }
      return this
    }
    removeOxfordComma() {
      let items = this.items()
      let needsComma = items.eq(items.length - 2)
      if (needsComma.found && needsComma.has('@hasComma') === true) {
        needsComma.post(' ')
      }
      return this
    }
  }
  // aliases
  Lists.prototype.things = Lists.prototype.items

  Doc.prototype.lists = function (n) {
    let m = this.if('@hasComma+ .? (and|or) not? .')

    // person-list
    let nounList = m
      .match('(#Noun|#Adjective|#Determiner|#Article)+ #Conjunction not? (#Article|#Determiner)? #Adjective? #Noun+')
      .if('#Noun')
    let adjList = m.match('(#Adjective|#Adverb)+ #Conjunction not? #Adverb? #Adjective+')
    let verbList = m.match('(#Verb|#Adverb)+ #Conjunction not? #Adverb? #Verb+')
    let result = nounList.concat(adjList)
    result = result.concat(verbList)
    result = result.if('@hasComma')

    if (typeof n === 'number') {
      result = m.get(n)
    }
    return new Lists(result.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
