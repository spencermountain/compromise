const mainClause = require('./mainClause')

const parse = function(doc) {
  let clauses = doc.clauses()
  let main = mainClause(clauses)
  let nouns = main.match('#Determiner? (#Noun|#Adjective)+').if('#Noun')
  let verb = main.verbs().eq(0)
  // match('(do|will)? not? #Verb+ not?').eq(0)
  return {
    subject: nouns.eq(0),
    verb: verb,
    object: verb.lookAhead('.*'),
  }
}
module.exports = parse
