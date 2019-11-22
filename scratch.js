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

// let doc = nlp("he isn't AT Spencer house of pain. The haunted house of not pain. Third sentence spencer.")
// // doc.cache()

let doc = nlp("Spencer's house of pain.")
doc.lookup(['house of']).debug()

// .toQuotation()
// .toParentheses()
