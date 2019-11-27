const nlp = require('./src/index')
// nlp.verbose(true)
nlp.extend(require('./plugins/sentences/src'))
nlp.extend(require('./plugins/numbers/src'))

// let doc = nlp(`i walked to the moon when it was shining`)
// doc.verbs().forEach(d => {
//   d.matchOne('walked').replaceWith('sat')
// })
// doc.sentences().toPastTense()
// doc.debug()

// let doc = nlp.tokenize(`between june 5th and june 7th`)
// doc.match('between [#Date+] and').debug()
// doc.match('between [.*] and').debug()

// let doc = nlp(`the stool falls over`)

// doc.replace('walks', b)
// doc.debug()

// let s = doc.sentences()
// s.toPastTense()
// s.toFutureTense()
// s.toPresentTense()
// doc.debug()
// s.verbs()
//   .toFutureTense()
// .debug()

let doc = nlp(`we walked, talked, and sang`)
doc.verbs() //.debug()
