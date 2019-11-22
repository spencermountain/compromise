const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
// nlp.extend(require('./plugins/dates/src'))

// let doc = nlp(`i walked to the moon when it was shining`)
// doc.verbs().forEach(d => {
//   d.matchOne('walked').replaceWith('sat')
// })
// doc.sentences().toPastTense()
// doc.debug()

// let doc = nlp.tokenize(`between june 5th and june 7th`)
// doc.match('between [#Date+] and').debug()
// doc.match('between [.*] and').debug()

// .toQuotation()
// .toParentheses()

let doc = nlp('he is the best, that i see. he is the greatest')
let childA = doc.if('greatest')
let childB = doc.match('he is')
childA.splitAfter(childB).debug()
childA.debug()

// doc.match('he is').split()
// doc.debug()
