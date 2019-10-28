const mainClause = require('./mainClause')

const parse = function(doc) {
  let clauses = doc.clauses()
  let main = mainClause(clauses)
  let nouns = main.match('(#Noun|#Adjective)+').if('#Noun')
  let verb = main.match('#Verb+')
  return {
    subject: nouns.eq(0),
    verb: verb.eq(0),
    object: nouns.eq(1),
  }
}
module.exports = parse
