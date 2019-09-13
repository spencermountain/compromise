const addMethod = function(Doc) {
  //pull it apart..
  const parse = function(doc) {
    let things = doc.splitAfter('@hasComma').not('(and|or) not?')
    let beforeLast = doc.match('[.] (and|or)')
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
    /** remove conjunctions */
    things() {
      let arr = []
      this.forEach(p => {
        let things = parse(p).things
        arr = arr.concat(things.list)
      })
      return this.buildFrom(arr)
    }
    /** add a new unit to the list */
    add(str) {
      this.forEach(p => {
        let beforeLast = parse(p).beforeLast
        //add a comma to it
        beforeLast.termList(0).addPunctuation(',')
        beforeLast.append(str)
      })
      return this
    }
    /** remove any matching unit from the list */
    remove(str) {
      return this
    }

    /** return only lists that use a serial comma */
    hasOxfordComma() {
      return this.filter(doc => parse(doc).hasOxford)
    }
    addOxfordComma() {
      return this
    }
    removeOxfordComma() {
      return this
    }
  }

  Doc.prototype.lists = function(n) {
    let match = this.match('@hasComma+ .? (and|or) not? .') // '... and Don Smith'?
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Lists(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
