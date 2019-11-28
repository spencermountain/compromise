const methods = require('./methods')

const addMethod = function(Doc) {
  /**  */
  class Nouns extends Doc {}
  // add-in our methods
  Object.assign(Nouns.prototype, methods)

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

    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Nouns(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
